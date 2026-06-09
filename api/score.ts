import { applyCors, authenticate, readJson, sendJson, type Req, type Res } from "./_lib/http";
import { getUser, initSchema, submitScore } from "./_lib/db";

const GAMES = new Set(["higher-lower", "laser-party", "death-run"]);

export default async function handler(req: Req, res: Res) {
  applyCors(res);
  if (req.method === "OPTIONS") return sendJson(res, 200, {});
  if (req.method !== "POST") return sendJson(res, 405, { error: "method_not_allowed" });

  const auth = authenticate(req);
  if (!auth) return sendJson(res, 401, { error: "unauthorized" });

  await initSchema();
  const user = await getUser(auth.user.id);
  if (!user) return sendJson(res, 403, { error: "not_registered" });

  const body = await readJson<{ game?: string; score?: number }>(req);
  const game = String(body.game ?? "");
  const score = Math.max(0, Math.floor(Number(body.score ?? 0)));
  if (!GAMES.has(game)) return sendJson(res, 400, { error: "invalid_game" });

  await submitScore(user.telegram_id, game, score);
  return sendJson(res, 200, { ok: true });
}
