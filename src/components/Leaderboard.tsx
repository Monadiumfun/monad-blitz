import { useEffect, useState } from "react";
import { api, type LeaderboardResponse, type LeaderRow, type ApiUser } from "../lib/api";
import InviteCard from "./InviteCard";

interface Props {
  onBack: () => void;
  user?: ApiUser | null;
}

type Board = "pnl" | "referrals";

function fmtPnl(n: number): string {
  const sign = n > 0 ? "+" : n < 0 ? "−" : "";
  const abs = Math.abs(n);
  const v =
    abs >= 1000
      ? Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(abs)
      : abs.toLocaleString("en", { maximumFractionDigits: 2 });
  return `${sign}${v}`;
}

function Leaderboard({ onBack, user }: Props) {
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState<Board>("pnl");

  useEffect(() => {
    api
      .leaderboard()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const medal = (rank: number) => (rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `#${rank}`);

  const active = board === "pnl" ? data?.pnl : data?.referrals;
  const isPnl = board === "pnl";

  const renderValue = (row: LeaderRow) =>
    isPnl ? (
      <>
        <span className={`font-bold tabular-nums ${row.value >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
          {fmtPnl(row.value)}
        </span>
        <span className="text-[10px] text-gray-500 uppercase">MON</span>
      </>
    ) : (
      <>
        <span className="text-[#6E54FF] font-bold tabular-nums">{row.value}</span>
        <span className="text-[10px] text-gray-500 uppercase">refs</span>
      </>
    );

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
          <h1 className="text-lg font-bold text-white">🏆 Leaderboard</h1>
          <div className="w-[44px]" />
        </header>

        <div className="rounded-xl border border-[#6E54FF]/30 bg-[#6E54FF]/[0.07] px-4 py-3 text-center">
          <p className="text-sm font-bold text-white">🎁 Season prizes</p>
          <p className="text-xs text-[#a89dff] mt-0.5">
            Top PNL wins <b>500 MON</b> · Top referrer wins <b>500 MON</b>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-1 rounded-xl border border-[#2a2a3a] bg-[#12121a] p-1">
          {(["pnl", "referrals"] as Board[]).map((b) => (
            <button
              key={b}
              onClick={() => setBoard(b)}
              className={`rounded-lg py-2 text-sm font-bold transition ${
                board === b ? "bg-[#6E54FF] text-white" : "text-[#8898a8] hover:text-white"
              }`}
            >
              {b === "pnl" ? "PNL" : "Referrals"}
            </button>
          ))}
        </div>

        {!isPnl && user && <InviteCard refCode={user.refCode} referralLink={user.referralLink} />}

        {loading && <p className="text-center text-gray-500 text-sm mt-8">Loading…</p>}

        {!loading && active && active.leaders.length === 0 && (
          <p className="text-center text-gray-500 text-sm mt-8">
            {isPnl ? "No games played yet. Be the first to win!" : "No players yet. Be the first to invite friends!"}
          </p>
        )}

        {!loading && active && active.leaders.length > 0 && (
          <div className="flex flex-col gap-2">
            {active.leaders.map((row) => {
              const isMe = active.me?.rank === row.rank && active.me?.username === row.username;
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
                  {renderValue(row)}
                </div>
              );
            })}
          </div>
        )}

        {!loading && active?.me && active.me.rank > active.leaders.length && (
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 border border-[#6E54FF]/50 bg-[#6E54FF]/[0.07] mt-2">
            <span className="w-9 text-center font-bold text-sm text-gray-400">#{active.me.rank}</span>
            <span className="flex-1 font-semibold text-white truncate">
              {active.me.username}
              <span className="ml-2 text-[10px] uppercase tracking-wide text-[#6E54FF]">you</span>
            </span>
            {renderValue(active.me)}
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
