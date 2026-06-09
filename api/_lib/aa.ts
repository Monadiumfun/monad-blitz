import { concatHex, custom, http, pad, toHex, type Address, type Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import {
  entryPoint07Address,
  toPackedUserOperation,
  type UserOperation,
} from "viem/account-abstraction";
import { createSmartAccountClient, type SmartAccountClient } from "permissionless";
import { toSimpleSmartAccount } from "permissionless/accounts";
import { createPimlicoClient } from "permissionless/clients/pimlico";
import { monadTestnet, publicClient } from "./chain.ts";
import { deriveUserKey } from "./wallet.ts";

export const PAYMASTER_ADDRESS = (process.env.PAYMASTER_ADDRESS || "") as Address;
const BUNDLER_RPC_URL = process.env.BUNDLER_RPC_URL || "https://public.pimlico.io/v2/10143/rpc";

const PAYMASTER_VERIFICATION_GAS = BigInt(60_000);
const PAYMASTER_POSTOP_GAS = BigInt(30_000);
const SPONSOR_VALIDITY_SECONDS = 600;

const PAYMASTER_ABI = [
  {
    type: "function",
    name: "getHash",
    stateMutability: "view",
    inputs: [
      {
        name: "userOp",
        type: "tuple",
        components: [
          { name: "sender", type: "address" },
          { name: "nonce", type: "uint256" },
          { name: "initCode", type: "bytes" },
          { name: "callData", type: "bytes" },
          { name: "accountGasLimits", type: "bytes32" },
          { name: "preVerificationGas", type: "uint256" },
          { name: "gasFees", type: "bytes32" },
          { name: "paymasterAndData", type: "bytes" },
          { name: "signature", type: "bytes" },
        ],
      },
      { name: "validUntil", type: "uint48" },
      { name: "validAfter", type: "uint48" },
    ],
    outputs: [{ type: "bytes32" }],
  },
] as const;

function paymasterSigner() {
  const pk = (process.env.PAYMASTER_SIGNER_KEY || process.env.DEPLOYER_PRIVATE_KEY) as Hex;
  if (!pk) throw new Error("PAYMASTER_SIGNER_KEY/DEPLOYER_PRIVATE_KEY missing");
  return privateKeyToAccount(pk);
}

// Well-formed dummy ECDSA sig (low-s, v=28): recover() must succeed during gas
// estimation — it just yields a non-signer address, which the paymaster treats
// as sigFailed instead of reverting.
const STUB_SIGNATURE =
  "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c" as Hex;

// BlitzGamePaymaster reads validUntil/validAfter as raw bytes6 right after the 52-byte
// paymasterAndData prefix, but expects the signature 64 bytes after them — the
// 52 bytes in between are padding it never reads.
function buildPaymasterData(validUntil: number, validAfter: number, signature: Hex): Hex {
  return concatHex([
    toHex(validUntil, { size: 6 }),
    toHex(validAfter, { size: 6 }),
    pad("0x", { size: 52 }),
    signature,
  ]);
}

type PaymasterUserOpFields = {
  sender: Address;
  nonce: bigint;
  factory?: Address;
  factoryData?: Hex;
  callData: Hex;
  callGasLimit?: bigint;
  verificationGasLimit?: bigint;
  preVerificationGas?: bigint;
  maxFeePerGas?: bigint;
  maxPriorityFeePerGas?: bigint;
  paymasterVerificationGasLimit?: bigint;
  paymasterPostOpGasLimit?: bigint;
};

async function signPaymasterData(u: PaymasterUserOpFields) {
  const validAfter = 0;
  const validUntil = Math.floor(Date.now() / 1000) + SPONSOR_VALIDITY_SECONDS;
  const packed = toPackedUserOperation({
    sender: u.sender,
    nonce: u.nonce,
    factory: u.factory,
    factoryData: u.factoryData,
    callData: u.callData,
    callGasLimit: u.callGasLimit ?? BigInt(0),
    verificationGasLimit: u.verificationGasLimit ?? BigInt(0),
    preVerificationGas: u.preVerificationGas ?? BigInt(0),
    maxFeePerGas: u.maxFeePerGas ?? BigInt(0),
    maxPriorityFeePerGas: u.maxPriorityFeePerGas ?? BigInt(0),
    paymaster: PAYMASTER_ADDRESS,
    paymasterVerificationGasLimit: u.paymasterVerificationGasLimit ?? PAYMASTER_VERIFICATION_GAS,
    paymasterPostOpGasLimit: u.paymasterPostOpGasLimit ?? PAYMASTER_POSTOP_GAS,
    paymasterData: buildPaymasterData(0, 0, STUB_SIGNATURE),
    signature: "0x",
  } as UserOperation<"0.7">);

  // The public Monad RPC rate-limits at 15 req/s; retry transient failures.
  let hash: Hex | undefined;
  let lastError: unknown;
  for (let attempt = 0; attempt < 3 && !hash; attempt++) {
    if (attempt > 0) await new Promise((r) => setTimeout(r, 400 * attempt));
    try {
      hash = await publicClient.readContract({
        address: PAYMASTER_ADDRESS,
        abi: PAYMASTER_ABI,
        functionName: "getHash",
        args: [packed, validUntil, validAfter],
      });
    } catch (e) {
      lastError = e;
    }
  }
  if (!hash) throw lastError;
  const signature = await paymasterSigner().signMessage({ message: { raw: hash } });

  return {
    paymaster: PAYMASTER_ADDRESS,
    paymasterData: buildPaymasterData(validUntil, validAfter, signature),
    paymasterVerificationGasLimit: u.paymasterVerificationGasLimit ?? PAYMASTER_VERIFICATION_GAS,
    paymasterPostOpGasLimit: u.paymasterPostOpGasLimit ?? PAYMASTER_POSTOP_GAS,
  };
}

const blitzGamePaymaster = {
  async getPaymasterStubData() {
    return {
      paymaster: PAYMASTER_ADDRESS,
      paymasterData: buildPaymasterData(0, 0, STUB_SIGNATURE),
      paymasterVerificationGasLimit: PAYMASTER_VERIFICATION_GAS,
      paymasterPostOpGasLimit: PAYMASTER_POSTOP_GAS,
    };
  },
  async getPaymasterData(u: PaymasterUserOpFields) {
    return signPaymasterData(u);
  },
};

const pimlico = createPimlicoClient({
  transport: http(BUNDLER_RPC_URL),
  entryPoint: { address: entryPoint07Address, version: "0.7" },
});

// The bundler recomputes preVerificationGas against the final calldata at
// submit time (real paymaster timestamps/sig are denser than the stub), so an
// unpadded estimate gets rejected with "preVerificationGas is not enough".
const PVG_MARGIN_PERCENT = BigInt(130);

function bundlerProvider() {
  let id = 0;
  return {
    async request({ method, params }: { method: string; params?: unknown }) {
      const res = await fetch(BUNDLER_RPC_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: ++id, method, params }),
      });
      const json = (await res.json()) as {
        result?: { preVerificationGas?: string };
        error?: { code?: number; message: string };
      };
      if (json.error) {
        const err = new Error(json.error.message) as Error & { code?: number; details?: string };
        err.code = json.error.code;
        err.details = json.error.message;
        throw err;
      }
      if (method === "eth_estimateUserOperationGas" && json.result?.preVerificationGas) {
        json.result.preVerificationGas = `0x${(
          (BigInt(json.result.preVerificationGas) * PVG_MARGIN_PERCENT) / BigInt(100)
        ).toString(16)}`;
      }
      return json.result;
    },
  };
}

function userSmartAccount(telegramId: number) {
  return toSimpleSmartAccount({
    client: publicClient,
    owner: privateKeyToAccount(deriveUserKey(telegramId)),
    entryPoint: { address: entryPoint07Address, version: "0.7" },
  });
}

export async function smartAccountAddress(telegramId: number): Promise<Address> {
  return (await userSmartAccount(telegramId)).address;
}

const clients = new Map<number, Promise<SmartAccountClient>>();

function smartClient(telegramId: number): Promise<SmartAccountClient> {
  let client = clients.get(telegramId);
  if (!client) {
    client = userSmartAccount(telegramId).then((account) =>
      createSmartAccountClient({
        account,
        chain: monadTestnet,
        bundlerTransport: custom(bundlerProvider()),
        paymaster: blitzGamePaymaster,
        userOperation: {
          estimateFeesPerGas: async () => (await pimlico.getUserOperationGasPrice()).fast,
        },
      }),
    );
    clients.set(telegramId, client);
  }
  return client;
}

// One in-flight UserOp per smart account: bundlers only allow a single pending
// op for an unstaked sender, so each user's ops are serialized.
const queues = new Map<number, Promise<unknown>>();

function enqueueUser<T>(telegramId: number, fn: () => Promise<T>): Promise<T> {
  const prev = queues.get(telegramId) ?? Promise.resolve();
  const next = prev.then(fn, fn);
  queues.set(telegramId, next.then(() => {}, () => {}));
  return next;
}

export interface Call {
  to: Address;
  data: Hex;
  value?: bigint;
}

export interface SponsoredReceipt {
  userOpHash: Hex;
  txHash: Hex;
  logs: { address: Address; topics: Hex[]; data: Hex }[];
}

export function sendSponsored(telegramId: number, calls: Call[]): Promise<SponsoredReceipt> {
  return enqueueUser(telegramId, async () => {
    const client = await smartClient(telegramId);
    const userOpHash = await client.sendUserOperation({ calls });
    const receipt = await client.waitForUserOperationReceipt({ hash: userOpHash, timeout: 60_000 });
    if (!receipt.success) throw new Error(`userOp reverted: ${userOpHash}`);
    return {
      userOpHash,
      txHash: receipt.receipt.transactionHash,
      logs: receipt.logs as SponsoredReceipt["logs"],
    };
  });
}
