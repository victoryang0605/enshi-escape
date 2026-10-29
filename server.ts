import express from "express";
import { createServer as createViteServer } from "vite";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { marked } from "marked";
import { articles as fallbackArticles } from "./src/data/articles";
import path from "path";
import "dotenv/config";

/** Escape user-controlled text injected into static HTML. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  const parsedPort = parseInt(process.env.PORT ?? "", 10);
  if (process.env.PORT && Number.isNaN(parsedPort)) {
    console.warn(`Invalid PORT value "${process.env.PORT}", falling back to 3000`);
  }
  const PORT = Number.isNaN(parsedPort) ? 3000 : parsedPort;

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
    // (static /enshi-travel-guide/* versions are crawler-friendly; SPA versions kept for users)
    if (cache.articlesList.data) {
      dynamicUrls = cache.articlesList.data.map((article: any) => `
  <url>
    <loc>${baseUrl}/enshi-travel-guide/${article.slug}?id=${article.id}</loc>
    <priority>0.7</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/enshi-travel-guide/${article.slug}</loc>
    <priority>0.8</priority>
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
  </url>
  <url>
    <loc>${baseUrl}/enshi-travel-guide</loc>
    <priority>0.9</priority>
    <changefreq>weekly</changefreq>
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

  // ============================================================
  // Inquiry email notifications via company SMTP.
  // Env: SMTP_HOST, SMTP_PORT (default 465), SMTP_USER, SMTP_PASS,
  //      INQUIRY_NOTIFY_EMAIL (default zuhua.yang@slipstream.com.cn)
  // ============================================================
  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465;
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;
  const NOTIFY_EMAIL = process.env.INQUIRY_NOTIFY_EMAIL || "zuhua.yang@slipstream.com.cn";
  const smtpReady = () => !!(SMTP_HOST && SMTP_USER && SMTP_PASS);

  app.post("/api/inquiry", async (req, res) => {
    if (!smtpReady()) {
      return res.status(500).json({
        error: "SMTP_NOT_CONFIGURED",
        details: "Set SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS env vars to enable inquiry emails.",
      });
    }
    const d: any = req.body || {};
    const guestEmail = String(d.email || "").trim();
    if (!guestEmail) return res.status(400).json({ error: "MISSING_EMAIL" });

    const field = (k: string) => (d[k] ? String(d[k]) : "—");
    const summary = [
      `Service: ${field("serviceType")}`,
      `Name: ${field("guestName")}`,
      `Email: ${field("email")}`,
      `Arrival date: ${field("arrivalDate")}`,
      `Passengers: ${field("passengerCount")}`,
      `Flight/Train No.: ${field("flightNumber")}`,
      `Hotel: ${field("hotel")}`,
      `Start date: ${field("startDate")}`,
      `Duration: ${field("duration")}`,
      `Vehicle: ${field("vehicleType")}`,
      `Route: ${field("route")}`,
      `Guide language: ${field("language")}`,
      `Tour theme: ${field("tourTheme")}`,
      `Budget range: ${field("budget")}`,
    ].join("\n");

    try {
      const { default: nodemailer } = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });

      // 1) Notify the company
      await transporter.sendMail({
        from: `"Enshi Escapes Website" <${SMTP_USER}>`,
        to: NOTIFY_EMAIL,
        subject: `New inquiry [${field("serviceType")}] — ${field("guestName")} (${field("arrivalDate")})`,
        text: `A new inquiry was submitted on enshiescape.com:\n\n${summary}\n`,
      });

      // 2) Confirmation to the guest
      await transporter.sendMail({
        from: `"Enshi Escapes" <${SMTP_USER}>`,
        to: guestEmail,
        subject: "We've received your Enshi inquiry",
        text:
          `Hi ${field("guestName")},\n\n` +
          `Thanks for reaching out to Enshi Escapes! We've received your ${field("serviceType")} inquiry ` +
          `and will reply within 12 hours with a tailored plan and quote.\n\n` +
          `Your request summary:\n${summary}\n\n` +
          `Need us sooner? Chat with us on WhatsApp: https://wa.me/qr/CHOCPAGHDAK4K1\n\n` +
          `Warm regards,\nEnshi Escapes Team\nzuhua.yang@slipstream.com.cn`,
      });

      res.json({ success: true });
    } catch (error: any) {
      console.error("===== INQUIRY EMAIL FAILED =====", error.message);
      res.status(500).json({ error: "EMAIL_FAILED", details: error.message });
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

  // ============================================================
  // GEO: crawler-friendly static guide pages.
  // AI crawlers (GPTBot, ClaudeBot, PerplexityBot, …) don't execute
  // JavaScript, so the SPA guide articles are invisible to them.
  // These routes render the same Notion content as plain static HTML.
  // They never touch the SPA or /api/* behavior above.
  // ============================================================

  interface StaticArticle {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
  }

  async function resolveStaticArticles(): Promise<StaticArticle[]> {
    if (notion && DATABASE_ID) {
      try {
        if (cache.articlesList.data && (Date.now() - cache.articlesList.lastFetch < CACHE_TTL)) {
          return cache.articlesList.data;
        }
        const response = await notion.databases.query({
          database_id: DATABASE_ID,
          filter: { property: 'Status', select: { equals: 'Published' } },
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
        cache.articlesList.data = articles;
        cache.articlesList.lastFetch = Date.now();
        return articles;
      } catch (e) {
        console.error("Static guide: Notion list failed, using local fallback", e);
      }
    }
    // Fallback: local articles (works even without NOTION_API_KEY)
    return fallbackArticles.map((a) => ({
      id: a.slug,
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      category: a.category,
      date: a.date,
    }));
  }

  async function resolveStaticArticleMarkdown(article: StaticArticle): Promise<string> {
    if (notion && n2m) {
      try {
        const cached = cache.articleContent.get(article.id);
        if (cached && (Date.now() - cached.lastFetch < CACHE_TTL)) return cached.data;
        const mdblocks = await n2m.pageToMarkdown(article.id, 2);
        const md = n2m.toMarkdownString(mdblocks).parent || "";
        if (md) {
          cache.articleContent.set(article.id, { data: md, lastFetch: Date.now() });
          return md;
        }
      } catch (e) {
        console.error("Static guide: Notion content failed, using local fallback", e);
      }
    }
    const fb = fallbackArticles.find((a) => a.slug === article.slug);
    return fb ? fb.content : "";
  }

  const GUIDE_CSS = `
    body{font-family:Georgia,'Times New Roman',serif;color:#2b2b2b;background:#faf9f6;margin:0;line-height:1.75}
    .wrap{max-width:720px;margin:0 auto;padding:32px 20px 64px}
    header.site{border-bottom:1px solid #e5e2d8;padding:16px 20px;background:#fff}
    header.site a{color:#4a5d4e;text-decoration:none;font-weight:bold;letter-spacing:1px}
    h1{color:#4a5d4e;line-height:1.25}
    .meta{color:#888;font-size:14px;margin-bottom:24px}
    .article-body img{max-width:100%;height:auto}
    .article-body h2,.article-body h3{color:#4a5d4e}
    .card{border:1px solid #e5e2d8;background:#fff;border-radius:6px;padding:20px;margin:0 0 20px}
    .card a{color:#4a5d4e;text-decoration:none}
    .card h2{margin:0 0 8px;font-size:22px}
    .card p{color:#666;margin:0 0 8px}
    .cta{background:#f4f1e8;border:1px solid #e5e2d8;border-radius:6px;padding:24px;text-align:center;margin-top:40px}
    .cta a{display:inline-block;background:#4a5d4e;color:#fff;padding:12px 28px;border-radius:4px;text-decoration:none;font-family:Arial,sans-serif;font-weight:bold;margin:4px}
    footer{color:#999;font-size:13px;text-align:center;padding:24px;font-family:Arial,sans-serif}
  `;

  function guidePageShell(opts: { title: string; description: string; canonical: string; body: string; jsonLd?: object }): string {
    const jsonLd = opts.jsonLd
      ? `<script type="application/ld+json">${JSON.stringify(opts.jsonLd)}</script>`
      : "";
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(opts.title)}</title>
<meta name="description" content="${escapeHtml(opts.description)}" />
<link rel="canonical" href="${escapeHtml(opts.canonical)}" />
${jsonLd}
<style>${GUIDE_CSS}</style>
</head>
<body>
<header class="site"><a href="https://www.enshiescape.com/">ENSHI ESCAPES</a> &nbsp;·&nbsp; <a href="https://www.enshiescape.com/enshi-tours">Tours</a> &nbsp;·&nbsp; <a href="https://www.enshiescape.com/enshi-travel-guide">Travel Guide</a> &nbsp;·&nbsp; <a href="https://www.enshiescape.com/contact">Plan Your Trip</a></header>
<div class="wrap">${opts.body}</div>
<footer>© ${new Date().getFullYear()} Enshi Escapes Travel Co. — Crawler-friendly version of our travel guide.</footer>
</body>
</html>`;
  }

  const ctaBox = `
    <div class="cta">
      <h2>Ready to experience Enshi with a local expert?</h2>
      <p style="font-family:Arial,sans-serif;color:#666">Private English-speaking guides, comfortable transport, custom itineraries.</p>
      <a href="https://www.enshiescape.com/enshi-tours">View Tours</a>
      <a href="https://www.enshiescape.com/contact">Get a Free Quote</a>
    </div>`;

  // Legacy /guide URLs → canonical /enshi-travel-guide (301, avoids duplicate content)
  app.get("/guide", (_req, res) => res.redirect(301, "/enshi-travel-guide"));
  app.get("/guide/:slug", (req, res) =>
    res.redirect(301, `/enshi-travel-guide/${encodeURIComponent(req.params.slug)}`)
  );

  // Static guide index
  app.get("/enshi-travel-guide", async (req, res) => {
    try {
      const articles = await resolveStaticArticles();
      const cards = articles.map((a) => `
        <div class="card">
          <a href="/enshi-travel-guide/${encodeURIComponent(a.slug)}"><h2>${escapeHtml(a.title)}</h2></a>
          <p>${escapeHtml(a.excerpt)}</p>
          <div class="meta">${escapeHtml(a.category)} · ${escapeHtml(a.date)}</div>
        </div>`).join("");
      res.send(guidePageShell({
        title: "Enshi Travel Guide | Best Time, Things to Do, Where to Stay",
        description: "Expert tips on traveling to Enshi, Hubei: best time to visit, top attractions, local food and transportation.",
        canonical: "https://www.enshiescape.com/enshi-travel-guide",
        body: `<h1>Enshi Travel Guide</h1><p>Your essential resources for exploring China's hidden landscapes — written by local experts for international explorers.</p>${cards}${ctaBox}`,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Enshi Travel Guide",
          itemListElement: articles.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://www.enshiescape.com/enshi-travel-guide/${a.slug}`,
            name: a.title,
          })),
        },
      }));
    } catch (e) {
      console.error("Static guide index failed", e);
      res.status(500).send("Guide temporarily unavailable. Please visit https://www.enshiescape.com/enshi-travel-guide");
    }
  });

  // Static guide article
  app.get("/enshi-travel-guide/:slug", async (req, res) => {
    try {
      const articles = await resolveStaticArticles();
      const article = articles.find((a) => a.slug === req.params.slug);
      if (!article) {
        return res.status(404).send(guidePageShell({
          title: "Article not found | Enshi Escapes",
          description: "The requested travel guide article could not be found.",
          canonical: "https://www.enshiescape.com/enshi-travel-guide",
          body: `<h1>Article not found</h1><p>The article you're looking for doesn't exist. <a href="/enshi-travel-guide">Browse all travel guides</a>.</p>`,
        }));
      }
      const markdown = await resolveStaticArticleMarkdown(article);
      let htmlBody = markdown ? String(marked.parse(markdown)) : "<p>Content coming soon.</p>";
      // Demote any h1 inside the article body to h2 — the page already has its own h1.
      htmlBody = htmlBody.replace(/<h1(\s|>)/g, "<h2$1").replace(/<\/h1>/g, "</h2>");
      const spaUrl = `https://www.enshiescape.com/enshi-travel-guide/${encodeURIComponent(article.slug)}`;
      res.send(guidePageShell({
        title: `${article.title} | Enshi Escapes`,
        description: article.excerpt || `Travel guide: ${article.title}`,
        canonical: `https://www.enshiescape.com/enshi-travel-guide/${encodeURIComponent(article.slug)}`,
        body: `
          <h1>${escapeHtml(article.title)}</h1>
          <div class="meta">${escapeHtml(article.category)} · ${escapeHtml(article.date)}</div>
          ${article.excerpt ? `<p><em>${escapeHtml(article.excerpt)}</em></p>` : ""}
          <div class="article-body">${htmlBody}</div>
          <p style="font-family:Arial,sans-serif;font-size:14px;color:#888">Prefer the interactive version? <a href="${spaUrl}">Read this article on enshiescape.com →</a></p>
          ${ctaBox}`,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          datePublished: article.date,
          author: { "@type": "Organization", name: "Enshi Escapes", url: "https://www.enshiescape.com/" },
          publisher: { "@type": "Organization", name: "Enshi Escapes", url: "https://www.enshiescape.com/" },
          mainEntityOfPage: `https://www.enshiescape.com/enshi-travel-guide/${article.slug}`,
        },
      }));
    } catch (e) {
      console.error("Static guide article failed", e);
      res.status(500).send("Article temporarily unavailable. Please visit https://www.enshiescape.com/enshi-travel-guide");
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
