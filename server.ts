import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API to update static data
  app.post("/api/save-data", (req, res) => {
    const { works, categories } = req.body;
    
    const filePath = path.join(process.cwd(), 'src/data/staticData.ts');
    
    const content = `import { Work } from '../services/workService';
import { Category } from '../services/categoryService';

export const STATIC_CATEGORIES: Category[] = ${JSON.stringify(categories, null, 2)};

export const STATIC_WORKS: Work[] = ${JSON.stringify(works, null, 2)};
`;

    try {
      fs.writeFileSync(filePath, content);
      res.json({ status: "success" });
    } catch (error) {
      console.error("Failed to write file:", error);
      res.status(500).json({ error: "Failed to save data" });
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
