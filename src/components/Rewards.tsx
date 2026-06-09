interface Props {
  onBack: () => void;
  onLeaderboard: () => void;
  onReferral: () => void;
}

function PoolCard({ emoji, title, desc, cta, onClick }: { emoji: string; title: string; desc: string; cta: string; onClick: () => void }) {
  return (
    <div className="rounded-2xl border border-[#6E54FF]/40 bg-gradient-to-br from-[#6E54FF]/[0.12] to-transparent p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-white">{emoji} {title}</span>
        <span className="brand text-base" style={{ color: "#6E54FF", textShadow: "0 0 12px rgba(110,84,255,0.5)" }}>500 $MON</span>
      </div>
      <p className="text-xs text-[#8898a8] leading-relaxed">{desc}</p>
      <button onClick={onClick} className="w-full rounded-xl bg-[#6E54FF] py-2.5 text-sm font-bold text-white active:scale-[0.98] transition">
        {cta}
      </button>
    </div>
  );
}

/** Rewards page — the seasonal prize pools (PnL + referrals). */
function Rewards({ onBack, onLeaderboard, onReferral }: Props) {
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
          <p className="text-sm text-[#8898a8] mt-2">Two 500 $MON prize pools this season</p>
        </div>

        <PoolCard
          emoji="💰"
          title="Best PnL Maker"
          desc="Stack the biggest net profit across all games to win the pool."
          cta="PnL leaderboard 🏆"
          onClick={onLeaderboard}
        />
        <PoolCard
          emoji="🤝"
          title="Top 3 referrers"
          desc="Invite the most friends — the top 3 referrers share the pool."
          cta="Referral leaderboard 👥"
          onClick={onReferral}
        />
      </div>
    </div>
  );
}

export default Rewards;
