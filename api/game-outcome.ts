import type { Hex } from "viem";
import { applyCors, authenticate, readJson, sendJson, type Req, type Res } from "./_lib/http";
import { advanceGame, getActiveGame, getUser, initSchema } from "./_lib/db";
import {
  deathRunMine,
  deathRunRowMultiplier,
  laserRound,
  laserRoundMultiplier,
} from "./_lib/fair";

interface OutcomeBody {
  gameId?: number;
  index?: number;
  pick?: number | { row?: number; col?: number };
}

export default async function handler(req: Req, res: Res) {
  applyCors(res);
  if (req.method === "OPTIONS") return sendJson(res, 200, {});
  if (req.method !== "POST") return sendJson(res, 405, { error: "method_not_allowed" });

  const auth = authenticate(req);
  if (!auth) return sendJson(res, 401, { error: "unauthorized" });

  await initSchema();
  const user = await getUser(auth.user.id);
  if (!user) return sendJson(res, 403, { error: "not_registered" });

  const body = await readJson<OutcomeBody>(req);
  const gameId = Number(body.gameId);
  const index = Number(body.index);
  if (!Number.isInteger(gameId) || gameId < 0) return sendJson(res, 400, { error: "invalid_game_id" });
  if (!Number.isInteger(index) || index < 0) return sendJson(res, 400, { error: "invalid_index" });

  const row = await getActiveGame(user.telegram_id, gameId);
  if (!row) return sendJson(res, 404, { error: "game_not_active" });
  if (row.busted) return sendJson(res, 409, { error: "already_busted" });

  const serverSeed = row.seed as Hex;
  const config = JSON.parse(row.config || "{}") as { tiles?: number; grid?: number; tilesSeq?: number[] };

  if (row.game === "death-run") {
    // Rows have varying tile counts; the player climbs them in any (shuffled)
    // order. `index` is the canonical ROW ID, and each row's mine is keyed on
    // that id — so order can't leak future mines. `progress` is a played-rows
    // bitmask (no strict step sequencing).
    const seq = config.tilesSeq && config.tilesSeq.length ? config.tilesSeq : [config.tiles ?? 2];
    if (index >= seq.length) return sendJson(res, 400, { error: "invalid_row" });
    const playedMask = row.progress;
    if ((playedMask >> index) & 1) return sendJson(res, 409, { error: "row_already_played" });
    const tiles = seq[index];
    const pick = Math.floor(Number(body.pick));
    if (!Number.isInteger(pick) || pick < 0 || pick >= tiles) {
      return sendJson(res, 400, { error: "invalid_pick" });
    }
    const mine = deathRunMine(serverSeed, row.client_seed, gameId, index, tiles);
    const hit = pick === mine;
    const mult = hit ? 0 : row.mult * deathRunRowMultiplier(tiles);
    await advanceGame({
      telegramId: user.telegram_id,
      onchainId: gameId,
      progress: hit ? playedMask : playedMask | (1 << index),
      mult,
      busted: hit,
    });
    return sendJson(res, 200, { mine, hit, multiplier: mult });
  }

  if (row.game === "laser-party") {
    // strict step sequencing for laser (no shuffle) — can't peek future lasers
    if (index !== row.progress) return sendJson(res, 409, { error: "out_of_sequence", expected: row.progress });
    const grid = config.grid ?? 5;
    const pick = (body.pick ?? {}) as { row?: number; col?: number };
    const pRow = Math.floor(Number(pick.row));
    const pCol = Math.floor(Number(pick.col));
    if (
      !Number.isInteger(pRow) || pRow < 0 || pRow >= grid ||
      !Number.isInteger(pCol) || pCol < 0 || pCol >= grid
    ) {
      return sendJson(res, 400, { error: "invalid_pick" });
    }
    const round = laserRound(serverSeed, row.client_seed, gameId, grid, index);
    if (!round) return sendJson(res, 409, { error: "no_lines_left" });
    const hit =
      (round.dim === "row" && round.target === pRow) ||
      (round.dim === "col" && round.target === pCol);
    const mult = hit ? 0 : row.mult * laserRoundMultiplier(round.remaining);
    await advanceGame({
      telegramId: user.telegram_id,
      onchainId: gameId,
      progress: index + 1,
      mult,
      busted: hit,
    });
    return sendJson(res, 200, { dim: round.dim, target: round.target, hit, multiplier: mult });
  }

  return sendJson(res, 400, { error: "game_has_no_outcomes" });
}
