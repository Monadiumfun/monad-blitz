import { applyCors, authenticate, sendJson, type Req, type Res } from "./_lib/http";
import { countReferrals, getUser, initSchema, markFunded, setWallet } from "./_lib/db";
import { smartAccountAddress } from "./_lib/aa";
import { fundNewUser, getBalances } from "./_lib/chain";
import type { Hex } from "viem";

export default async function handler(req: Req, res: Res) {
  applyCors(res);
  if (req.method === "OPTIONS") return sendJson(res, 200, {});

  const auth = authenticate(req);
  if (!auth) return sendJson(res, 401, { error: "unauthorized" });

  await initSchema();
  const user = await getUser(auth.user.id);

  if (!user) {
    return sendJson(res, 200, {
      needsOnboarding: true,
      telegramFirstName: auth.user.first_name ?? null,
      suggestedRef: auth.startParam ?? null,
    });
  }

  const referrals = await countReferrals(user.telegram_id);
  const botUsername = process.env.BOT_USERNAME || "monad_blitz_bot";

  // Ensure the wallet is the ERC-4337 smart account address; rows created
  // before the AA migration stored the owner EOA — re-point and re-fund them.
  const walletAddress = (await smartAccountAddress(user.telegram_id)) as Hex;
  const migrated = user.wallet_address !== walletAddress;
  if (migrated) await setWallet(user.telegram_id, walletAddress);

  let funded = !!user.funded && !migrated;
  if (!funded) {
    const fund = await fundNewUser(walletAddress);
    if (fund.ok) {
      funded = true;
      await markFunded(user.telegram_id);
    }
  }

  let balances = { mon: "0", blitz: "0" };
  try {
    balances = await getBalances(walletAddress);
  } catch {
    /* RPC hiccup — show zeros rather than fail */
  }

  return sendJson(res, 200, {
    needsOnboarding: false,
    user: {
      telegramId: user.telegram_id,
      username: user.username,
      refCode: user.ref_code,
      referrals,
      walletAddress,
      funded,
      balances,
      referralLink: `https://t.me/${botUsername}?startapp=${user.ref_code}`,
    },
  });
}
