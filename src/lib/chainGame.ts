import { api } from './api'
import { trackTx } from './chainFeed'
import type { GameId } from '../types'

export interface StartResult {
  gameId: number
  txHash: string
}

export interface EndResult {
  txHash: string
  payout: string | null
}

export interface Outcome {
  mine?: number
  dim?: 'row' | 'col'
  target?: number
  hit: boolean
  multiplier: number
}

interface Session {
  game: GameId
  promise: Promise<StartResult | null>
}

let session: Session | null = null

function randomClientSeed(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return '0x' + Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')
}

// Idempotent while a session is open (StrictMode double-mounts effects in dev).
export function startChainGame(
  game: GameId,
  wager?: number,
  config?: { tiles?: number; grid?: number },
): Promise<StartResult | null> {
  if (session?.game === game) return session.promise
  const t = trackTx('Start game')
  const promise = api
    .gameStart(game, wager, randomClientSeed(), config)
    .then(r => {
      t.confirm(r.txHash)
      return r
    })
    .catch(() => {
      t.fail()
      return null
    })
  session = { game, promise }
  return promise
}

// Server-derived provably-fair outcome for the current step; null when the
// game is not running on-chain (caller falls back to local randomness).
export function fetchOutcome(
  index: number,
  pick: number | { row: number; col: number },
): Promise<Outcome | null> {
  const s = session
  if (!s) return Promise.resolve(null)
  return s.promise.then(r =>
    r ? api.gameOutcome(r.gameId, index, pick).catch(() => null) : null,
  )
}

export function recordChainMove(moveType: number, value = 0) {
  const s = session
  if (!s) return
  const t = trackTx('Move')
  void s.promise.then(r => {
    if (!r) return t.fail()
    return api
      .gameMove(r.gameId, moveType, Math.max(0, Math.round(value)))
      .then(res => t.confirm(res.txHash))
      .catch(() => t.fail())
  })
}

export function endChainGame(score: number, multiplier: number): Promise<EndResult | null> {
  const s = session
  session = null
  if (!s) return Promise.resolve(null)
  const t = trackTx(multiplier > 0 ? `Cash out ${multiplier.toFixed(2)}x` : 'Bust')
  return s.promise.then(r => {
    if (!r) {
      t.fail()
      return null
    }
    return api
      .gameEnd(r.gameId, Math.max(0, Math.round(score)), multiplier)
      .then(res => {
        t.confirm(res.txHash)
        return res
      })
      .catch(() => {
        t.fail()
        return null
      })
  })
}
