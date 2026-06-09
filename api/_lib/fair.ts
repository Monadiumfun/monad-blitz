import { encodePacked, keccak256, type Hex } from "viem";

export const HOUSE_EDGE = 0.96;

// Every random outcome of a game derives from this roll. serverSeed is
// committed on-chain (seedHash) before the game starts and revealed at
// settlement, so anyone can recompute the full game afterwards.
export function roll(serverSeed: Hex, clientSeed: string, gameId: number, index: number): bigint {
  return BigInt(
    keccak256(
      encodePacked(
        ["bytes32", "string", "uint256", "uint256"],
        [serverSeed, clientSeed, BigInt(gameId), BigInt(index)],
      ),
    ),
  );
}

export function deathRunMine(
  serverSeed: Hex,
  clientSeed: string,
  gameId: number,
  row: number,
  tiles: number,
): number {
  return Number(roll(serverSeed, clientSeed, gameId, row) % BigInt(tiles));
}

export function deathRunRowMultiplier(tiles: number): number {
  return (1 / (1 - 1 / tiles)) * HOUSE_EDGE;
}

export interface LaserRound {
  dim: "row" | "col";
  target: number;
  remaining: number;
}

// Lasers alternate col/row; each round targets a uniformly random line among
// the still-alive ones. Alive lines depend only on previous targets, so the
// whole sequence is recomputable from the seeds alone.
export function laserRound(
  serverSeed: Hex,
  clientSeed: string,
  gameId: number,
  grid: number,
  round: number,
): LaserRound | null {
  const destroyedRows = new Set<number>();
  const destroyedCols = new Set<number>();
  for (let r = 0; r <= round; r++) {
    const dim: "row" | "col" = r % 2 === 0 ? "col" : "row";
    const destroyed = dim === "col" ? destroyedCols : destroyedRows;
    const alive: number[] = [];
    for (let i = 0; i < grid; i++) if (!destroyed.has(i)) alive.push(i);
    if (alive.length === 0) return null;
    const target = alive[Number(roll(serverSeed, clientSeed, gameId, r) % BigInt(alive.length))];
    if (r === round) return { dim, target, remaining: alive.length };
    destroyed.add(target);
  }
  return null;
}

export function laserRoundMultiplier(remaining: number): number {
  return (1 / (1 - 1 / remaining)) * HOUSE_EDGE;
}
