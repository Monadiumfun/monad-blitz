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

export interface LeaderboardResponse {
  leaders: { rank: number; username: string; referrals: number }[];
  me: { rank: number; username: string; referrals: number } | null;
}

// In dev (browser, no Telegram), fall back to a stable fake identity so the
// flow is testable. Disabled automatically inside Telegram.
function devHeaders(): Record<string, string> {
  if (import.meta.env.PROD) return {};
  if (getInitData()) return {};
  let id = localStorage.getItem("dev_uid");
  if (!id) {
    id = String(100000 + Math.floor(Math.random() * 900000));
    localStorage.setItem("dev_uid", id);
  }
  const start = new URLSearchParams(window.location.search).get("ref");
  const h: Record<string, string> = { "x-dev-user": `${id}:Player${id}` };
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
  register: (username: string, refCode?: string) =>
    request<{ user: ApiUser }>("/api/register", {
      method: "POST",
      body: JSON.stringify({ username, refCode: refCode || "" }),
    }),
  leaderboard: () => request<LeaderboardResponse>("/api/leaderboard"),
  submitScore: (game: string, score: number) =>
    request<{ ok: boolean }>("/api/score", {
      method: "POST",
      body: JSON.stringify({ game, score }),
    }).catch(() => ({ ok: false })),
};
