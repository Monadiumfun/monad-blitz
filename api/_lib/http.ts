import type { IncomingMessage, ServerResponse } from "node:http";
import { verifyInitData, type VerifiedInit } from "./telegram.ts";

export type Req = IncomingMessage & { body?: unknown; query?: Record<string, string> };
export type Res = ServerResponse;

export function sendJson(res: Res, status: number, data: unknown): void {
  const body = JSON.stringify(data);
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(body);
}

/** Read + parse a JSON body, portable across Vercel (pre-parsed) and raw Node http. */
export async function readJson<T = Record<string, unknown>>(req: Req): Promise<T> {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === "string") {
      try {
        return JSON.parse(req.body) as T;
      } catch {
        return {} as T;
      }
    }
    return req.body as T;
  }
  const chunks: Buffer[] = [];
  for await (const c of req) chunks.push(c as Buffer);
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {} as T;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return {} as T;
  }
}

/**
 * Authenticate a request via Telegram initData (header `x-init-data`).
 * In dev, if ALLOW_DEV_AUTH=1, accept header `x-dev-user: <id>:<name>` for
 * browser testing outside Telegram. Returns null (and the caller should 401).
 */
export function authenticate(req: Req): VerifiedInit | null {
  const initData = header(req, "x-init-data");
  const token = process.env.TELEGRAM_BOT_TOKEN || "";
  if (initData) {
    const v = verifyInitData(initData, token);
    if (v) return v;
  }
  if (process.env.ALLOW_DEV_AUTH === "1") {
    const dev = header(req, "x-dev-user");
    if (dev) {
      const [idStr, ...rest] = dev.split(":");
      const id = Number(idStr);
      if (id) {
        return {
          user: { id, first_name: rest.join(":") || `dev${id}` },
          startParam: header(req, "x-dev-start") || null,
        };
      }
    }
  }
  return null;
}

function header(req: Req, name: string): string | null {
  const v = req.headers[name];
  if (Array.isArray(v)) return v[0] ?? null;
  return v ?? null;
}

/** Standard CORS for the mini app (same-origin in prod, permissive for dev). */
export function applyCors(res: Res): void {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type, x-init-data, x-dev-user, x-dev-start");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
}
