import { applyCors, authenticate, readJson, sendJson, type Req, type Res } from "./_lib/http.ts";
import { getActiveGame, getUser, initSchema } from "./_lib/db.ts";
import { sendSponsored } from "./_lib/aa.ts";
import { buildMoveCall } from "./_lib/nadgames.ts";

export default async function handler(req: Req, res: Res) {
  applyCors(res);
  if (req.method === "OPTIONS") return sendJson(res, 200, {});
  if (req.method !== "POST") return sendJson(res, 405, { error: "method_not_allowed" });

  const auth = authenticate(req);
  if (!auth) return sendJson(res, 401, { error: "unauthorized" });

  await initSchema();
  const user = await getUser(auth.user.id);
  if (!user) return sendJson(res, 403, { error: "not_registered" });

  const body = await readJson<{ gameId?: number; moveType?: number; value?: number }>(req);
  const gameId = Number(body.gameId);
  if (!Number.isInteger(gameId) || gameId < 0) return sendJson(res, 400, { error: "invalid_game_id" });

  const row = await getActiveGame(user.telegram_id, gameId);
  if (!row) return sendJson(res, 404, { error: "game_not_active" });

  const moveType = Math.min(255, Math.max(0, Math.floor(Number(body.moveType ?? 0))));
  const value = BigInt(Math.max(0, Math.floor(Number(body.value ?? 0))));

  try {
    const receipt = await sendSponsored(user.telegram_id, [
      buildMoveCall(BigInt(gameId), moveType, value),
    ]);
    return sendJson(res, 200, { txHash: receipt.txHash, userOpHash: receipt.userOpHash });
  } catch (e) {
    console.error("[game-move]", (e as Error).message);
    return sendJson(res, 502, { error: "chain_error", message: (e as Error).message });
  }
}
