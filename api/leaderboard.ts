import { applyCors, authenticate, sendJson, type Req, type Res } from "./_lib/http";
import { initSchema, leaderboard, pnlLeaderboard } from "./_lib/db";

export default async function handler(req: Req, res: Res) {
  applyCors(res);
  if (req.method === "OPTIONS") return sendJson(res, 200, {});

  await initSchema();
  const type = new URL(req.url || "/", "http://x").searchParams.get("type") === "pnl" ? "pnl" : "referral";
  const auth = authenticate(req);

  if (type === "pnl") {
    const rows = await pnlLeaderboard(100);
    let me: { rank: number; username: string; pnl: number; games: number } | null = null;
    if (auth) {
      const mine = rows.find((r) => r.telegram_id === auth.user.id);
      if (mine) me = { rank: mine.rank, username: mine.username, pnl: mine.pnl, games: mine.games };
    }
    return sendJson(res, 200, {
      type,
      leaders: rows.map(({ rank, username, pnl, games }) => ({ rank, username, pnl, games })),
      me,
    });
  }

  const rows = await leaderboard(100);
  // If authenticated, surface the caller's own rank even if outside the top 100.
  let me: { rank: number; username: string; referrals: number } | null = null;
  if (auth) {
    const mine = rows.find((r) => r.telegram_id === auth.user.id);
    if (mine) me = { rank: mine.rank, username: mine.username, referrals: mine.referrals };
  }
  return sendJson(res, 200, {
    type,
    leaders: rows.map(({ rank, username, referrals }) => ({ rank, username, referrals })),
    me,
  });
}
