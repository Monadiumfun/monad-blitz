import { applyCors, authenticate, sendJson, type Req, type Res } from "./_lib/http";
import { initSchema, leaderboard, pnlLeaderboard } from "./_lib/db";

export default async function handler(req: Req, res: Res) {
  applyCors(res);
  if (req.method === "OPTIONS") return sendJson(res, 200, {});

  await initSchema();
  const auth = authenticate(req);

  const [refRows, pnlRows] = await Promise.all([leaderboard(100), pnlLeaderboard()]);

  let refMe: { rank: number; username: string; value: number } | null = null;
  let pnlMe: { rank: number; username: string; value: number } | null = null;
  if (auth) {
    const r = refRows.find((row) => row.telegram_id === auth.user.id);
    if (r) refMe = { rank: r.rank, username: r.username, value: r.referrals };
    const p = pnlRows.find((row) => row.telegram_id === auth.user.id);
    if (p) pnlMe = { rank: p.rank, username: p.username, value: p.pnl };
  }

  return sendJson(res, 200, {
    referrals: {
      leaders: refRows.map(({ rank, username, referrals }) => ({ rank, username, value: referrals })),
      me: refMe,
    },
    pnl: {
      leaders: pnlRows.slice(0, 100).map(({ rank, username, pnl }) => ({ rank, username, value: pnl })),
      me: pnlMe,
    },
  });
}
