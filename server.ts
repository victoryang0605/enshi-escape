import express from "express";
import { createServer as createViteServer } from "vite";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import path from "path";
import "dotenv/config";

async function startServer() {
  const app = express();
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
