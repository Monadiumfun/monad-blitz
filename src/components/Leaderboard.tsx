import { useEffect, useState } from "react";
import { api, type LeaderboardResponse } from "../lib/api";

interface Props {
  onBack: () => void;
}

function Leaderboard({ onBack }: Props) {
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .leaderboard()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const medal = (rank: number) => (rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `#${rank}`);

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
          <h1 className="text-lg font-bold text-white">🏆 Referral Leaders</h1>
          <div className="w-[44px]" />
        </header>

        {loading && <p className="text-center text-gray-500 text-sm mt-8">Loading…</p>}

        {!loading && data && data.leaders.length === 0 && (
          <p className="text-center text-gray-500 text-sm mt-8">No players yet. Be the first to invite friends!</p>
        )}

        {!loading && data && data.leaders.length > 0 && (
          <div className="flex flex-col gap-2">
            {data.leaders.map((row) => {
              const isMe = data.me?.rank === row.rank && data.me?.username === row.username;
              return (
                <div
                  key={`${row.rank}-${row.username}`}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 border ${
                    isMe ? "border-[#a2e634]/50 bg-[#a2e634]/[0.07]" : "border-[#2a2a3a] bg-[#12121a]"
                  }`}
                >
                  <span className={`w-9 text-center font-bold ${row.rank <= 3 ? "text-lg" : "text-sm text-gray-400"}`}>
                    {medal(row.rank)}
                  </span>
                  <span className="flex-1 font-semibold text-white truncate">
                    {row.username}
                    {isMe && <span className="ml-2 text-[10px] uppercase tracking-wide text-[#a2e634]">you</span>}
                  </span>
                  <span className="text-[#a2e634] font-bold tabular-nums">{row.referrals}</span>
                  <span className="text-[10px] text-gray-500 uppercase">refs</span>
                </div>
              );
            })}
          </div>
        )}

        {!loading && data?.me && data.me.rank > data.leaders.length && (
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 border border-[#a2e634]/50 bg-[#a2e634]/[0.07] mt-2">
            <span className="w-9 text-center font-bold text-sm text-gray-400">#{data.me.rank}</span>
            <span className="flex-1 font-semibold text-white truncate">
              {data.me.username}
              <span className="ml-2 text-[10px] uppercase tracking-wide text-[#a2e634]">you</span>
            </span>
            <span className="text-[#a2e634] font-bold tabular-nums">{data.me.referrals}</span>
            <span className="text-[10px] text-gray-500 uppercase">refs</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
