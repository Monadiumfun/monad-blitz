interface GameHubProps {
  onSelectGame: (gameId: "higher-lower" | "laser-party" | "death-run") => void;
  balance: number;
}

const games = [
  {
    id: "higher-lower" as const,
    emoji: "⚡",
    name: "Higher or Lower",
    description: "Which one is more famous? Test your knowledge!",
    delay: "0.1s",
  },
  {
    id: "laser-party" as const,
    emoji: "🔫",
    name: "Laser Party",
    description: "Survive the laser grid. Cash out or get destroyed!",
    delay: "0.2s",
  },
  {
    id: "death-run" as const,
    emoji: "💀",
    name: "Death Run",
    description: "Climb the tower. One wrong step and it's over!",
    delay: "0.3s",
  },
];

function GameHub({ onSelectGame, balance }: GameHubProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-[420px] flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Nad<span className="text-[#a2e634]">Games</span>
          </h1>
          <div className="flex items-center gap-2 rounded-full bg-[#1a1a24] px-4 py-2 border border-[#2a2a3a]">
            <span className="text-[#a2e634] font-semibold text-sm">
              {balance} MON
            </span>
          </div>
        </header>

        <div className="flex flex-col gap-4">
          {games.map((game) => (
            <div
              key={game.id}
              className="animate-fade-in relative overflow-hidden rounded-2xl border border-[#2a2a3a] bg-gradient-to-br from-[#12121c] to-[#0e0e18] p-5 transition-all duration-200 hover:border-[#a2e634]/40 hover:shadow-[0_0_24px_rgba(162,230,52,0.08)]"
              style={{ animationDelay: game.delay }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#a2e634]/[0.03] to-transparent pointer-events-none" />
              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1a1a24] text-2xl">
                  {game.emoji}
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <h2 className="text-lg font-semibold text-white">
                    {game.name}
                  </h2>
                  <p className="text-sm text-gray-400 leading-snug">
                    {game.description}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onSelectGame(game.id)}
                className="relative mt-4 w-full rounded-xl bg-[#a2e634] py-2.5 text-sm font-bold text-[#0a0a0f] transition-all duration-150 hover:brightness-110 active:scale-[0.98]"
              >
                Play
              </button>
            </div>
          ))}
        </div>

        <footer className="mt-auto pt-6 pb-4 text-center">
          <p className="text-xs text-gray-500">
            Built on{" "}
            <span className="font-semibold text-[#836FFF]">Monad</span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default GameHub;
