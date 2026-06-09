import { useEffect, useState, type ReactNode } from "react";
import GameHub from "./components/GameHub";
import BlitzLogo from "./components/BlitzLogo";
import ChainFeed from "./components/ChainFeed";
import Leaderboard from "./components/Leaderboard";
import Onboarding from "./onboarding/Onboarding";
import HigherLower from "./games/HigherLower";
import LaserParty from "./games/LaserParty";
import DeathRun from "./games/DeathRun";
import type { GameId } from "./types";
import { api, type ApiUser } from "./lib/api";
import { initTelegram } from "./lib/telegram";
import { UserContext } from "./lib/userContext";

type Screen = { name: "hub" } | { name: "game"; game: GameId } | { name: "leaderboard" };

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<ApiUser | null>(null);
  const [onboard, setOnboard] = useState<{ firstName: string | null; suggestedRef: string | null } | null>(null);
  const [screen, setScreen] = useState<Screen>({ name: "hub" });

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

  // Return to the hub and refresh the referral count.
  function backToHub() {
    setScreen({ name: "hub" });
    api
      .me()
      .then((res) => res.user && setUser(res.user))
      .catch(() => {});
  }

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

  if (screen.name === "leaderboard") return <Leaderboard onBack={backToHub} />;

  if (screen.name === "game") {
    const blitzBalance = Number(user.balances?.blitz ?? 0);
    const game =
      screen.game === "higher-lower" ? <HigherLower onBack={backToHub} blitzBalance={blitzBalance} /> :
      screen.game === "laser-party" ? <LaserParty onBack={backToHub} blitzBalance={blitzBalance} /> :
      <DeathRun onBack={backToHub} blitzBalance={blitzBalance} />;
    return (
      <UserContext.Provider value={user}>
        {game}
        <ChainFeed />
      </UserContext.Provider>
    );
  }

  return (
    <GameHub
      user={user}
      onSelectGame={(game) => setScreen({ name: "game", game })}
      onOpenLeaderboard={() => setScreen({ name: "leaderboard" })}
    />
  );
}

function Splash({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-[#0a0a0f] flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl text-white brand animate-pulse flex items-center justify-center gap-1.5">
        <BlitzLogo className="h-[0.82em] w-auto shrink-0 text-[#6E54FF]" style={{ filter: "drop-shadow(0 0 8px rgba(110,84,255,0.6))" }} />
        Blitz
      </h1>
      {children}
    </div>
  );
}

export default App;
