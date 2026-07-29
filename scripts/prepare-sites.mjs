import { cp, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const dist = join(root, "dist");
const client = join(dist, "client");

await mkdir(client, { recursive: true });
for (const entry of ["assets", "index.html", "og.png", "trendtwin-simulation-wall.png"]) {
  try {
    await cp(join(dist, entry), join(client, entry), { recursive: true });
  } catch {
    // Optional static assets can be absent in custom builds.
  }
}

await mkdir(join(dist, "server"), { recursive: true });
await writeFile(join(dist, "server", "index.js"), `
export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;
    const url = new URL(request.url);
    if (request.method === "GET" && (request.headers.get("accept") || "").includes("text/html")) {
      url.pathname = "/index.html";
      return env.ASSETS.fetch(new Request(url, request));
    }
    return response;
  }
};
`.trimStart());
