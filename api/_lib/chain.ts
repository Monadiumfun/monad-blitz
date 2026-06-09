import {
  createPublicClient,
  createWalletClient,
  http,
  parseEther,
  formatEther,
  defineChain,
  type Hex,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";

export const monadTestnet = defineChain({
  id: Number(process.env.MONAD_CHAIN_ID || 10143),
  name: "Monad Testnet",
  nativeCurrency: { name: "Monad", symbol: "MON", decimals: 18 },
  rpcUrls: { default: { http: [process.env.MONAD_RPC_URL || "https://testnet-rpc.monad.xyz"] } },
});

export const BLITZ_ADDRESS = (process.env.TOKEN_ADDRESS || "") as Hex;

export const BLITZ_ABI = [
  { type: "function", name: "mint", stateMutability: "nonpayable", inputs: [{ name: "to", type: "address" }, { name: "value", type: "uint256" }], outputs: [] },
  { type: "function", name: "balanceOf", stateMutability: "view", inputs: [{ name: "a", type: "address" }], outputs: [{ type: "uint256" }] },
  { type: "function", name: "transfer", stateMutability: "nonpayable", inputs: [{ name: "to", type: "address" }, { name: "value", type: "uint256" }], outputs: [{ type: "bool" }] },
] as const;

export const publicClient = createPublicClient({ chain: monadTestnet, transport: http() });

function deployer() {
  const pk = process.env.DEPLOYER_PRIVATE_KEY as Hex;
  if (!pk) throw new Error("DEPLOYER_PRIVATE_KEY missing");
  return privateKeyToAccount(pk);
}

export function deployerWalletClient() {
  return createWalletClient({ account: deployer(), chain: monadTestnet, transport: http() });
}

// Monad testnet RPC is load-balanced and eventually-consistent: firing several
// txs from the same account within a sub-second window can hit a node with
// stale state and the tx reverts (consuming its full gas). Spacing the deployer's
// txs out reliably avoids it; we also retry-on-revert as a safety net.
const STEP_DELAY_MS = Number(process.env.FUND_STEP_DELAY_MS || 2500);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Serialize all deployer-originated txs so concurrent registrations don't
// collide on the nonce (single-process model — see README for Vercel notes).
let queue: Promise<unknown> = Promise.resolve();
function enqueue<T>(fn: () => Promise<T>): Promise<T> {
  const next = queue.then(fn, fn);
  // keep the chain alive even if a job throws
  queue = next.then(() => {}, () => {});
  return next as Promise<T>;
}

/**
 * Send one deployer tx and confirm it; if it reverts (transient RPC state lag),
 * wait and retry with a fresh nonce. Returns the mined-success tx hash.
 */
async function sendConfirmed(send: () => Promise<Hex>, label: string): Promise<Hex> {
  let lastErr = "";
  for (let attempt = 0; attempt < 4; attempt++) {
    if (attempt > 0) await sleep(STEP_DELAY_MS);
    try {
      const hash = await send();
      const rc = await publicClient.waitForTransactionReceipt({ hash });
      if (rc.status === "success") return hash;
      lastErr = `${label} reverted (attempt ${attempt + 1})`;
    } catch (e) {
      lastErr = `${label}: ${(e as Error).message}`;
    }
  }
  throw new Error(lastErr || `${label} failed`);
}

export interface FundResult {
  ok: boolean;
  blitzTx?: Hex;
  monTx?: Hex;
  error?: string;
}

/**
 * Mint BLITZ + send MON gas to a freshly created user wallet.
 *
 * The whole job is serialized (see `enqueue`) so the deployer's nonce never
 * collides across concurrent registrations. We let viem auto-manage nonce and
 * gas, and wait for the mint receipt before sending MON — on Monad, gas is
 * billed on the limit and estimating a 2nd tx against an unsettled state can
 * mis-estimate and revert, so sequential settlement keeps it reliable & fast.
 */
export function fundNewUser(to: Hex): Promise<FundResult> {
  return enqueue(async () => {
    try {
      const wallet = deployerWalletClient();
      const blitz = parseEther(process.env.USER_BLITZ_GRANT || "10000");
      const mon = parseEther(process.env.USER_MON_GRANT || "0.1");

      const blitzTx = await sendConfirmed(
        () => wallet.writeContract({ address: BLITZ_ADDRESS, abi: BLITZ_ABI, functionName: "mint", args: [to, blitz] }),
        "mint",
      );
      await sleep(STEP_DELAY_MS);
      const monTx = await sendConfirmed(() => wallet.sendTransaction({ to, value: mon }), "mon");

      return { ok: true, blitzTx, monTx };
    } catch (e) {
      return { ok: false, error: (e as Error).message };
    }
  });
}

export interface Balances {
  mon: string;
  blitz: string;
}

export async function getBalances(address: Hex): Promise<Balances> {
  const [mon, blitz] = await Promise.all([
    publicClient.getBalance({ address }),
    publicClient.readContract({ address: BLITZ_ADDRESS, abi: BLITZ_ABI, functionName: "balanceOf", args: [address] }),
  ]);
  return { mon: formatEther(mon), blitz: formatEther(blitz as bigint) };
}
