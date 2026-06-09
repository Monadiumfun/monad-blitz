// Local dev API server. Mounts the same /api/*.ts handlers Vercel uses.
// Node 25 strips TS types natively, so we import .ts directly.
// Run with: node --env-file=.env api/dev-server.mjs   (or `npm run dev:api`)
import { createServer } from "node:http";

const PORT = Number(process.env.API_PORT || 3001);

// Allow unauthenticated browser testing outside Telegram during local dev.
process.env.ALLOW_DEV_AUTH = process.env.ALLOW_DEV_AUTH || "1";

const routes = {
  "/api/me": () => import("./me.ts"),
  "/api/register": () => import("./register.ts"),
  "/api/leaderboard": () => import("./leaderboard.ts"),
  "/api/score": () => import("./score.ts"),
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const route = routes[url.pathname];
  if (!route) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "not_found" }));
    return;
  }
  // expose query like Vercel does
  req.query = Object.fromEntries(url.searchParams);
  try {
    const mod = await route();
    await mod.default(req, res);
  } catch (e) {
    console.error("[api error]", url.pathname, e);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "internal", message: String(e?.message || e) }));
    }
  }
});

server.listen(PORT, () => {
  console.log(`[api] dev server on http://localhost:${PORT}  (ALLOW_DEV_AUTH=${process.env.ALLOW_DEV_AUTH})`);
});
