import {
  encodeFunctionData,
  encodePacked,
  keccak256,
  parseEventLogs,
  type Address,
  type Hex,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { BLITZ_ADDRESS } from "./chain.ts";
import type { Call, SponsoredReceipt } from "./aa.ts";

export const NADGAMES_ADDRESS = (process.env.NADGAMES_ADDRESS || "") as Address;
export const NADMOVES_ADDRESS = (process.env.NADMOVES_ADDRESS || "") as Address;

export const GAME_TYPES: Record<string, number> = {
  "higher-lower": 0,
  "laser-party": 1,
  "death-run": 2,
};

export const MAX_MULTIPLIER_BPS = 100_000;

const APPROVE_ABI = [
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
    ],
    outputs: [{ type: "bool" }],
  },
] as const;

const NADGAMES_ABI = [
  {
    type: "function",
    name: "createGame",
    stateMutability: "nonpayable",
    inputs: [
      { name: "gameType", type: "uint8" },
      { name: "wager", type: "uint256" },
      { name: "seedHash", type: "bytes32" },
    ],
    outputs: [{ name: "gameId", type: "uint256" }],
  },
  {
    type: "function",
    name: "cashout",
    stateMutability: "nonpayable",
    inputs: [
      { name: "gameId", type: "uint256" },
      { name: "multiplierBps", type: "uint256" },
      { name: "seed", type: "bytes32" },
      { name: "sig", type: "bytes" },
    ],
    outputs: [],
  },
  {
    type: "event",
    name: "GameCreated",
    inputs: [
      { name: "gameId", type: "uint256", indexed: true },
      { name: "player", type: "address", indexed: true },
      { name: "gameType", type: "uint8", indexed: false },
      { name: "wager", type: "uint256", indexed: false },
      { name: "seedHash", type: "bytes32", indexed: false },
    ],
  },
  {
    type: "event",
    name: "GameCashedOut",
    inputs: [
      { name: "gameId", type: "uint256", indexed: true },
      { name: "multiplierBps", type: "uint256", indexed: false },
      { name: "payout", type: "uint256", indexed: false },
    ],
  },
] as const;

const NADMOVES_ABI = [
  {
    type: "function",
    name: "recordMove",
    stateMutability: "nonpayable",
    inputs: [
      { name: "gameId", type: "uint256" },
      { name: "moveType", type: "uint8" },
      { name: "value", type: "uint256" },
    ],
    outputs: [],
  },
] as const;

function gameSigner() {
  const pk = (process.env.GAME_SIGNER_KEY || process.env.DEPLOYER_PRIVATE_KEY) as Hex;
  if (!pk) throw new Error("GAME_SIGNER_KEY/DEPLOYER_PRIVATE_KEY missing");
  return privateKeyToAccount(pk);
}

export function buildStartCalls(gameType: number, wager: bigint, seedHash: Hex): Call[] {
  return [
    {
      to: BLITZ_ADDRESS,
      data: encodeFunctionData({
        abi: APPROVE_ABI,
        functionName: "approve",
        args: [NADGAMES_ADDRESS, wager],
      }),
    },
    {
      to: NADGAMES_ADDRESS,
      data: encodeFunctionData({
        abi: NADGAMES_ABI,
        functionName: "createGame",
        args: [gameType, wager, seedHash],
      }),
    },
  ];
}

export function parseGameCreated(receipt: SponsoredReceipt): bigint | null {
  const events = parseEventLogs({
    abi: NADGAMES_ABI,
    eventName: "GameCreated",
    logs: receipt.logs,
  });
  return events.length ? events[0].args.gameId : null;
}

export function parseCashedOut(receipt: SponsoredReceipt): bigint | null {
  const events = parseEventLogs({
    abi: NADGAMES_ABI,
    eventName: "GameCashedOut",
    logs: receipt.logs,
  });
  return events.length ? events[0].args.payout : null;
}

export function buildMoveCall(gameId: bigint, moveType: number, value: bigint): Call {
  return {
    to: NADMOVES_ADDRESS,
    data: encodeFunctionData({
      abi: NADMOVES_ABI,
      functionName: "recordMove",
      args: [gameId, moveType, value],
    }),
  };
}

export async function buildCashoutCall(
  gameId: bigint,
  player: Address,
  multiplierBps: bigint,
  seed: Hex,
): Promise<Call> {
  const hash = keccak256(
    encodePacked(
      ["uint256", "address", "uint256", "bytes32"],
      [gameId, player, multiplierBps, seed],
    ),
  );
  const sig = await gameSigner().signMessage({ message: { raw: hash } });
  return {
    to: NADGAMES_ADDRESS,
    data: encodeFunctionData({
      abi: NADGAMES_ABI,
      functionName: "cashout",
      args: [gameId, multiplierBps, seed, sig],
    }),
  };
}
