import { useState, useCallback, useRef, useMemo } from 'react'
import { sfxTap, sfxCorrect, sfxLaser, sfxBust, sfxCashout } from '../lib/sounds'
import { addScore } from '../lib/leaderboard'
import { startChainGame, recordChainMove, endChainGame } from '../lib/chainGame'

interface LaserPartyProps {
  onBack: () => void
}

type Phase = 'setup' | 'playing' | 'cashout' | 'bust'

const GRID_OPTIONS = [
  { size: 5, label: '5x5', desc: 'Beginner' },
  { size: 6, label: '6x6', desc: 'Standard' },
  { size: 8, label: '8x8', desc: 'Expert' },
]

const HOUSE_EDGE = 0.96
const MAX_GRID_PX = 340
const GAP = 4

function LaserParty({ onBack }: LaserPartyProps) {
  const [phase, setPhase] = useState<Phase>('setup')
  const [gridSize, setGridSize] = useState(5)
  const [playerRow, setPlayerRow] = useState(-1)
  const [playerCol, setPlayerCol] = useState(-1)
  const [destroyedRows, setDestroyedRows] = useState<number[]>([])
  const [destroyedCols, setDestroyedCols] = useState<number[]>([])
  const [round, setRound] = useState(0)
  const [multiplier, setMultiplier] = useState(1)
  const [isLasing, setIsLasing] = useState(false)
  const [laserDim, setLaserDim] = useState<'row' | 'col' | null>(null)
  const [laserIndex, setLaserIndex] = useState(-1)
  const [lastSurvived, setLastSurvived] = useState(false)
  const [chainStatus, setChainStatus] = useState<'idle' | 'starting' | 'live' | 'settling' | 'settled' | 'error'>('idle')
  const [txHash, setTxHash] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const settleOnChain = useCallback((score: number, mult: number) => {
    setChainStatus('settling')
    void endChainGame(score, mult).then(r => {
      if (!r) return setChainStatus('error')
      setTxHash(r.txHash)
      setChainStatus('settled')
    })
  }, [])

  const aliveRows = useMemo(
    () => Array.from({ length: gridSize }, (_, i) => i).filter(i => !destroyedRows.includes(i)),
    [gridSize, destroyedRows],
  )
  const aliveCols = useMemo(
    () => Array.from({ length: gridSize }, (_, i) => i).filter(i => !destroyedCols.includes(i)),
    [gridSize, destroyedCols],
  )

  const cellSize = useMemo(() => {
    const maxDim = Math.max(aliveRows.length, aliveCols.length, 1)
    return Math.min(Math.floor((MAX_GRID_PX - (maxDim - 1) * GAP) / maxDim), 72)
  }, [aliveRows.length, aliveCols.length])

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setLocked(false)
    setPhase('setup')
    setPlayerRow(-1)
    setPlayerCol(-1)
    setDestroyedRows([])
    setDestroyedCols([])
    setRound(0)
    setMultiplier(1)
    setIsLasing(false)
    setLaserDim(null)
    setLaserIndex(-1)
    setLastSurvived(false)
    setChainStatus('idle')
    setTxHash(null)
  }, [])

  const fireLaser = useCallback((
    pRow: number,
    pCol: number,
    currentRound: number,
    currentGrid: number,
    dRows: number[],
    dCols: number[],
    currentMult: number,
  ) => {
    setIsLasing(true)
    setLastSurvived(false)
    sfxLaser()

    const isColRound = currentRound % 2 === 0
    const dim: 'row' | 'col' = isColRound ? 'col' : 'row'

    const alive: number[] = []
    for (let i = 0; i < currentGrid; i++) {
      if (dim === 'row' && !dRows.includes(i)) alive.push(i)
      if (dim === 'col' && !dCols.includes(i)) alive.push(i)
    }

    if (alive.length === 0) {
      settleOnChain(currentRound, currentMult)
      setPhase('cashout')
      return
    }

    const target = alive[Math.floor(Math.random() * alive.length)]
    setLaserDim(dim)
    setLaserIndex(target)

    timerRef.current = setTimeout(() => {
      const hit =
        (dim === 'row' && target === pRow) ||
        (dim === 'col' && target === pCol)

      setLaserDim(null)
      setLaserIndex(-1)
      setIsLasing(false)

      if (hit) {
        sfxBust()
        addScore('laser-party', currentMult, `${currentRound} rounds`)
        if (dim === 'row') setDestroyedRows(prev => [...prev, target])
        else setDestroyedCols(prev => [...prev, target])
        settleOnChain(currentRound, 0)
        setPhase('bust')
      } else {
        sfxCorrect()
        if (dim === 'row') setDestroyedRows(prev => [...prev, target])
        else setDestroyedCols(prev => [...prev, target])

        const remaining = alive.length
        const roundMult = 1 / (1 - 1 / remaining)
        const newMult = currentMult * roundMult * HOUSE_EDGE
        setMultiplier(newMult)
        setRound(currentRound + 1)
        setLastSurvived(true)

        const newDRows = dim === 'row' ? [...dRows, target] : dRows
        const newDCols = dim === 'col' ? [...dCols, target] : dCols
        const totalDestroyed = newDRows.length + newDCols.length
        if (totalDestroyed >= currentGrid * 2 - 2) {
          setPhase('cashout')
        }
      }
    }, 700)
  }, [])

  const [locked, setLocked] = useState(false)

  const handleCellTap = useCallback((row: number, col: number) => {
    if (isLasing || phase !== 'playing' || locked) return

    sfxTap()
    setLocked(true)
    setPlayerRow(row)
    setPlayerCol(col)
    setLastSurvived(false)

    timerRef.current = setTimeout(() => {
      fireLaser(row, col, round, gridSize, destroyedRows, destroyedCols, multiplier)
      setLocked(false)
    }, 500)
  }, [isLasing, phase, locked, destroyedRows, destroyedCols, round, gridSize, multiplier, fireLaser])

  const handleSelectSize = useCallback((size: number) => {
    setGridSize(size)
    setLocked(false)
    setPlayerRow(-1)
    setPlayerCol(-1)
    setDestroyedRows([])
    setDestroyedCols([])
    setRound(0)
    setMultiplier(1)
    setIsLasing(false)
    setLaserDim(null)
    setLaserIndex(-1)
    setLastSurvived(false)
    setChainGameId(null)
    setChainStatus('starting')
    setTxHash(null)
    setPhase('playing')
    api.gameStart('laser-party')
      .then(res => { setChainGameId(res.gameId); setChainStatus('live'); setTxHash(res.txHash) })
      .catch(() => setChainStatus('error'))
  }, [])

  if (phase === 'setup') {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center px-3 py-4">
        <div className="w-full max-w-[420px] flex flex-col gap-6">
          <header className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
            <span className="text-sm font-bold text-[#e74c3c] tracking-wide uppercase">Laser Party</span>
          </header>

          <div className="text-center animate-fade-in">
            <span className="text-4xl mb-3 block">🔫</span>
            <h2 className="text-2xl font-bold text-white mb-1">Laser Party</h2>
            <p className="text-sm text-[#6b7280]">Tap a cell. Survive the laser. Repeat.</p>
          </div>

          <div className="flex gap-3 justify-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {GRID_OPTIONS.map(opt => (
              <button
                key={opt.size}
                onClick={() => handleSelectSize(opt.size)}
                className="flex flex-col items-center gap-1 rounded-2xl border border-[#2a2a3a] bg-[#12121a] px-5 py-4 transition-all duration-150 hover:border-[#e74c3c] hover:bg-[#1a1a2e] active:scale-[0.95] flex-1"
              >
                <span className="text-xl font-mono font-bold text-white">{opt.label}</span>
                <span className="text-xs text-[#6b7280]">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'cashout') {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-3">
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-[#2a2a3a] bg-[#12121a] px-8 py-10 w-[320px] animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-[#a2e63420] flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#a2e634" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white">Cashed Out!</h2>
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm text-[#6b7280]">Survived {round} rounds</span>
            <span className="text-4xl font-mono font-bold text-[#a2e634] animate-count-up">
              {multiplier.toFixed(2)}x
            </span>
          </div>
          <div className="flex flex-col gap-2.5 w-full mt-2">
            <button onClick={reset} className="w-full py-3 rounded-xl bg-[#a2e634] text-[#0a0a0f] font-bold text-sm active:scale-[0.97]">
              Play Again
            </button>
            <button onClick={onBack} className="w-full py-3 rounded-xl border border-[#2a2a3a] text-[#6b7280] font-bold text-sm hover:text-white active:scale-[0.97]">
              Back to Games
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'bust') {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-3">
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-[#2a2a3a] bg-[#12121a] px-8 py-10 w-[320px] animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-[#e74c3c20] flex items-center justify-center animate-shake">
            <span className="text-3xl">💀</span>
          </div>
          <h2 className="text-xl font-bold text-[#e74c3c]">BUSTED!</h2>
          <span className="text-sm text-[#6b7280]">Lasered on round {round + 1}</span>
          <div className="flex flex-col gap-2.5 w-full mt-2">
            <button onClick={reset} className="w-full py-3 rounded-xl bg-[#e74c3c] text-white font-bold text-sm active:scale-[0.97]">
              Try Again
            </button>
            <button onClick={onBack} className="w-full py-3 rounded-xl border border-[#2a2a3a] text-[#6b7280] font-bold text-sm hover:text-white active:scale-[0.97]">
              Back to Games
            </button>
          </div>
        </div>
      </div>
    )
  }

  const gridW = aliveCols.length * cellSize + (aliveCols.length - 1) * GAP
  const gridH = aliveRows.length * cellSize + (aliveRows.length - 1) * GAP

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <div className="w-full max-w-[420px] mx-auto flex flex-col flex-1 px-3 py-4">
        <header className="flex items-center justify-between mb-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex flex-col items-center">
            <span className="text-xs text-[#6b7280] uppercase tracking-wide">Round {round + 1}</span>
            <span className="text-2xl font-mono font-bold text-[#a2e634]">{multiplier.toFixed(2)}x</span>
          </div>
          {round > 0 && !isLasing ? (
            <button
              onClick={() => {
                sfxCashout()
                addScore('laser-party', multiplier, `${round} rounds`)
                settleOnChain(round, multiplier)
                setPhase('cashout')
              }}
              className="px-4 py-2 rounded-xl bg-[#a2e634] text-[#0a0a0f] font-bold text-xs animate-pulse-green active:scale-[0.95]"
            >
              CASH OUT
            </button>
          ) : (
            <div className="w-[72px]" />
          )}
        </header>

        <div className="text-center mb-2">
          {playerRow < 0 && !isLasing && (
            <span className="text-sm text-[#a2e634] font-semibold animate-fade-in">TAP A CELL</span>
          )}
          {lastSurvived && !isLasing && (
            <span className="text-sm text-[#a2e634] font-semibold animate-fade-in">SURVIVED! TAP TO MOVE</span>
          )}
          {isLasing && (
            <span className="text-sm text-[#e74c3c] font-bold animate-fade-in">
              {laserDim === 'row' ? 'ROW' : 'COLUMN'} LASER FIRING...
            </span>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div
            className="relative"
            style={{
              width: gridW,
              height: gridH,
              transition: 'width 0.5s ease, height 0.5s ease',
            }}
          >
            {aliveRows.map((rowIdx, ri) =>
              aliveCols.map((colIdx, ci) => {
                const isPlayer = rowIdx === playerRow && colIdx === playerCol
                const isBeingLased =
                  laserDim !== null &&
                  ((laserDim === 'row' && laserIndex === rowIdx) ||
                    (laserDim === 'col' && laserIndex === colIdx))
                const canTap = !isLasing && phase === 'playing'

                const x = ci * (cellSize + GAP)
                const y = ri * (cellSize + GAP)

                return (
                  <button
                    key={`${rowIdx}-${colIdx}`}
                    onClick={() => canTap && handleCellTap(rowIdx, colIdx)}
                    disabled={!canTap}
                    className={`absolute rounded-lg border ${
                      canTap ? 'cursor-pointer hover:brightness-150 active:scale-90' : 'cursor-default'
                    } ${isBeingLased ? 'animate-shake' : ''}`}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      left: x,
                      top: y,
                      transition: 'left 0.5s ease, top 0.5s ease, width 0.5s ease, height 0.5s ease, background-color 0.2s, border-color 0.2s, box-shadow 0.2s',
                      backgroundColor: isBeingLased
                        ? '#e74c3c60'
                        : isPlayer
                          ? '#a2e63430'
                          : '#1a1a2e',
                      borderColor: isBeingLased
                        ? '#e74c3c'
                        : isPlayer
                          ? '#a2e634'
                          : '#2a2a3a',
                      boxShadow: isPlayer && !isBeingLased
                        ? '0 0 14px rgba(162, 230, 52, 0.4)'
                        : isBeingLased
                          ? '0 0 12px rgba(231, 76, 60, 0.4)'
                          : 'none',
                    }}
                  >
                    {isPlayer && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div
                          className="rounded-full bg-[#a2e634]"
                          style={{
                            width: cellSize * 0.35,
                            height: cellSize * 0.35,
                            transition: 'width 0.5s ease, height 0.5s ease',
                          }}
                        />
                      </div>
                    )}
                  </button>
                )
              }),
            )}

            {laserDim !== null && (() => {
              const ri = aliveRows.indexOf(laserIndex)
              const ci = aliveCols.indexOf(laserIndex)
              if (laserDim === 'row' && ri < 0) return null
              if (laserDim === 'col' && ci < 0) return null

              return (
                <div
                  style={{
                    position: 'absolute',
                    top: laserDim === 'row' ? ri * (cellSize + GAP) : 0,
                    left: laserDim === 'col' ? ci * (cellSize + GAP) : 0,
                    width: laserDim === 'row' ? gridW : cellSize,
                    height: laserDim === 'col' ? gridH : cellSize,
                    background: laserDim === 'row'
                      ? 'linear-gradient(90deg, transparent, #e74c3c, #ff6b35, #e74c3c, transparent)'
                      : 'linear-gradient(180deg, transparent, #e74c3c, #ff6b35, #e74c3c, transparent)',
                    borderRadius: 6,
                    opacity: 0.7,
                    filter: 'blur(6px)',
                    pointerEvents: 'none' as const,
                    transformOrigin: laserDim === 'row' ? 'left center' : 'center top',
                    animation: laserDim === 'row'
                      ? 'laser-h 0.7s ease-out forwards'
                      : 'laser-v 0.7s ease-out forwards',
                  }}
                />
              )
            })()}
          </div>
        </div>

        <div className="text-center mt-2 mb-2">
          <span className="text-xs text-[#6b7280]">
            {round % 2 === 0 ? 'Column' : 'Row'} laser next
          </span>
        </div>
        <div className="text-center mb-1">
          {chainStatus === 'starting' && (
            <span className="text-[10px] text-[#6b7280]">Starting on-chain...</span>
          )}
          {chainStatus === 'live' && (
            <span className="text-[10px] text-[#a2e634] flex items-center justify-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#a2e634]" />
              On-chain
            </span>
          )}
          {chainStatus === 'settling' && (
            <span className="text-[10px] text-[#6b7280]">Settling...</span>
          )}
          {chainStatus === 'settled' && txHash && (
            <a
              href={`https://testnet.monadscan.com/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-[#6b7280] hover:text-white"
            >
              Settled {txHash.slice(0, 6)}...{txHash.slice(-4)}
            </a>
          )}
          {chainStatus === 'error' && (
            <span className="text-[10px] text-[#4a4a5a]">Off-chain</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default LaserParty
