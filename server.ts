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

  const settingsPath = path.join(__dirname, "data", "siteSettings.json");

  // API Routes
  app.get("/api/settings", async (req, res) => {
    try {
      const data = await fs.readFile(settingsPath, "utf-8");
      res.json(JSON.parse(data));
    } catch (error) {
      console.error("Error reading settings:", error);
      res.status(500).json({ error: "Failed to read settings" });
    }
  });

  app.post("/api/settings", async (req, res) => {
    try {
      const settings = req.body;
      await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2));
      res.json({ success: true });
    } catch (error) {
      console.error("Error saving settings:", error);
      res.status(500).json({ error: "Failed to save settings" });
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
