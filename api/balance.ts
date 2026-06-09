import { applyCors, authenticate, sendJson, type Req, type Res } from "./_lib/http";
import { getUser, initSchema } from "./_lib/db";
import { smartAccountAddress } from "./_lib/aa";
import { getBalances } from "./_lib/chain";
import type { Hex } from "viem";

// Lightweight balance read for live polling — no funding / migration / DB writes,
// so the UI can refresh the balance often and cheaply (fast RPC pool).
export default async function handler(req: Req, res: Res) {
  applyCors(res);
  if (req.method === "OPTIONS") return sendJson(res, 200, {});

  const auth = authenticate(req);
  if (!auth) return sendJson(res, 401, { error: "unauthorized" });

  await initSchema();
  const user = await getUser(auth.user.id);
  if (!user) return sendJson(res, 404, { error: "not_registered" });

  const wallet = (user.wallet_address || (await smartAccountAddress(user.telegram_id))) as Hex;
  let balances = { mon: "0", blitz: "0" };
  try {
    balances = await getBalances(wallet);
  } catch {
    /* transient RPC hiccup — return last-known zeros rather than fail */
  }
  return sendJson(res, 200, { walletAddress: wallet, balances });
}
