import { useState, useCallback, useEffect } from 'react'
import { getRandomPair, categoryLabels } from '../data/entities'
import { getEntityImage } from '../data/images'
import { sfxCorrect, sfxWrong, sfxTap, sfxBust } from '../lib/sounds'
import { addScore } from '../lib/leaderboard'
import { startChainGame, recordChainMove, endChainGame } from '../lib/chainGame'
import { api } from '../lib/api'
import type { Entity } from '../types'

interface HigherLowerProps {
  onBack: () => void
  blitzBalance: number
}

type Phase = 'playing' | 'correct' | 'wrong' | 'gameover'

const categoryColors: Record<string, string> = {
  crypto: '#a2e634',
  culture: '#836FFF',
  geo: '#00d4ff',
  monad: '#836FFF',
  sports: '#ff6b35',
  tech: '#00d4ff',
  food: '#ffb347',
}

function HigherLower({ onBack }: HigherLowerProps) {
  const [leftCard, setLeftCard] = useState<Entity>(() => getRandomPair(true)[0])
  const [rightCard, setRightCard] = useState<Entity>(() => getRandomPair(true)[1])
  const [streak, setStreak] = useState(0)
  const [phase, setPhase] = useState<Phase>('playing')
  const [picked, setPicked] = useState<'left' | 'right' | null>(null)
  const [animKey, setAnimKey] = useState(0)
  const [votePercent, setVotePercent] = useState<number | null>(null)

  useEffect(() => {
    startChainGame('higher-lower')
  }, [])

  useEffect(() => {
    api.getVotes([leftCard.name, rightCard.name])
      .then(r => {
        const lv = r.votes[leftCard.name] || 0
        const rv = r.votes[rightCard.name] || 0
        if (lv + rv > 0) {
          setVotePercent(Math.round((Math.max(lv, rv) / (lv + rv)) * 100))
        } else {
          setVotePercent(null)
        }
      })
      .catch(() => setVotePercent(null))
  }, [leftCard.name, rightCard.name])

  const initCards = useCallback(() => {
    const [a, b] = getRandomPair(true)
    setLeftCard(a)
    setRightCard(b)
  }, [])

  const handlePick = useCallback((side: 'left' | 'right') => {
    if (phase !== 'playing') return

    const pickedEntity = side === 'left' ? leftCard : rightCard
    const otherEntity = side === 'left' ? rightCard : leftCard

    setPicked(side)
    sfxTap()

    api.vote(pickedEntity.name)
    recordChainMove(0, streak + 1)

    api.getVotes([pickedEntity.name, otherEntity.name])
      .then(r => {
        const pv = r.votes[pickedEntity.name] || 0
        const ov = r.votes[otherEntity.name] || 0
        const correct = pv >= ov

        if (correct) {
          sfxCorrect()
          setPhase('correct')
          setStreak(s => s + 1)
          if (pv + ov > 0) setVotePercent(Math.round((pv / (pv + ov)) * 100))
          setTimeout(() => {
            const [, next] = getRandomPair(true)
            setLeftCard(side === 'left' ? leftCard : rightCard)
            setRightCard(next)
            setPhase('playing')
            setPicked(null)
            setVotePercent(null)
            setAnimKey(k => k + 1)
          }, 1000)
        } else {
          sfxWrong()
          if (pv + ov > 0) setVotePercent(Math.round((ov / (pv + ov)) * 100))
          setPhase('wrong')
          setTimeout(() => {
            sfxBust()
            addScore('higher-lower', streak, `${streak} streak`)
            endChainGame(streak, streak)
            setPhase('gameover')
          }, 1200)
        }
      })
      .catch(() => {
        const correct = pickedEntity.value >= otherEntity.value
        if (correct) {
          sfxCorrect()
          setPhase('correct')
          setStreak(s => s + 1)
          setTimeout(() => {
            const [, next] = getRandomPair(true)
            setLeftCard(side === 'left' ? leftCard : rightCard)
            setRightCard(next)
            setPhase('playing')
            setPicked(null)
            setVotePercent(null)
            setAnimKey(k => k + 1)
          }, 1000)
        } else {
          sfxWrong()
          setPhase('wrong')
          setTimeout(() => {
            sfxBust()
            addScore('higher-lower', streak, `${streak} streak`)
            endChainGame(streak, streak)
            setPhase('gameover')
          }, 1200)
        }
      })
  }, [phase, leftCard, rightCard, streak])

  const handlePlayAgain = useCallback(() => {
    startChainGame('higher-lower')
    initCards()
    setStreak(0)
    setPhase('playing')
    setPicked(null)
    setVotePercent(null)
    setAnimKey(k => k + 1)
  }, [initCards])

  const renderCard = (entity: Entity, side: 'left' | 'right') => {
    const isPicked = picked === side
    const isCorrect = isPicked && phase === 'correct'
    const isWrong = isPicked && phase === 'wrong'
    const catColor = categoryColors[entity.category] || '#6b7280'
    const canTap = phase === 'playing'

    return (
      <button
        key={`${side}-${animKey}`}
        onClick={() => canTap && handlePick(side)}
        disabled={!canTap}
        className={`flex-1 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-5 min-h-[220px] transition-all duration-200 ${
          canTap ? 'cursor-pointer active:scale-[0.96] hover:border-[#6b7280]' : 'cursor-default'
        } ${isWrong ? 'animate-shake' : ''} ${side === 'right' ? 'animate-slide-right' : ''}`}
        style={{
          backgroundColor: isCorrect ? '#a2e63415' : isWrong ? '#e74c3c15' : '#12121a',
          borderColor: isCorrect ? '#a2e634' : isWrong ? '#e74c3c' : '#2a2a3a',
          boxShadow: isCorrect
            ? '0 0 30px rgba(162, 230, 52, 0.15)'
            : isWrong ? '0 0 30px rgba(231, 76, 60, 0.15)' : 'none',
        }}
      >
        {(() => {
          const img = getEntityImage(entity.name, entity.category)
          return img ? (
            <img src={img} alt={entity.name} className="w-16 h-16 rounded-xl object-cover" loading="lazy" />
          ) : (
            <span className="text-5xl leading-none">{entity.emoji}</span>
          )
        })()}
        <span className="text-base font-bold text-white text-center leading-tight">{entity.name}</span>
        <span
          className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
          style={{ backgroundColor: `${catColor}15`, color: catColor }}
        >
          {categoryLabels[entity.category] || entity.category}
        </span>
      </button>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <div className="w-full max-w-[420px] mx-auto flex flex-col flex-1 px-3 py-4">
        <header className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-[#6b7280] uppercase tracking-wide">Streak</span>
            <span className="text-xl font-bold text-[#a2e634]">{streak}</span>
          </div>
          <div className="w-[24px]" />
        </header>

        <div className="text-center mb-3">
          <span className="text-xs text-[#6b7280]">Tap the more popular one</span>
        </div>

        <div className="flex gap-3 flex-1 items-stretch mb-4">
          {renderCard(leftCard, 'left')}
          {renderCard(rightCard, 'right')}
        </div>

        {(phase === 'correct' || phase === 'wrong') && (
          <div className={`text-center mb-3 py-3 rounded-2xl font-bold text-base animate-fade-in ${
            phase === 'correct' ? 'bg-[#a2e63420] text-[#a2e634]' : 'bg-[#e74c3c20] text-[#e74c3c]'
          }`}>
            {phase === 'correct' ? 'CORRECT!' : 'WRONG!'}
            {votePercent !== null && (
              <span className="block text-xs font-normal mt-1 opacity-70">
                {votePercent}% of players agree
              </span>
            )}
          </div>
        )}

        {phase === 'gameover' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 animate-fade-in">
            <div className="flex flex-col items-center gap-5 rounded-2xl border border-[#2a2a3a] bg-[#12121a] px-8 py-10 w-[320px]">
              <span className="text-4xl">💀</span>
              <h2 className="text-xl font-bold text-white">Game Over</h2>
              <div className="flex flex-col items-center gap-1">
                <span className="text-sm text-[#6b7280]">Best Streak</span>
                <span className="text-4xl font-bold text-[#a2e634] animate-count-up">{streak}</span>
              </div>
              <div className="flex flex-col gap-2.5 w-full mt-2">
                <button
                  onClick={handlePlayAgain}
                  className="w-full py-3.5 rounded-xl bg-[#a2e634] text-[#0a0a0f] font-bold text-sm active:scale-[0.97]"
                >
                  Play Again
                </button>
                <button
                  onClick={onBack}
                  className="w-full py-3.5 rounded-xl border border-[#2a2a3a] text-[#6b7280] font-bold text-sm hover:text-white active:scale-[0.97]"
                >
                  Back to Hub
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HigherLower
