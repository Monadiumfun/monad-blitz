interface Props {
  onBack: () => void;
  onLeaderboard: () => void;
}

/** Rewards page — the seasonal PnL prize pool. */
function Rewards({ onBack, onLeaderboard }: Props) {
  return (
    <div className="min-h-full bg-[#0a0a0f] flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-[420px] flex flex-col gap-6">
        <header className="flex items-center">
          <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
        </header>

        <div className="text-center mt-2">
          <span className="text-5xl">🎁</span>
          <h1 className="brand text-3xl text-white mt-3">Rewards</h1>
        </div>

        {/* prize pool hero */}
        <div className="rounded-2xl border border-[#6E54FF]/40 bg-gradient-to-br from-[#6E54FF]/[0.15] to-transparent p-6 text-center">
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#8898a8]">Prize pool</div>
          <div
            className="brand text-5xl mt-2"
            style={{ color: "#6E54FF", textShadow: "0 0 18px rgba(110,84,255,0.6)" }}
          >
            500 $MON
          </div>
        </div>

        <p className="text-center text-lg font-bold text-white leading-snug">
          The best PnL Maker gets the 500 $MON prize pool
        </p>
        <p className="text-center text-sm text-[#8898a8] leading-relaxed">
          Stack the biggest profit across all games this season. Climb the PnL leaderboard and claim your share of the pool.
        </p>

        <button
          onClick={onLeaderboard}
          className="w-full rounded-xl bg-[#6E54FF] py-3.5 text-sm font-bold text-white active:scale-[0.98] transition"
        >
          View leaderboard 🏆
        </button>
      </div>
    </div>
  );
}

export default Rewards;
