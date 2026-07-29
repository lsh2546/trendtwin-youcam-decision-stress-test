import "dotenv/config";
import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import multer from "multer";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { virtualTryOn } from "./youcam.js";

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 4 },
  fileFilter: (_request, file, callback) => callback(null, ["image/jpeg", "image/png"].includes(file.mimetype)),
});
const port = Number(process.env.PORT || 8787);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

app.disable("x-powered-by");
app.use(cors());
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_request, response) => response.json({ ok: true, youcamConfigured: Boolean(process.env.YOUCAM_API_KEY) }));

app.post("/api/vto/batch", upload.fields([{ name: "portrait", maxCount: 1 }, { name: "garments", maxCount: 3 }]), async (request, response, next) => {
  try {
    const files = request.files as Record<string, Express.Multer.File[]> | undefined;
    const portrait = files?.portrait?.[0];
    const garments = files?.garments || [];
    if (!portrait || garments.length !== 3) return response.status(400).json({ message: "One portrait and exactly three garment images are required." });
    let categories: string[] = [];
    try { categories = JSON.parse(String(request.body.categories || "[]")); } catch { categories = []; }
    const results = await Promise.all(garments.map((garment, index) => virtualTryOn(portrait, garment, categories[index] || "auto")));
    const urls = results.map((result) => {
      const value = result.results as { url?: string } | undefined;
      return value?.url;
    });
    response.json({ urls });
  } catch (error) { next(error); }
});

app.use((error: Error & { status?: number }, _request: Request, response: Response, _next: NextFunction) => {
  console.error(error);
  response.status(error.status || 500).json({ message: error.message || "Unexpected server error" });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(root, "dist")));
  app.get("*splat", (_request, response) => response.sendFile(join(root, "dist", "index.html")));
}

app.listen(port, () => console.log(`TREND//TWIN API listening on http://localhost:${port}`));
