import { applyCors, authenticate, sendJson, type Req, type Res } from "./_lib/http";
import { initSchema, leaderboard } from "./_lib/db";

export default async function handler(req: Req, res: Res) {
  applyCors(res);
  if (req.method === "OPTIONS") return sendJson(res, 200, {});

  await initSchema();
  const rows = await leaderboard(100);

  // If authenticated, surface the caller's own rank even if outside the top 100.
  const auth = authenticate(req);
  let me: { rank: number; username: string; referrals: number } | null = null;
  if (auth) {
    const mine = rows.find((r) => r.telegram_id === auth.user.id);
    if (mine) me = { rank: mine.rank, username: mine.username, referrals: mine.referrals };
  }

  return sendJson(res, 200, {
    leaders: rows.map(({ rank, username, referrals }) => ({ rank, username, referrals })),
    me,
  });
}
