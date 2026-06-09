import { useState, useCallback } from 'react'
import { getRandomPair, getNextEntity, comparisonLabel, categoryLabels } from '../data/entities'
import { getEntityImage } from '../data/images'
import { sfxCorrect, sfxWrong, sfxTap, sfxBust, sfxCashout } from '../lib/sounds'
import { addScore } from '../lib/leaderboard'
import { startChainGame, recordChainMove, endChainGame } from '../lib/chainGame'
import BetSelector from '../components/BetSelector'
import SharePnL from '../components/SharePnL'
import { WAGER_DEFAULT, WAGER_MIN, clampWager, maxAffordable } from '../lib/wager'
import type { Entity } from '../types'

type ChainStatus = 'idle' | 'starting' | 'live' | 'settling' | 'settled' | 'error'

interface HigherLowerProps {
  onBack: () => void
  blitzBalance: number
}

type Phase = 'setup' | 'playing' | 'correct' | 'wrong' | 'result'

const BATCH_SIZE = 5
const MULTIPLIER_BY_CORRECT = [0, 0.2, 0.5, 1.0, 1.8, 3.0]

const categoryColors: Record<string, string> = {
  crypto: '#6E54FF',
  culture: '#836FFF',
  geo: '#00d4ff',
  monad: '#836FFF',
  sports: '#ff6b35',
  tech: '#00d4ff',
  food: '#ffb347',
  spicy: '#ff2d55',
}

const LOGO_CATEGORIES = new Set(['crypto', 'monad', 'tech', 'food', 'geo'])

function CardImage({ entity }: { entity: Entity }) {
  const [failed, setFailed] = useState(false)
  const img = entity.image ?? getEntityImage(entity.name, entity.category)
  if (!img || failed) return <span className="text-7xl leading-none">{entity.emoji}</span>
  const isLogo = LOGO_CATEGORIES.has(entity.category) || entity.metric === 'club_instagram'
  if (isLogo) {
    return (
      <span className="w-32 h-32 rounded-xl bg-white flex items-center justify-center p-3">
        <img
          src={img}
          alt={entity.name}
          className="max-w-full max-h-full object-contain"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      </span>
    )
  }
  return (
    <img
      src={img}
      alt={entity.name}
      className="w-32 h-32 rounded-xl object-cover"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

function HigherLower({ onBack, blitzBalance }: HigherLowerProps) {
  const [initialPair] = useState<[Entity, Entity]>(() => getRandomPair())
  const [leftCard, setLeftCard] = useState<Entity>(initialPair[0])
  const [rightCard, setRightCard] = useState<Entity>(initialPair[1])
  const [phase, setPhase] = useState<Phase>('setup')
  const [wager, setWager] = useState(() => clampWager(WAGER_DEFAULT, blitzBalance))
  const [round, setRound] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [picked, setPicked] = useState<'left' | 'right' | null>(null)
  const [animKey, setAnimKey] = useState(0)
  const [chainStatus, setChainStatus] = useState<ChainStatus>('idle')
  const [txHash, setTxHash] = useState<string | null>(null)

  const beginBatch = useCallback(() => {
    const [a, b] = getRandomPair()
    setLeftCard(a)
    setRightCard(b)
    setRound(0)
    setCorrectCount(0)
    setPicked(null)
    setAnimKey(k => k + 1)
    setTxHash(null)
    setChainStatus('starting')
    setPhase('playing')
    void startChainGame('higher-lower', wager).then(r => {
      if (!r) return setChainStatus('error')
      setChainStatus('live')
      setTxHash(r.txHash)
    })
  }, [wager])

  const finishBatch = useCallback((finalCorrect: number) => {
    const multiplier = MULTIPLIER_BY_CORRECT[finalCorrect] ?? 0
    if (multiplier >= 1) sfxCashout()
    else sfxBust()
    addScore('higher-lower', finalCorrect, `${finalCorrect}/${BATCH_SIZE}`)
    setChainStatus('settling')
    void endChainGame(finalCorrect, multiplier).then(r => {
      if (!r) return setChainStatus('error')
      setTxHash(r.txHash)
      setChainStatus('settled')
    })
    setPhase('result')
  }, [])

  const handlePick = useCallback((side: 'left' | 'right') => {
    if (phase !== 'playing') return

    const pickedEntity = side === 'left' ? leftCard : rightCard
    const otherEntity = side === 'left' ? rightCard : leftCard
    const correct = pickedEntity.value >= otherEntity.value

    setPicked(side)
    sfxTap()
    recordChainMove(correct ? 0 : 1, round + 1)

    const newCorrect = correct ? correctCount + 1 : correctCount
    const nextRound = round + 1

    if (correct) {
      sfxCorrect()
      setPhase('correct')
    } else {
      sfxWrong()
      setPhase('wrong')
    }
    setCorrectCount(newCorrect)

    setTimeout(() => {
      if (nextRound >= BATCH_SIZE) {
        finishBatch(newCorrect)
        return
      }
      const kept = side === 'left' ? leftCard : rightCard
      setLeftCard(kept)
      setRightCard(getNextEntity(kept))
      setRound(nextRound)
      setPhase('playing')
      setPicked(null)
      setAnimKey(k => k + 1)
    }, 900)
  }, [phase, leftCard, rightCard, round, correctCount, finishBatch])

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
          backgroundColor: isCorrect
            ? '#6E54FF15'
            : isWrong
              ? '#e74c3c15'
              : '#12121a',
          borderColor: isCorrect
            ? '#6E54FF'
            : isWrong
              ? '#e74c3c'
              : '#2a2a3a',
          boxShadow: isCorrect
            ? '0 0 30px rgba(110, 84, 255, 0.15)'
            : isWrong
              ? '0 0 30px rgba(231, 76, 60, 0.15)'
              : 'none',
        }}
      >
        <CardImage key={`${entity.name}-${entity.metric}`} entity={entity} />
        <span className="text-base font-bold text-white text-center leading-tight">{entity.name}</span>
        <span
          className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
          style={{
            backgroundColor: `${catColor}15`,
            color: catColor,
          }}
        >
          {categoryLabels[entity.category] || entity.category}
        </span>
      </button>
    )
  }

  if (phase === 'setup') {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center px-3 py-4">
        <div className="w-full max-w-[420px] flex flex-col gap-6 animate-fade-in">
          <header className="flex items-center">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
          </header>

          <div className="text-center">
            <span className="text-4xl mb-3 block">🔥</span>
            <h1 className="text-2xl font-bold text-white">Higher Lower</h1>
            <p className="text-sm text-[#6b7280] mt-1">
              {BATCH_SIZE} picks per bet. 3+ correct to profit.
            </p>
          </div>

          <BetSelector balance={blitzBalance} value={wager} onChange={setWager} />

          <div className="rounded-2xl border border-[#2a2a3a] bg-[#12121a] p-4">
            <div className="flex justify-between text-[10px] uppercase tracking-wider text-[#6b7280] mb-2">
              <span>Correct</span>
              <span>Multiplier</span>
            </div>
            <div className="flex flex-col gap-1">
              {MULTIPLIER_BY_CORRECT.map((m, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-white">{i}/{BATCH_SIZE}</span>
                  <span className={m >= 1 ? 'text-[#6E54FF] font-mono font-bold' : 'text-[#e74c3c] font-mono'}>
                    {m.toFixed(2)}x
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={beginBatch}
            disabled={maxAffordable(blitzBalance) < WAGER_MIN}
            className="w-full py-3.5 rounded-xl bg-[#6E54FF] text-white font-bold text-sm active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Bet {wager} & Play
          </button>
        </div>
      </div>
    )
  }

  const finalMultiplier = MULTIPLIER_BY_CORRECT[correctCount] ?? 0
  const won = finalMultiplier >= 1

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
            <span className="text-[10px] text-[#6b7280] uppercase tracking-wide">
              Pick {Math.min(round + 1, BATCH_SIZE)}/{BATCH_SIZE}
            </span>
            <span className="text-xl font-bold text-[#6E54FF]">{correctCount} correct</span>
          </div>
          <div className="w-[24px]" />
        </header>

        <div className="text-center mb-3">
          <span className="text-xs text-[#6b7280]">Tap the higher</span>
          <div className="text-sm font-bold text-white mt-0.5">{comparisonLabel(leftCard)}</div>
        </div>

        <div className="flex gap-3 flex-1 items-stretch mb-4">
          {renderCard(leftCard, 'left')}
          {renderCard(rightCard, 'right')}
        </div>

        {(phase === 'correct' || phase === 'wrong') && (
          <div className={`text-center mb-3 py-3 rounded-2xl font-bold text-base animate-fade-in ${
            phase === 'correct' ? 'bg-[#6E54FF20] text-[#6E54FF]' : 'bg-[#e74c3c20] text-[#e74c3c]'
          }`}>
            {phase === 'correct' ? 'CORRECT!' : 'WRONG!'}
          </div>
        )}

        <div className="text-[10px] text-center pb-2 min-h-[16px]">
          {chainStatus === 'starting' && <span className="text-[#6b7280]">Starting on-chain...</span>}
          {chainStatus === 'live' && (
            <span className="text-[#22c55e] flex items-center justify-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              On-chain
            </span>
          )}
          {chainStatus === 'settling' && <span className="text-[#6b7280]">Settling...</span>}
          {chainStatus === 'settled' && txHash && (
            <span className="text-[#6b7280]">
              Settled{' '}
              <a
                href={`https://testnet.monadscan.com/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#6b7280] hover:text-white"
              >
                {txHash.slice(0, 6)}...{txHash.slice(-4)}
              </a>
            </span>
          )}
          {chainStatus === 'error' && <span className="text-[#4b5563]">Off-chain</span>}
        </div>

        {phase === 'result' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 animate-fade-in">
            <div className="flex flex-col items-center gap-5 rounded-2xl border border-[#2a2a3a] bg-[#12121a] px-8 py-10 w-[320px]">
              <span className="text-4xl">{won ? '🎉' : '💀'}</span>
              <h2 className={`text-xl font-bold ${won ? 'text-[#6E54FF]' : 'text-[#e74c3c]'}`}>
                {won ? 'You Win!' : 'Busted'}
              </h2>
              <div className="flex flex-col items-center gap-1">
                <span className="text-sm text-[#6b7280]">{correctCount}/{BATCH_SIZE} correct</span>
                <span className={`text-4xl font-mono font-bold animate-count-up ${won ? 'text-[#6E54FF]' : 'text-[#e74c3c]'}`}>
                  {finalMultiplier.toFixed(2)}x
                </span>
              </div>
              <div className="flex flex-col gap-2.5 w-full mt-2">
                {won && <SharePnL game="Higher or Lower" emoji="⚡" multiplier={finalMultiplier} wager={wager} />}
                <button
                  onClick={() => setPhase('setup')}
                  className="w-full py-3.5 rounded-xl bg-[#6E54FF] text-white font-bold text-sm active:scale-[0.97]"
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
