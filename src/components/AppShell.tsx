import { type ReactNode } from "react";
import type { GameId } from "../types";
import BlitzLogo from "./BlitzLogo";
import { hapticTap, openTelegramLink } from "../lib/telegram";

export type Tab = "history" | "play" | "leaderboard";

const GAMES: { id: GameId; emoji: string; name: string }[] = [
  { id: "death-run", emoji: "💀", name: "Death Run" },
  { id: "laser-party", emoji: "🔫", name: "Laser Party" },
  { id: "higher-lower", emoji: "⚡", name: "Higher or Lower" },
];

interface Props {
  tab: Tab;
  onTab: (t: Tab) => void;
  currentGame: GameId;
  onSelectGame: (g: GameId) => void;
  refCode: string;
  referralLink: string;
  referrals: number;
  blitzBalance: number;
  drawer: boolean;
  setDrawer: (v: boolean) => void;
  children: ReactNode;
}

function fmtBlitz(n: number): string {
  const v = Math.max(0, Math.floor(n));
  return v >= 100_000
    ? Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(v)
    : v.toLocaleString("en");
}

function AppShell({ tab, onTab, currentGame, onSelectGame, refCode, referralLink, referrals, blitzBalance, drawer, setDrawer, children }: Props) {

  function shareRef() {
    hapticTap();
    const text = `Play on Monad with me 🎮 — use my code "${refCode}" or just tap:`;
    openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`);
  }

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0f]">
      {/* top bar */}
      <header className="fixed top-0 inset-x-0 z-30 h-14 flex items-center justify-between px-4 border-b border-[#1a1a24] bg-[#0a0a0f]/90 backdrop-blur">
        <button onClick={() => { hapticTap(); setDrawer(true); }} aria-label="Menu" className="p-1.5 -ml-1.5 text-[#8898a8] active:scale-90 transition">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <span className="brand flex items-center gap-1.5 text-lg text-white absolute left-1/2 -translate-x-1/2">
          <BlitzLogo className="h-[0.9em] w-auto text-[#6E54FF]" style={{ filter: "drop-shadow(0 0 6px rgba(110,84,255,0.6))" }} />
          Blitz
        </span>
        <div className="flex items-center gap-2 -mr-1.5">
          <div className="flex items-center gap-1 rounded-full border border-[#6E54FF40] bg-[#6E54FF1a] px-2.5 py-1" aria-label="BLITZ balance">
            <BlitzLogo className="h-3 w-auto text-[#6E54FF]" />
            <span className="text-xs font-bold tabular-nums text-white">{fmtBlitz(blitzBalance)}</span>
          </div>
          <button onClick={shareRef} aria-label={`Invite — ${referrals} referrals`} className="relative p-1.5 text-[#8898a8] active:scale-90 transition">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M16 13c2.2 0 4 1.8 4 4v2M2 19v-2c0-2.2 1.8-4 4-4h6c2.2 0 4 1.8 4 4v2M9 9a3 3 0 100-6 3 3 0 000 6zm9-1a2.5 2.5 0 100-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {referrals > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-[#6E54FF] text-[10px] font-bold text-white tabular-nums">
                {referrals > 99 ? "99+" : referrals}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* content */}
      <main className="pt-14 pb-[68px] min-h-[100dvh]">{children}</main>

      {/* bottom nav */}
      <nav className="fixed bottom-0 inset-x-0 z-30 h-[68px] grid grid-cols-3 border-t border-[#1a1a24] bg-[#0a0a0f]/95 backdrop-blur">
        <NavItem active={tab === "history"} onClick={() => onTab("history")} label="History"
          icon={<path d="M3 17l5-5 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />} />
        <NavItem active={tab === "play"} onClick={() => onTab("play")} label="Play"
          icon={<><rect x="2" y="7" width="20" height="11" rx="3" stroke="currentColor" strokeWidth="2" /><path d="M7 12h3M8.5 10.5v3M15 11.5h.01M17.5 13.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>} />
        <NavItem active={tab === "leaderboard"} onClick={() => onTab("leaderboard")} label="Leaderboard"
          icon={<path d="M6 9a6 6 0 0012 0M6 9V4h12v5M9 20h6M12 15v5M8 4H5v2a3 3 0 003 3m8-5h3v2a3 3 0 01-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />} />
      </nav>

      {/* drawer */}
      {drawer && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/60 animate-fade-in" onClick={() => setDrawer(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[78%] max-w-[320px] bg-[#0a0a0f] border-r border-[#1a1a24] p-5 flex flex-col gap-1 animate-slide-left">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-[#586878]">Games</span>
              <button onClick={() => setDrawer(false)} aria-label="Close" className="text-[#8898a8] p-1 active:scale-90">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              </button>
            </div>
            {GAMES.map((g) => {
              const active = g.id === currentGame && tab === "play";
              return (
                <button
                  key={g.id}
                  onClick={() => { hapticTap(); onSelectGame(g.id); onTab("play"); setDrawer(false); }}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                    active ? "bg-[#6E54FF]/10 border border-[#6E54FF]/40" : "border border-transparent hover:bg-[#12121a]"
                  }`}
                >
                  <span className="text-xl w-6 text-center">{g.emoji}</span>
                  <span className={`font-bold ${active ? "text-[#6E54FF]" : "text-white"}`}>{g.name}</span>
                </button>
              );
            })}

            <div className="h-px bg-[#1a1a24] my-3" />
            <DrawerLink emoji="🏆" label="Leaderboard" onClick={() => { onTab("leaderboard"); setDrawer(false); }} />
            <DrawerLink emoji="🎯" label="Invite friends" onClick={() => { setDrawer(false); shareRef(); }} />
          </div>
        </div>
      )}
    </div>
  );
}

function NavItem({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon: ReactNode }) {
  const c = active ? "#6E54FF" : "#586878";
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center gap-1 active:scale-95 transition" style={{ color: c }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">{icon}</svg>
      <span className="text-[10px] font-semibold uppercase tracking-wide">{label}</span>
    </button>
  );
}

function DrawerLink({ emoji, label, onClick }: { emoji: string; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-[#12121a] transition">
      <span className="w-6 text-center">{emoji}</span>
      <span className="font-semibold text-[#c7d0da]">{label}</span>
    </button>
  );
}

export default AppShell;
