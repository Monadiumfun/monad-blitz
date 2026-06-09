import { randomBytes } from "node:crypto";
import { keccak256, parseEther, type Hex } from "viem";
import { applyCors, authenticate, readJson, sendJson, type Req, type Res } from "./_lib/http";
import { getUser, initSchema, insertGame } from "./_lib/db";
import { sendSponsored } from "./_lib/aa";
import { buildStartCalls, parseGameCreated, GAME_TYPES } from "./_lib/nadgames";

export default async function handler(req: Req, res: Res) {
  applyCors(res);
  if (req.method === "OPTIONS") return sendJson(res, 200, {});
  if (req.method !== "POST") return sendJson(res, 405, { error: "method_not_allowed" });

  const auth = authenticate(req);
  if (!auth) return sendJson(res, 401, { error: "unauthorized" });

  await initSchema();
  const user = await getUser(auth.user.id);
  if (!user) return sendJson(res, 403, { error: "not_registered" });

  const body = await readJson<{
    game?: string;
    wager?: number;
    clientSeed?: string;
    config?: { tiles?: number; grid?: number; tilesSeq?: number[] };
  }>(req);
  const game = String(body.game ?? "");
  const gameType = GAME_TYPES[game];
  if (gameType === undefined) return sendJson(res, 400, { error: "invalid_game" });

  const clientSeed = String(body.clientSeed ?? "").slice(0, 66);
  // death-run uses a per-row tile-count sequence (rows of 7..2 tiles); each
  // row's mine is keyed on its row id, so the play order can be shuffled freely.
  const tilesSeq = (Array.isArray(body.config?.tilesSeq) ? body.config!.tilesSeq! : [])
    .map((n) => Math.min(7, Math.max(2, Math.floor(Number(n)))))
    .filter((n) => Number.isFinite(n))
    .slice(0, 12);
  const configObj: Record<string, unknown> = {
    tiles: Math.min(8, Math.max(2, Math.floor(Number(body.config?.tiles ?? 2)))),
    grid: Math.min(12, Math.max(3, Math.floor(Number(body.config?.grid ?? 5)))),
  };
  if (tilesSeq.length) configObj.tilesSeq = tilesSeq;
  const config = JSON.stringify(configObj);

  const wagerMin = parseEther(process.env.GAME_WAGER_MIN || "10");
  const wagerMax = parseEther(process.env.GAME_WAGER_MAX || "1000");
  let wager: bigint;
  if (body.wager === undefined || body.wager === null) {
    wager = parseEther(process.env.GAME_WAGER || "100");
  } else {
    const amount = Math.floor(Number(body.wager));
    if (!Number.isFinite(amount) || amount <= 0) return sendJson(res, 400, { error: "invalid_wager" });
    wager = parseEther(String(amount));
  }
  if (wager < wagerMin || wager > wagerMax) return sendJson(res, 400, { error: "wager_out_of_range" });
  const seed = `0x${randomBytes(32).toString("hex")}` as Hex;
  const seedHash = keccak256(seed);

  try {
    const receipt = await sendSponsored(user.telegram_id, buildStartCalls(gameType, wager, seedHash));
    const gameId = parseGameCreated(receipt);
    if (gameId === null) return sendJson(res, 500, { error: "game_created_event_missing" });

    await insertGame({
      telegramId: user.telegram_id,
      game,
      onchainId: Number(gameId),
      seed,
      wager: wager.toString(),
      startTx: receipt.txHash,
      clientSeed,
      config,
    });

    return sendJson(res, 200, {
      gameId: Number(gameId),
      txHash: receipt.txHash,
      userOpHash: receipt.userOpHash,
    });
  } catch (e) {
    console.error("[game-start]", (e as Error).message);
    return sendJson(res, 502, { error: "chain_error", message: (e as Error).message });
  }
}
