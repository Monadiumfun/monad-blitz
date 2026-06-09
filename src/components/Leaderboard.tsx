import { useEffect, useState } from "react";
import { api, type LeaderboardResponse, type LeaderboardType, type LeaderEntry, type ApiUser } from "../lib/api";
import InviteCard from "./InviteCard";

interface Props {
  onBack: () => void;
  user?: ApiUser | null;
  type?: LeaderboardType;
}

const medal = (rank: number) => (rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `#${rank}`);

function fmtPnl(n: number): string {
  const v = Math.round(n);
  return `${v >= 0 ? "+" : "−"}${Math.abs(v).toLocaleString("en-US")}`;
}

function ValueCell({ row, type }: { row: LeaderEntry; type: LeaderboardType }) {
  if (type === "pnl") {
    const pnl = row.pnl ?? 0;
    return (
      <>
        <span className={`font-bold tabular-nums ${pnl >= 0 ? "text-[#02c77b]" : "text-[#e74c3c]"}`}>{fmtPnl(pnl)}</span>
        <span className="text-[10px] text-gray-500 uppercase">$blitz</span>
      </>
    );
  }
  return (
    <>
      <span className="text-[#6E54FF] font-bold tabular-nums">{row.referrals ?? 0}</span>
      <span className="text-[10px] text-gray-500 uppercase">refs</span>
    </>
  );
}

function Leaderboard({ onBack, user, type = "referral" }: Props) {
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .leaderboard(type)
      .then(setData)
      .finally(() => setLoading(false));
  }, [type]);

  const isPnl = type === "pnl";
  const title = isPnl ? "💰 PnL Leaders" : "🏆 Referral Leaders";
  const emptyMsg = isPnl ? "No games played yet. Win some $BLITZ to climb!" : "No players yet. Be the first to invite friends!";

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0f] flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-[420px] flex flex-col gap-5">
        <header className="flex items-center justify-between">
          <button onClick={onBack} className="text-sm text-[#6b7280] hover:text-white transition-colors flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
          <h1 className="text-lg font-bold text-white">{title}</h1>
          <div className="w-[44px]" />
        </header>

        {isPnl && (
          <div className="rounded-2xl border border-[#6E54FF]/40 bg-gradient-to-br from-[#6E54FF]/[0.12] to-transparent p-4 text-center">
            <p className="text-sm font-bold text-white">🎁 Top PnL Maker wins the 500 $MON prize pool</p>
          </div>
        )}

        {!isPnl && user && <InviteCard refCode={user.refCode} referralLink={user.referralLink} />}

        {loading && <p className="text-center text-gray-500 text-sm mt-8">Loading…</p>}

        {!loading && data && data.leaders.length === 0 && (
          <p className="text-center text-gray-500 text-sm mt-8">{emptyMsg}</p>
        )}

        {!loading && data && data.leaders.length > 0 && (
          <div className="flex flex-col gap-2">
            {data.leaders.map((row) => {
              const isMe = data.me?.rank === row.rank && data.me?.username === row.username;
              return (
                <div
                  key={`${row.rank}-${row.username}`}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 border ${
                    isMe ? "border-[#6E54FF]/50 bg-[#6E54FF]/[0.07]" : "border-[#2a2a3a] bg-[#12121a]"
                  }`}
                >
                  <span className={`w-9 text-center font-bold ${row.rank <= 3 ? "text-lg" : "text-sm text-gray-400"}`}>
                    {medal(row.rank)}
                  </span>
                  <span className="flex-1 font-semibold text-white truncate">
                    {row.username}
                    {isMe && <span className="ml-2 text-[10px] uppercase tracking-wide text-[#6E54FF]">you</span>}
                  </span>
                  <ValueCell row={row} type={type} />
                </div>
              );
            })}
          </div>
        )}

        {!loading && data?.me && data.me.rank > data.leaders.length && (
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 border border-[#6E54FF]/50 bg-[#6E54FF]/[0.07] mt-2">
            <span className="w-9 text-center font-bold text-sm text-gray-400">#{data.me.rank}</span>
            <span className="flex-1 font-semibold text-white truncate">
              {data.me.username}
              <span className="ml-2 text-[10px] uppercase tracking-wide text-[#6E54FF]">you</span>
            </span>
            <ValueCell row={data.me} type={type} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
