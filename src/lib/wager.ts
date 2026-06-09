const num = (v: string | undefined, fallback: number): number => {
  const n = Number(v)
  return Number.isFinite(n) && n > 0 ? n : fallback
}

export const WAGER_MIN = num(import.meta.env.VITE_WAGER_MIN, 10)
export const WAGER_MAX = num(import.meta.env.VITE_WAGER_MAX, 1000)
export const WAGER_DEFAULT = Math.min(
  Math.max(num(import.meta.env.VITE_WAGER_DEFAULT, 100), WAGER_MIN),
  WAGER_MAX,
)

export const WAGER_PRESETS = Array.from(
  new Set([WAGER_MIN, WAGER_DEFAULT, WAGER_DEFAULT * 5, WAGER_MAX]),
)
  .filter(v => v >= WAGER_MIN && v <= WAGER_MAX)
  .sort((a, b) => a - b)

export function maxAffordable(balance: number): number {
  return Math.min(WAGER_MAX, Math.floor(balance))
}

export function clampWager(value: number, balance: number): number {
  const upper = maxAffordable(balance)
  if (upper < WAGER_MIN) return WAGER_MIN
  return Math.min(Math.max(Math.round(value), WAGER_MIN), upper)
}
