import { formatEther, type Hex } from "viem";
import { applyCors, authenticate, readJson, sendJson, type Req, type Res } from "./_lib/http";
import { getActiveGame, getUser, initSchema, settleGame, submitScore } from "./_lib/db";
import { sendSponsored, smartAccountAddress } from "./_lib/aa";
import { buildCashoutCall, parseCashedOut, MAX_MULTIPLIER_BPS } from "./_lib/nadgames";

export default async function handler(req: Req, res: Res) {
  applyCors(res);
  if (req.method === "OPTIONS") return sendJson(res, 200, {});
  if (req.method !== "POST") return sendJson(res, 405, { error: "method_not_allowed" });

  const auth = authenticate(req);
  if (!auth) return sendJson(res, 401, { error: "unauthorized" });

  await initSchema();
  const user = await getUser(auth.user.id);
  if (!user) return sendJson(res, 403, { error: "not_registered" });

  const body = await readJson<{ gameId?: number; score?: number; multiplier?: number }>(req);
  const gameId = Number(body.gameId);
  if (!Number.isInteger(gameId) || gameId < 0) return sendJson(res, 400, { error: "invalid_game_id" });

  const row = await getActiveGame(user.telegram_id, gameId);
  if (!row) return sendJson(res, 404, { error: "game_not_active" });

  const score = Math.max(0, Math.floor(Number(body.score ?? 0)));
  // Seed-driven games settle on the server-tracked multiplier (anti-cheat);
  // the client-reported value is only used for games without server outcomes.
  const seedDriven = row.game === "death-run" || row.game === "laser-party";
  const multiplier = seedDriven
    ? (row.busted ? 0 : row.mult)
    : Math.max(0, Number(body.multiplier ?? 0));
  const multiplierBps = Math.min(Math.round(multiplier * 10_000), MAX_MULTIPLIER_BPS);

  try {
    const player = await smartAccountAddress(user.telegram_id);
    const call = await buildCashoutCall(
      BigInt(gameId),
      player,
      BigInt(multiplierBps),
      row.seed as Hex,
    );
    const receipt = await sendSponsored(user.telegram_id, [call]);
    const payout = parseCashedOut(receipt);

    await settleGame({
      telegramId: user.telegram_id,
      onchainId: gameId,
      multiplierBps,
      endTx: receipt.txHash,
    });
    await submitScore(user.telegram_id, row.game, score);

    return sendJson(res, 200, {
      txHash: receipt.txHash,
      userOpHash: receipt.userOpHash,
      multiplierBps,
      payout: payout !== null ? formatEther(payout) : null,
      fairness: {
        serverSeed: row.seed,
        clientSeed: row.client_seed,
        formula: "outcome[i] = keccak256(serverSeed, clientSeed, gameId, i)",
      },
    });
  } catch (e) {
    console.error("[game-end]", (e as Error).message);
    return sendJson(res, 502, { error: "chain_error", message: (e as Error).message });
  }
}
