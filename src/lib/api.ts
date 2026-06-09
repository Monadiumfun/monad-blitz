import { getInitData } from "./telegram";

export interface ApiUser {
  telegramId: number;
  username: string;
  refCode: string;
  referrals: number;
  walletAddress: string | null;
  funded?: boolean;
  balances?: { mon: string; blitz: string };
  referralLink: string;
}

export interface MeResponse {
  needsOnboarding: boolean;
  user?: ApiUser;
  telegramFirstName?: string | null;
  suggestedRef?: string | null;
}

export type LeaderboardType = "referral" | "pnl";

export interface LeaderEntry {
  rank: number;
  username: string;
  referrals?: number;
  pnl?: number;
  games?: number;
}

export interface LeaderboardResponse {
  type: LeaderboardType;
  leaders: LeaderEntry[];
  me: LeaderEntry | null;
}

// In dev (browser, no Telegram), fall back to a stable fake identity so the
// flow is testable. Disabled automatically inside Telegram.
function devHeaders(): Record<string, string> {
  if (import.meta.env.PROD) return {};
  if (getInitData()) return {};
  // dev impersonation is opt-in and gated by a secret shared with the server;
  // without VITE_DEV_AUTH_SECRET we send nothing (real Telegram auth only).
  const secret = import.meta.env.VITE_DEV_AUTH_SECRET as string | undefined;
  if (!secret) return {};
  let id = localStorage.getItem("dev_uid");
  if (!id) {
    id = String(100000 + Math.floor(Math.random() * 900000));
    localStorage.setItem("dev_uid", id);
  }
  const start = new URLSearchParams(window.location.search).get("ref");
  const h: Record<string, string> = { "x-dev-user": `${id}:Player${id}`, "x-dev-secret": secret };
  if (start) h["x-dev-start"] = start;
  return h;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    "content-type": "application/json",
    ...devHeaders(),
  };
  const initData = getInitData();
  if (initData) headers["x-init-data"] = initData;

  const res = await fetch(path, { ...init, headers: { ...headers, ...(init?.headers as object) } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error((data as { message?: string }).message || (data as { error?: string }).error || "request_failed");
    (err as Error & { code?: string }).code = (data as { error?: string }).error;
    throw err;
  }
  return data as T;
}

export const api = {
  me: () => request<MeResponse>("/api/me"),
  balance: () => request<{ walletAddress: string; balances: { mon: string; blitz: string } }>("/api/balance"),
  register: (username: string, refCode?: string) =>
    request<{ user: ApiUser }>("/api/register", {
      method: "POST",
      body: JSON.stringify({ username, refCode: refCode || "" }),
    }),
  leaderboard: (type: LeaderboardType = "referral") =>
    request<LeaderboardResponse>(`/api/leaderboard?type=${type}`),
  submitScore: (game: string, score: number) =>
    request<{ ok: boolean }>("/api/score", {
      method: "POST",
      body: JSON.stringify({ game, score }),
    }).catch(() => ({ ok: false })),
  gameStart: (
    game: string,
    wager?: number,
    clientSeed?: string,
    config?: { tiles?: number; grid?: number },
  ) =>
    request<{ gameId: number; txHash: string }>("/api/game-start", {
      method: "POST",
      body: JSON.stringify({ game, wager, clientSeed, config }),
    }),
  gameMove: (gameId: number, moveType: number, value: number) =>
    request<{ txHash: string }>("/api/game-move", {
      method: "POST",
      body: JSON.stringify({ gameId, moveType, value }),
    }),
  gameOutcome: (gameId: number, index: number, pick: number | { row: number; col: number }) =>
    request<{
      mine?: number;
      dim?: "row" | "col";
      target?: number;
      hit: boolean;
      multiplier: number;
    }>("/api/game-outcome", {
      method: "POST",
      body: JSON.stringify({ gameId, index, pick }),
    }),
  gameEnd: (gameId: number, score: number, multiplier: number) =>
    request<{ txHash: string; payout: string | null }>("/api/game-end", {
      method: "POST",
      body: JSON.stringify({ gameId, score, multiplier }),
    }),
};
