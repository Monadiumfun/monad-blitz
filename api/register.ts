import { applyCors, authenticate, readJson, sendJson, type Req, type Res } from "./_lib/http.ts";
import { createUser, getUser, initSchema, isUsernameTaken, markFunded, resolveReferrer, setWallet } from "./_lib/db.ts";
import { deriveUserAddress } from "./_lib/wallet.ts";
import { fundNewUser } from "./_lib/chain.ts";
import type { Hex } from "viem";

const USERNAME_RE = /^[a-zA-Z0-9_]{3,20}$/;
const RESERVED = new Set(["admin", "monad", "blitz", "blitzgames", "support", "null", "undefined"]);

export default async function handler(req: Req, res: Res) {
  applyCors(res);
  if (req.method === "OPTIONS") return sendJson(res, 200, {});
  if (req.method !== "POST") return sendJson(res, 405, { error: "method_not_allowed" });

  const auth = authenticate(req);
  if (!auth) return sendJson(res, 401, { error: "unauthorized" });

  await initSchema();

  // One account, permanent: if they already registered, reject changes.
  const existing = await getUser(auth.user.id);
  if (existing) return sendJson(res, 409, { error: "already_registered", username: existing.username });

  const body = await readJson<{ username?: string; refCode?: string }>(req);
  const username = (body.username ?? "").trim();

  if (!USERNAME_RE.test(username)) {
    return sendJson(res, 400, { error: "invalid_username", message: "3–20 chars, letters/numbers/underscore only." });
  }
  if (RESERVED.has(username.toLowerCase())) {
    return sendJson(res, 400, { error: "reserved_username", message: "That username is reserved." });
  }
  if (await isUsernameTaken(username)) {
    return sendJson(res, 409, { error: "username_taken", message: "Username already taken." });
  }

  // Resolve optional referral code (skip = empty).
  let referredBy: number | null = null;
  const refCode = (body.refCode ?? "").trim();
  if (refCode) {
    const referrer = await resolveReferrer(refCode);
    if (!referrer) return sendJson(res, 400, { error: "invalid_ref", message: "Referral code not found." });
    if (referrer === auth.user.id) return sendJson(res, 400, { error: "self_ref", message: "You can't refer yourself." });
    referredBy = referrer;
  }

  let user;
  try {
    user = await createUser({ telegramId: auth.user.id, username, referredBy });
  } catch {
    // unique constraint race
    return sendJson(res, 409, { error: "username_taken", message: "Username already taken." });
  }

  // Each account gets its own deterministic wallet, then we fund it with
  // BLITZ + MON gas so they can play immediately.
  const walletAddress = deriveUserAddress(user.telegram_id);
  await setWallet(user.telegram_id, walletAddress);

  let funded = false;
  try {
    const fund = await fundNewUser(walletAddress as Hex);
    if (fund.ok) {
      funded = true;
      await markFunded(user.telegram_id);
    } else {
      console.error("[fund] failed for", walletAddress, fund.error);
    }
  } catch (e) {
    console.error("[fund] error", (e as Error).message);
  }

  const botUsername = process.env.BOT_USERNAME || "monad_blitz_bot";
  return sendJson(res, 200, {
    user: {
      telegramId: user.telegram_id,
      username: user.username,
      refCode: user.ref_code,
      referrals: 0,
      walletAddress,
      funded,
      referralLink: `https://t.me/${botUsername}?startapp=${user.ref_code}`,
    },
  });
}
