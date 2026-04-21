import express from "express";
import { createServer as createViteServer } from "vite";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import path from "path";
import "dotenv/config";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize Notion components on the server where it's safe
  let notion: Client | null = null;
  let n2m: NotionToMarkdown | null = null;

  if (process.env.NOTION_API_KEY) {
    notion = new Client({ auth: process.env.NOTION_API_KEY });
    n2m = new NotionToMarkdown({ notionClient: notion });
  }

  const DATABASE_ID = process.env.NOTION_DATABASE_ID;

  // API endpoints
  app.get("/api/articles", async (req, res) => {
    if (!notion || !DATABASE_ID) {
      return res.json([]);
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
    try {
      const mdblocks = await n2m.pageToMarkdown(pageId, 2);
      const mdString = n2m.toMarkdownString(mdblocks);
      res.json({ content: mdString.parent || "" });
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
