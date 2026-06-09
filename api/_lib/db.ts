import { createClient, type Client } from "@libsql/client";

let _db: Client | null = null;

/**
 * libSQL client. Locally it points at a file (DATABASE_URL=file:./local.db);
 * on Vercel set TURSO_DATABASE_URL + TURSO_AUTH_TOKEN (serverless-friendly).
 */
export function db(): Client {
  if (_db) return _db;
  const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || "file:./local.db";
  const authToken = process.env.TURSO_AUTH_TOKEN || undefined;
  _db = createClient({ url, authToken });
  return _db;
}

let _initialized = false;

/** Idempotent schema creation. Safe to call on every cold start. */
export async function initSchema(): Promise<void> {
  if (_initialized) return;
  const c = db();
  await c.batch(
    [
      `CREATE TABLE IF NOT EXISTS users (
        telegram_id    INTEGER PRIMARY KEY,
        username       TEXT NOT NULL,
        username_lower TEXT NOT NULL UNIQUE,
        ref_code       TEXT NOT NULL UNIQUE,
        referred_by    INTEGER,
        wallet_address TEXT,
        created_at     TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
      `CREATE TABLE IF NOT EXISTS reserved_usernames (
        username_lower TEXT PRIMARY KEY,
        original       TEXT NOT NULL,
        telegram_id    INTEGER NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS scores (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        telegram_id INTEGER NOT NULL,
        game        TEXT NOT NULL,
        score       INTEGER NOT NULL,
        created_at  TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
      `CREATE TABLE IF NOT EXISTS games (
        id             INTEGER PRIMARY KEY AUTOINCREMENT,
        telegram_id    INTEGER NOT NULL,
        game           TEXT NOT NULL,
        onchain_id     INTEGER NOT NULL,
        seed           TEXT NOT NULL,
        wager          TEXT NOT NULL,
        status         TEXT NOT NULL DEFAULT 'active',
        multiplier_bps INTEGER,
        start_tx       TEXT,
        end_tx         TEXT,
        created_at     TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
      `CREATE INDEX IF NOT EXISTS idx_users_referred_by ON users(referred_by)`,
      `CREATE INDEX IF NOT EXISTS idx_scores_game ON scores(game, score)`,
      `CREATE INDEX IF NOT EXISTS idx_games_player ON games(telegram_id, status)`,
    ],
    "write",
  );
  // migration: funding flag for the per-user wallet (ignore if it already exists)
  await c.execute("ALTER TABLE users ADD COLUMN funded INTEGER NOT NULL DEFAULT 0").catch(() => {});
  // migrations: provably-fair columns on games
  await c.execute("ALTER TABLE games ADD COLUMN client_seed TEXT NOT NULL DEFAULT ''").catch(() => {});
  await c.execute("ALTER TABLE games ADD COLUMN config TEXT NOT NULL DEFAULT '{}'").catch(() => {});
  await c.execute("ALTER TABLE games ADD COLUMN progress INTEGER NOT NULL DEFAULT 0").catch(() => {});
  await c.execute("ALTER TABLE games ADD COLUMN busted INTEGER NOT NULL DEFAULT 0").catch(() => {});
  await c.execute("ALTER TABLE games ADD COLUMN mult REAL NOT NULL DEFAULT 1").catch(() => {});
  _initialized = true;
}

export interface User {
  telegram_id: number;
  username: string;
  username_lower: string;
  ref_code: string;
  referred_by: number | null;
  wallet_address: string | null;
  funded: number;
  created_at: string;
  referrals?: number;
}

export async function getUser(telegramId: number): Promise<User | null> {
  const c = db();
  const r = await c.execute({
    sql: "SELECT * FROM users WHERE telegram_id = ?",
    args: [telegramId],
  });
  return (r.rows[0] as unknown as User) ?? null;
}

/** Username is taken if an active user holds it OR it was permanently reserved. */
export async function isUsernameTaken(username: string): Promise<boolean> {
  const c = db();
  const lower = username.toLowerCase();
  const [active, reserved] = await Promise.all([
    c.execute({ sql: "SELECT 1 FROM users WHERE username_lower = ?", args: [lower] }),
    c.execute({ sql: "SELECT 1 FROM reserved_usernames WHERE username_lower = ?", args: [lower] }),
  ]);
  return active.rows.length > 0 || reserved.rows.length > 0;
}

/** Resolve a referral code (ref_code == username_lower) to the referrer's telegram_id. */
export async function resolveReferrer(code: string): Promise<number | null> {
  const c = db();
  const r = await c.execute({
    sql: "SELECT telegram_id FROM users WHERE ref_code = ?",
    args: [code.toLowerCase()],
  });
  return r.rows.length ? Number(r.rows[0].telegram_id) : null;
}

export async function createUser(opts: {
  telegramId: number;
  username: string;
  referredBy: number | null;
}): Promise<User> {
  const c = db();
  const lower = opts.username.toLowerCase();
  await c.execute({
    sql: `INSERT INTO users (telegram_id, username, username_lower, ref_code, referred_by)
          VALUES (?, ?, ?, ?, ?)`,
    args: [opts.telegramId, opts.username, lower, lower, opts.referredBy],
  });
  return (await getUser(opts.telegramId))!;
}

export async function countReferrals(telegramId: number): Promise<number> {
  const c = db();
  const r = await c.execute({
    sql: "SELECT COUNT(*) AS cnt FROM users WHERE referred_by = ?",
    args: [telegramId],
  });
  return Number(r.rows[0].cnt);
}

export interface LeaderRow {
  rank: number;
  username: string;
  referrals: number;
  telegram_id: number;
}

export interface PnlRow {
  rank: number;
  username: string;
  pnl: number;
  games: number;
  telegram_id: number;
}

/**
 * PnL leaderboard: net $BLITZ profit per player across settled games.
 * Per game, profit = wager * (multiplier - 1) — a bust (multiplier 0) loses the
 * wager. Wagers are stored in wei; divide by 1e18 to get $BLITZ.
 */
export async function pnlLeaderboard(limit = 100): Promise<PnlRow[]> {
  const c = db();
  const r = await c.execute({
    sql: `SELECT g.telegram_id, u.username,
                 SUM( (CAST(g.wager AS REAL) / 1e18) * (COALESCE(g.multiplier_bps, 0) / 10000.0 - 1) ) AS pnl,
                 COUNT(*) AS games
          FROM games g JOIN users u ON u.telegram_id = g.telegram_id
          WHERE g.status = 'settled'
          GROUP BY g.telegram_id
          ORDER BY pnl DESC
          LIMIT ?`,
    args: [limit],
  });
  return r.rows.map((row, i) => ({
    rank: i + 1,
    username: String(row.username),
    pnl: Number(row.pnl ?? 0),
    games: Number(row.games ?? 0),
    telegram_id: Number(row.telegram_id),
  }));
}

export async function leaderboard(limit = 100): Promise<LeaderRow[]> {
  const c = db();
  const r = await c.execute({
    sql: `SELECT u.telegram_id, u.username,
                 (SELECT COUNT(*) FROM users r WHERE r.referred_by = u.telegram_id) AS referrals
          FROM users u
          ORDER BY referrals DESC, u.created_at ASC
          LIMIT ?`,
    args: [limit],
  });
  return r.rows.map((row, i) => ({
    rank: i + 1,
    username: String(row.username),
    referrals: Number(row.referrals),
    telegram_id: Number(row.telegram_id),
  }));
}

export async function setWallet(telegramId: number, wallet: string): Promise<void> {
  const c = db();
  await c.execute({
    sql: "UPDATE users SET wallet_address = ? WHERE telegram_id = ?",
    args: [wallet, telegramId],
  });
}

export async function markFunded(telegramId: number): Promise<void> {
  const c = db();
  await c.execute({ sql: "UPDATE users SET funded = 1 WHERE telegram_id = ?", args: [telegramId] });
}

export interface GameRow {
  id: number;
  telegram_id: number;
  game: string;
  onchain_id: number;
  seed: string;
  wager: string;
  status: string;
  multiplier_bps: number | null;
  start_tx: string | null;
  end_tx: string | null;
  client_seed: string;
  config: string;
  progress: number;
  busted: number;
  mult: number;
  created_at: string;
}

export async function insertGame(opts: {
  telegramId: number;
  game: string;
  onchainId: number;
  seed: string;
  wager: string;
  startTx: string;
  clientSeed: string;
  config: string;
}): Promise<void> {
  const c = db();
  await c.execute({
    sql: `INSERT INTO games (telegram_id, game, onchain_id, seed, wager, start_tx, client_seed, config)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      opts.telegramId,
      opts.game,
      opts.onchainId,
      opts.seed,
      opts.wager,
      opts.startTx,
      opts.clientSeed,
      opts.config,
    ],
  });
}

export async function advanceGame(opts: {
  telegramId: number;
  onchainId: number;
  progress: number;
  mult: number;
  busted: boolean;
}): Promise<void> {
  const c = db();
  await c.execute({
    sql: `UPDATE games SET progress = ?, mult = ?, busted = ?
          WHERE telegram_id = ? AND onchain_id = ? AND status = 'active'`,
    args: [opts.progress, opts.mult, opts.busted ? 1 : 0, opts.telegramId, opts.onchainId],
  });
}

export async function getActiveGame(telegramId: number, onchainId: number): Promise<GameRow | null> {
  const c = db();
  const r = await c.execute({
    sql: "SELECT * FROM games WHERE telegram_id = ? AND onchain_id = ? AND status = 'active'",
    args: [telegramId, onchainId],
  });
  return (r.rows[0] as unknown as GameRow) ?? null;
}

export async function settleGame(opts: {
  telegramId: number;
  onchainId: number;
  multiplierBps: number;
  endTx: string;
}): Promise<void> {
  const c = db();
  await c.execute({
    sql: `UPDATE games SET status = 'settled', multiplier_bps = ?, end_tx = ?
          WHERE telegram_id = ? AND onchain_id = ? AND status = 'active'`,
    args: [opts.multiplierBps, opts.endTx, opts.telegramId, opts.onchainId],
  });
}

export async function submitScore(telegramId: number, game: string, score: number): Promise<void> {
  const c = db();
  await c.execute({
    sql: "INSERT INTO scores (telegram_id, game, score) VALUES (?, ?, ?)",
    args: [telegramId, game, score],
  });
}
