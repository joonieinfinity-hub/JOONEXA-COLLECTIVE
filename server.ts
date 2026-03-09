import express from "express";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  const projectsPath = path.join(__dirname, "data", "projects.json");
  const pricingPath = path.join(__dirname, "data", "pricing.json");
  const sitePath = path.join(__dirname, "data", "site.json");

  // API Routes
  app.get("/api/site", async (req, res) => {
    try {
      const data = await fs.readFile(sitePath, "utf-8");
      res.json(JSON.parse(data));
    } catch (error) {
      console.error("Error reading site data:", error);
      res.status(500).json({ error: "Failed to read site data" });
    }
  });

  app.post("/api/site", async (req, res) => {
    try {
      const siteData = req.body;
      await fs.writeFile(sitePath, JSON.stringify(siteData, null, 2));
      res.json({ success: true });
    } catch (error) {
      console.error("Error saving site data:", error);
      res.status(500).json({ error: "Failed to save site data" });
    }
  });

  app.get("/api/projects", async (req, res) => {
    try {
      const data = await fs.readFile(projectsPath, "utf-8");
      res.json(JSON.parse(data));
    } catch (error) {
      console.error("Error reading projects:", error);
      res.status(500).json({ error: "Failed to read projects" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const { projects } = req.body;
      if (!projects) {
        return res.status(400).json({ error: "Projects data is required" });
      }
      await fs.writeFile(projectsPath, JSON.stringify({ projects }, null, 2));
      res.json({ success: true });
    } catch (error) {
      console.error("Error saving projects:", error);
      res.status(500).json({ error: "Failed to save projects" });
    }
  });

  app.get("/api/pricing", async (req, res) => {
    try {
      const data = await fs.readFile(pricingPath, "utf-8");
      res.json(JSON.parse(data));
    } catch (error) {
      console.error("Error reading pricing:", error);
      res.status(500).json({ error: "Failed to read pricing" });
    }
  });

  app.post("/api/pricing", async (req, res) => {
    try {
      const { pricing } = req.body;
      if (!pricing) {
        return res.status(400).json({ error: "Pricing data is required" });
      }
      await fs.writeFile(pricingPath, JSON.stringify({ pricing }, null, 2));
      res.json({ success: true });
    } catch (error) {
      console.error("Error saving pricing:", error);
      res.status(500).json({ error: "Failed to save pricing" });
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
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
