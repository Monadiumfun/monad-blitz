export type GameId = 'higher-lower' | 'laser-party' | 'death-run'

export interface Entity {
  name: string
  category: 'crypto' | 'culture' | 'geo' | 'monad' | 'sports' | 'tech' | 'food'
  metric: string
  metricLabel: string
  value: number
  emoji: string
}

export interface GameState {
  wager: number
  multiplier: number
  status: 'idle' | 'playing' | 'won' | 'lost'
}

export interface LaserStep {
  dimension: 'row' | 'col'
  index: number
}
