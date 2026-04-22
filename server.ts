import express from "express";
import { createServer as createViteServer } from "vite";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import path from "path";
import "dotenv/config";

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  // Initialize Notion components on the server where it's safe
  let notion: Client | null = null;
  let n2m: NotionToMarkdown | null = null;

  if (process.env.NOTION_API_KEY) {
    notion = new Client({ auth: process.env.NOTION_API_KEY });
    n2m = new NotionToMarkdown({ notionClient: notion });
  }

  const DATABASE_ID = process.env.NOTION_DATABASE_ID;

  // Simple in-memory cache to prevent Notion API Rate Limits (429 Too Many Requests)
  const cache = {
    articlesList: { data: null as any, lastFetch: 0 },
    articleContent: new Map<string, { data: string; lastFetch: number }>()
  };
  const CACHE_TTL = 10 * 60 * 1000; // 10 minutes in milliseconds
  // We use the environment variable first, if it doesn't exist, we fallback to the hardcoded string
  const REVIEWS_DATABASE_ID = process.env.NOTION_REVIEWS_DATABASE_ID || "34ad7ce9506b80b091fcc1b7cab61bb7";

  // API endpoints
  app.get("/api/articles", async (req, res) => {
    if (!notion || !DATABASE_ID) {
      return res.json([]);
    }

    // Check Cache
    if (cache.articlesList.data && (Date.now() - cache.articlesList.lastFetch < CACHE_TTL)) {
      console.log("Serving articles from cache");
      return res.json(cache.articlesList.data);
    }

    try {
      const response = await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
          property: 'Status',
          select: { equals: 'Published' },
        },
        sorts: [{ property: 'Date', direction: 'descending' }],
      });

      const articles = response.results.map((page: any) => ({
        id: page.id,
        slug: page.properties.Slug?.rich_text?.[0]?.plain_text || page.id,
        title: page.properties.Name?.title?.[0]?.plain_text || 'Untitled',
        excerpt: page.properties.Excerpt?.rich_text?.[0]?.plain_text || '',
        category: page.properties.Category?.select?.name || 'Uncategorized',
        date: page.properties.Date?.date?.start || 'Unknown Date',
        alt: page.properties.ALT?.rich_text?.[0]?.plain_text || page.properties.Name?.title?.[0]?.plain_text || 'Enshi travel guide image',
      }));

      // Update Cache
      cache.articlesList.data = articles;
      cache.articlesList.lastFetch = Date.now();
      console.log("Fetched articles from Notion & cached");

      res.json(articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/:id/content", async (req, res) => {
    if (!n2m) {
      return res.json({ content: "" });
    }

    const pageId = req.params.id;

    // Check Cache
    const cachedContent = cache.articleContent.get(pageId);
    if (cachedContent && (Date.now() - cachedContent.lastFetch < CACHE_TTL)) {
      console.log(`Serving article ${pageId} from cache`);
      return res.json({ content: cachedContent.data });
    }

    try {
      const mdblocks = await n2m.pageToMarkdown(pageId, 2);
      const mdString = n2m.toMarkdownString(mdblocks);
      const content = mdString.parent || "";

      // Update Cache
      cache.articleContent.set(pageId, { data: content, lastFetch: Date.now() });
      console.log(`Fetched article ${pageId} from Notion & cached`);

      res.json({ content });
    } catch (error) {
      console.error("Error fetching article content:", error);
      res.status(500).json({ error: "Failed to fetch article content" });
    }
  });

  app.get("/sitemap.xml", async (req, res) => {
    res.header('Content-Type', 'application/xml');
    
    const baseUrl = 'https://www.enshiescape.com';
    let dynamicUrls = '';

    // Generate URLs from Notion articles if available in cache
    if (cache.articlesList.data) {
      dynamicUrls = cache.articlesList.data.map((article: any) => `
  <url>
    <loc>${baseUrl}/enshi-travel-guide/${article.slug}?id=${article.id}</loc>
    <priority>0.7</priority>
    <changefreq>monthly</changefreq>
  </url>`).join('');
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <priority>1.0</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/enshi-tours</loc>
    <priority>0.9</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/enshi-travel-guide</loc>
    <priority>0.9</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/faq</loc>
    <priority>0.7</priority>
    <changefreq>monthly</changefreq>
  </url>${dynamicUrls}
</urlset>`;

    res.send(xml);
  });

  // Reviews endpoints
  app.get("/api/reviews", async (req, res) => {
    if (!notion || !REVIEWS_DATABASE_ID) return res.json([]);
    try {
      console.log("Attempting to fetch from Reviews DB ID:", REVIEWS_DATABASE_ID);
      const response = await notion.databases.query({
        database_id: REVIEWS_DATABASE_ID,
        filter: {
          property: 'Status',
          select: { equals: 'Published' },
        },
        sorts: [{ timestamp: 'created_time', direction: 'descending' }],
      });

      console.log("Successfully fetched reviews data. Count:", response.results.length);
      const reviews = response.results.map((page: any) => {
        // Extract up to 3 photos if the column exists
        const photosObj = page.properties.Photos?.files || [];
        const photos = photosObj.map((f: any) => f.file?.url || f.external?.url).filter(Boolean).slice(0, 3);

        return {
          id: page.id,
          name: page.properties.Name?.title?.[0]?.plain_text || 'Anonymous',
          country: page.properties.Country?.rich_text?.[0]?.plain_text || '',
          title: page.properties.Title?.rich_text?.[0]?.plain_text || '',
          content: page.properties.Review?.rich_text?.[0]?.plain_text || '',
          rating: page.properties.Rating?.number || 5,
          date: new Date(page.created_time).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
          photos: photos,
          photoAlt: page.properties.ALT?.rich_text?.[0]?.plain_text || page.properties.Title?.rich_text?.[0]?.plain_text || 'Enshi travel review photo'
        };
      });
      
      res.json(reviews);
    } catch (error: any) {
      console.error("===== FATAL NOTION ERROR =====");
      console.error("Database ID used:", REVIEWS_DATABASE_ID);
      console.error("Error Core Message:", error.message);
      console.error("Error Code:", error.code);
      console.error("Error Status:", error.status);
      console.error("Please verify that the Database ID belongs to the workspace of the API key.");
      console.error("===============================");
      res.status(500).json({ error: "Failed to fetch reviews", details: error.message });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    if (!notion) return res.status(500).json({ error: "Notion client not initialized" });
    try {
      const { name, country, title, review, rating, photos } = req.body;
      
      let uploadedUrls: string[] = [];
      
      // Step 1: Intercept images and upload to ImgBB if provided
      if (photos && photos.length > 0) {
        if (!process.env.IMGBB_API_KEY) {
          return res.status(400).json({ 
            error: "MISSING_IMGBB_KEY", 
            details: "Please get a free API Key from api.imgbb.com and add IMGBB_API_KEY to your settings." 
          });
        }
        
        console.log(`Processing ${photos.length} image uploads to ImgBB...`);
        for (const b64 of photos) {
          try {
            const base64Data = b64.replace(/^data:image\/[a-z]+;base64,/, "");
            const params = new URLSearchParams();
            params.append('image', base64Data);
            
            const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
              method: 'POST',
              body: params
            });
            
            const imgData: any = await imgRes.json();
            if (imgData && imgData.data && imgData.data.url) {
              uploadedUrls.push(imgData.data.url);
            }
          } catch (uploadErr) {
            console.error("ImgBB Upload Failed:", uploadErr);
          }
        }
      }

      // Format Notion Files Property Array
      const notionPhotos = uploadedUrls.map(url => ({
        type: "external" as const,
        name: "guest_photo",
        external: { url }
      }));
      
      // Step 2: Push all text and standard external URLs to Notion
      await notion.pages.create({
        parent: { database_id: REVIEWS_DATABASE_ID },
        properties: {
          Name: { title: [{ text: { content: name || 'Anonymous' } }] },
          Country: { rich_text: [{ text: { content: country || '' } }] },
          Title: { rich_text: [{ text: { content: title || '' } }] },
          Review: { rich_text: [{ text: { content: review || '' } }] },
          Rating: { number: Number(rating) || 5 },
          Status: { select: { name: 'Pending' } },
          Photos: { files: notionPhotos }
        }
      });
      
      res.status(201).json({ success: true });
    } catch (error: any) {
      console.error("===== FATAL POST NOTION ERROR =====");
      console.error("Error Core Message:", error.message);
      console.error("Error Code:", error.code);
      console.error("Error Status:", error.status);
      res.status(500).json({ error: "Failed to submit review", details: error.message });
    }
  });

  // Debug endpoint to list all available databases
  app.get("/api/debug-notion", async (req, res) => {
    if (!notion) return res.status(500).json({ error: "Notion not initialized" });
    try {
      const response = await notion.search({
        filter: {
          value: 'database',
          property: 'object'
        }
      });
      const dbs = response.results.map((db: any) => ({
        id: db.id,
        title: db.title?.[0]?.plain_text || 'Untitled'
      }));
      res.json({
        integration_status: "ok",
        accessible_databases: dbs,
        your_provided_id: process.env.NOTION_REVIEWS_DATABASE_ID || "34ad7ce9506b80b091fcc1b7cab61bb7"
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
