import { useState } from "react";
import type { GameId } from "../types";
import type { ApiUser } from "../lib/api";
import { hapticTap, openTelegramLink } from "../lib/telegram";

interface GameHubProps {
  user: ApiUser;
  onSelectGame: (gameId: GameId) => void;
  onOpenLeaderboard: () => void;
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

function fmt(n: string | undefined): string {
  const v = Math.floor(Number(n ?? 0));
  return v.toLocaleString("en-US");
}

function GameHub({ user, onSelectGame, onOpenLeaderboard }: GameHubProps) {
  const [copied, setCopied] = useState(false);

  function share() {
    hapticTap();
    const text = `Play BlitzGames on Monad with me 🎮 — use my code "${user.refCode}" or just tap:`;
    const url = `https://t.me/share/url?url=${encodeURIComponent(user.referralLink)}&text=${encodeURIComponent(text)}`;
    openTelegramLink(url);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(user.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0f] flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-[420px] flex flex-col gap-5">
        <header className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white tracking-tight leading-none">
              Blitz<span className="text-[#a2e634]">Games</span>
            </h1>
            <span className="text-xs text-gray-500 mt-1">@{user.username}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full bg-[#1a1a24] px-3.5 py-2 border border-[#2a2a3a]">
              <span className="text-[#a2e634] font-bold text-sm tabular-nums">{fmt(user.balances?.blitz)}</span>
              <span className="text-gray-500 text-xs">BLITZ</span>
            </div>
            <button
              onClick={onOpenLeaderboard}
              className="flex items-center gap-1.5 rounded-full bg-[#1a1a24] px-3 py-2 border border-[#2a2a3a] active:scale-95 transition-transform"
            >
              <span>🏆</span>
              <span className="text-[#a2e634] font-semibold text-sm">{user.referrals}</span>
            </button>
          </div>
        </header>

        {/* Invite card */}
        <div className="rounded-2xl border border-[#a2e634]/25 bg-gradient-to-br from-[#a2e634]/[0.07] to-transparent p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-bold text-white">Invite friends, top the leaderboard</p>
              <p className="text-xs text-gray-400">
                Your code: <span className="text-[#a2e634] font-semibold">{user.refCode}</span>
              </p>
            </div>
            <span className="text-2xl">🎯</span>
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={share}
              className="flex-1 rounded-xl bg-[#a2e634] py-2.5 text-sm font-bold text-[#0a0a0f] active:scale-[0.98] transition-transform"
            >
              Share invite
            </button>
            <button
              onClick={copy}
              className="rounded-xl border border-[#2a2a3a] px-4 py-2.5 text-sm font-semibold text-gray-300 hover:text-white active:scale-[0.98] transition-all"
            >
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
        </div>

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
                  <h2 className="text-lg font-semibold text-white">{game.name}</h2>
                  <p className="text-sm text-gray-400 leading-snug">{game.description}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  hapticTap();
                  onSelectGame(game.id);
                }}
                className="relative mt-4 w-full rounded-xl bg-[#a2e634] py-2.5 text-sm font-bold text-[#0a0a0f] transition-all duration-150 hover:brightness-110 active:scale-[0.98]"
              >
                Play
              </button>
            </div>
          ))}
        </div>

        <footer className="mt-auto pt-6 pb-4 text-center">
          <p className="text-xs text-gray-500">
            Built on <span className="font-semibold text-[#836FFF]">Monad</span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default GameHub;
