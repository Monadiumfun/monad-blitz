import { useState, useMemo } from 'react'
import { getScores } from '../lib/leaderboard'
import type { GameId } from '../types'
import type { ScoreEntry } from '../lib/leaderboard'

interface LeaderboardProps {
  onBack: () => void
}

const TABS: { id: GameId | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'higher-lower', label: 'Guess' },
  { id: 'laser-party', label: 'Laser' },
  { id: 'death-run', label: 'Death' },
]

const gameLabels: Record<GameId, string> = {
  'higher-lower': 'Guess',
  'laser-party': 'Laser',
  'death-run': 'Death',
}

const gameColors: Record<GameId, string> = {
  'higher-lower': '#836FFF',
  'laser-party': '#e74c3c',
  'death-run': '#ffb347',
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'now'
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h`
  return `${Math.floor(hrs / 24)}d`
}

function Leaderboard({ onBack }: LeaderboardProps) {
  const [tab, setTab] = useState<GameId | 'all'>('all')

  const scores = useMemo(() => {
    const all = getScores(tab === 'all' ? undefined : tab)
    return all.slice(0, 20)
  }, [tab])

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <div className="w-full max-w-[420px] mx-auto flex flex-col flex-1 px-3 py-4">
        <header className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-lg font-bold text-white">Leaderboard</h1>
          <div className="w-[24px]" />
        </header>

        <div className="flex gap-1 mb-4 bg-[#12121a] rounded-xl p-1">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                tab === t.id
                  ? 'bg-[#a2e634] text-[#0a0a0f]'
                  : 'text-[#6b7280] hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {scores.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <span className="text-sm text-[#6b7280]">No scores yet. Go play!</span>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            {scores.map((entry: ScoreEntry, i: number) => (
              <div
                key={`${entry.timestamp}-${i}`}
                className="flex items-center gap-3 rounded-xl bg-[#12121a] border border-[#2a2a3a] px-4 py-3 animate-fade-in"
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <span className={`w-6 text-center font-bold text-sm ${
                  i === 0 ? 'text-[#a2e634]' : i === 1 ? 'text-[#c0c0c0]' : i === 2 ? 'text-[#cd7f32]' : 'text-[#6b7280]'
                }`}>
                  {i + 1}
                </span>
                <div className="flex-1 flex items-center gap-2">
                  {tab === 'all' && (
                    <span
                      className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${gameColors[entry.game]}20`,
                        color: gameColors[entry.game],
                      }}
                    >
                      {gameLabels[entry.game]}
                    </span>
                  )}
                  <span className="text-xs text-[#6b7280]">{entry.label}</span>
                </div>
                <span className="font-mono font-bold text-white text-sm">{entry.score.toFixed(2)}</span>
                <span className="text-[10px] text-[#6b7280] w-8 text-right">{timeAgo(entry.timestamp)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard
