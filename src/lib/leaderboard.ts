import type { GameId } from '../types'

export interface ScoreEntry {
  game: GameId
  score: number
  label: string
  timestamp: number
}

const STORAGE_KEY = 'blitz_leaderboard'
const MAX_ENTRIES = 50

function load(): ScoreEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function save(entries: ScoreEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)))
}

export function addScore(game: GameId, score: number, label: string) {
  const entries = load()
  entries.push({ game, score, label, timestamp: Date.now() })
  entries.sort((a, b) => b.score - a.score)
  save(entries)
}

export function getScores(game?: GameId): ScoreEntry[] {
  const entries = load()
  if (game) return entries.filter(e => e.game === game)
  return entries
}

export function getTopScores(game: GameId, limit = 10): ScoreEntry[] {
  return getScores(game).slice(0, limit)
}

export function getBestScore(game: GameId): number {
  const scores = getScores(game)
  return scores.length > 0 ? scores[0].score : 0
}
