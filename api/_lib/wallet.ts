import { keccak256, toBytes, type Hex } from "viem";
import { privateKeyToAccount, type PrivateKeyAccount } from "viem/accounts";

/**
 * Each user gets their own wallet, derived deterministically from a single
 * server-side master seed + their telegram_id. The wallet is therefore:
 *  - unique & permanently tied to the account (never changes)
 *  - recomputable on demand for signing game txs (no private keys stored at rest)
 *
 * Only MASTER_WALLET_SEED must be kept secret; losing it loses all user keys.
 */
export function deriveUserKey(telegramId: number): Hex {
  const seed = process.env.MASTER_WALLET_SEED;
  if (!seed) throw new Error("MASTER_WALLET_SEED missing");
  return keccak256(toBytes(`${seed}:nadgames:${telegramId}`));
}

export function deriveUserAccount(telegramId: number): PrivateKeyAccount {
  return privateKeyToAccount(deriveUserKey(telegramId));
}

export function deriveUserAddress(telegramId: number): string {
  return deriveUserAccount(telegramId).address;
}
