import { useEffect, useState, type ReactNode } from "react";
import GameHub from "./components/GameHub";
import Leaderboard from "./components/Leaderboard";
import Onboarding from "./onboarding/Onboarding";
import HigherLower from "./games/HigherLower";
import LaserParty from "./games/LaserParty";
import DeathRun from "./games/DeathRun";
import type { GameId } from "./types";
import { api, type ApiUser } from "./lib/api";
import { initTelegram } from "./lib/telegram";

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
          className="mt-4 rounded-xl bg-[#a2e634] px-6 py-2.5 text-sm font-bold text-[#0a0a0f]"
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
    if (screen.game === "higher-lower") return <HigherLower onBack={backToHub} />;
    if (screen.game === "laser-party") return <LaserParty onBack={backToHub} />;
    if (screen.game === "death-run") return <DeathRun onBack={backToHub} />;
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
      <h1 className="text-3xl font-extrabold text-white tracking-tight animate-pulse">
        Nad<span className="text-[#a2e634]">Games</span>
      </h1>
      {children}
    </div>
  );
}

export default App;
