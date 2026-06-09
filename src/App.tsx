import { useEffect, useState, type ReactNode } from "react";
import AppShell, { type Tab } from "./components/AppShell";
import BlitzLogo from "./components/BlitzLogo";
import ChainFeed from "./components/ChainFeed";
import Leaderboard from "./components/Leaderboard";
import Settings from "./components/Settings";
import Rewards from "./components/Rewards";
import Onboarding from "./onboarding/Onboarding";
import HigherLower from "./games/HigherLower";
import LaserParty from "./games/LaserParty";
import DeathRun from "./games/DeathRun";
import type { GameId } from "./types";
import { api, type ApiUser } from "./lib/api";
import { initTelegram } from "./lib/telegram";
import { UserContext } from "./lib/userContext";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<ApiUser | null>(null);
  const [onboard, setOnboard] = useState<{ firstName: string | null; suggestedRef: string | null } | null>(null);
  const [tab, setTab] = useState<Tab>("play");
  const [currentGame, setCurrentGame] = useState<GameId>("laser-party");
  const [drawer, setDrawer] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [showReferral, setShowReferral] = useState(false);

  useEffect(() => {
    initTelegram();
    api
      .me()
      .then((res) => {
        if (res.needsOnboarding) {
          // referral can arrive via Telegram start_param OR a ?ref= query (web_app button)
          const urlRef = new URLSearchParams(window.location.search).get("ref");
          setOnboard({
            firstName: res.telegramFirstName ?? null,
            suggestedRef: res.suggestedRef ?? urlRef ?? null,
          });
        } else if (res.user) {
          setUser(res.user);
        }
      })
      .catch((e) => setError((e as Error).message || "Failed to connect."))
      .finally(() => setLoading(false));
  }, []);

  // Keep the balance live: poll the lightweight /api/balance while a user is
  // active (the fast RPC pool makes this cheap), so wins/funding show quickly.
  useEffect(() => {
    if (!user) return;
    let alive = true;
    const tick = () =>
      api
        .balance()
        .then((r) => {
          if (alive) setUser((u) => (u ? { ...u, balances: r.balances } : u));
        })
        .catch(() => {});
    const id = setInterval(tick, 5000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [user?.telegramId]);

  // "Back" inside a game now opens the games drawer (there's no home screen).
  const openDrawer = () => setDrawer(true);

  if (loading) return <Splash />;

  if (error && !user && !onboard) {
    return (
      <Splash>
        <p className="text-sm text-[#e74c3c] text-center px-8">{error}</p>
        <button
          onClick={() => location.reload()}
          className="mt-4 rounded-xl bg-[#6E54FF] px-6 py-2.5 text-sm font-bold text-white"
        >
          Retry
        </button>
      </Splash>
    );
  }

  if (!user && onboard) {
    return (
      <Onboarding
        firstName={onboard.firstName}
        suggestedRef={onboard.suggestedRef}
        onComplete={(u) => {
          setUser(u);
          setOnboard(null);
        }}
      />
    );
  }

  if (!user) return <Splash />;

  const blitzBalance = Number(user.balances?.blitz ?? 0);
  const game =
    currentGame === "higher-lower" ? <HigherLower onBack={openDrawer} blitzBalance={blitzBalance} /> :
    currentGame === "laser-party" ? <LaserParty onBack={openDrawer} blitzBalance={blitzBalance} /> :
    <DeathRun onBack={openDrawer} blitzBalance={blitzBalance} />;

  const clearOverlays = () => { setShowRewards(false); setShowReferral(false); };
  const balanceLabel = Math.floor(blitzBalance).toLocaleString("en-US");

  const content = showRewards ? (
    <Rewards onBack={() => setShowRewards(false)} onLeaderboard={() => { setShowRewards(false); setTab("leaderboard"); }} />
  ) : showReferral ? (
    <Leaderboard type="referral" user={user} onBack={() => setShowReferral(false)} />
  ) : tab === "leaderboard" ? (
    <Leaderboard type="pnl" user={user} onBack={() => setTab("play")} />
  ) : tab === "history" ? (
    <Settings user={user} onBack={() => setTab("play")} />
  ) : (
    game
  );

  return (
    <UserContext.Provider value={user}>
      <AppShell
        tab={tab}
        onTab={(t) => { clearOverlays(); setTab(t); }}
        currentGame={currentGame}
        onSelectGame={(g) => { clearOverlays(); setCurrentGame(g); }}
        refCode={user.refCode}
        referralLink={user.referralLink}
        drawer={drawer}
        setDrawer={setDrawer}
        onRewards={() => { setShowReferral(false); setShowRewards(true); }}
        onReferralLeaderboard={() => { setShowRewards(false); setShowReferral(true); }}
        balance={balanceLabel}
      >
        {content}
      </AppShell>
      <ChainFeed />
    </UserContext.Provider>
  );
}

function Splash({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-[#0a0a0f] flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl text-white brand flex items-center justify-center gap-1.5">
        <BlitzLogo className="h-[0.82em] w-auto shrink-0 text-[#6E54FF]" style={{ filter: "drop-shadow(0 0 8px rgba(110,84,255,0.6))" }} />
        Blitz
      </h1>
      {children ?? <span className="loader-ring" style={{ width: 22, height: 22, borderWidth: 3 }} />}
    </div>
  );
}

export default App;
