import { useState, useCallback, useRef, useMemo, useEffect } from 'react'
import { sfxTap, sfxCorrect, sfxLaser, sfxBust, sfxCashout } from '../lib/sounds'
import { addScore } from '../lib/leaderboard'
import { startChainGame, endChainGame, fetchOutcome } from '../lib/chainGame'
import BetSelector from '../components/BetSelector'
import SharePnL from '../components/SharePnL'
import BlitzLogo from '../components/BlitzLogo'
import { WAGER_DEFAULT, WAGER_MIN, clampWager, maxAffordable } from '../lib/wager'

interface LaserPartyProps {
  onBack: () => void
  blitzBalance: number
}

type Phase = 'setup' | 'playing' | 'cashout' | 'bust'

const GRID_OPTIONS = [
  { size: 5, label: '5x5', desc: 'Beginner' },
  { size: 6, label: '6x6', desc: 'Standard' },
  { size: 8, label: '8x8', desc: 'Expert' },
]

const HOUSE_EDGE = 0.96
const GRID_CAP_PX = 340
const GAP = 4
const TAP_LOCK_MS = 180
const LASER_MS = 350

// Largest grid that fits the current viewport (mini-app window) minus padding.
function fitGridPx(): number {
  const w = typeof window !== 'undefined' ? window.innerWidth : 360
  return Math.min(GRID_CAP_PX, w - 28)
}

// Cumulative multiplier after each survived round, for the top progress track.
function laserLadder(gridSize: number): number[] {
  const ladder = [1]
  let mult = 1
  let dRows = 0
  let dCols = 0
  for (let r = 0; r < gridSize * 2 - 2; r++) {
    const isCol = r % 2 === 0
    const alive = isCol ? gridSize - dCols : gridSize - dRows
    if (alive <= 1) break
    mult *= (1 / (1 - 1 / alive)) * HOUSE_EDGE
    if (isCol) dCols++; else dRows++
    ladder.push(mult)
  }
  return ladder
}

function LaserParty({ onBack, blitzBalance }: LaserPartyProps) {
  const [maxGridPx, setMaxGridPx] = useState(fitGridPx)
  useEffect(() => {
    const onResize = () => setMaxGridPx(fitGridPx())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  const [phase, setPhase] = useState<Phase>('setup')
  const [wager, setWager] = useState(() => clampWager(WAGER_DEFAULT, blitzBalance))
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
  const [locked, setLocked] = useState(false)
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
    return Math.min(Math.floor((maxGridPx - (maxDim - 1) * GAP) / maxDim), 72)
  }, [aliveRows.length, aliveCols.length, maxGridPx])

  const ladder = useMemo(() => laserLadder(gridSize), [gridSize])

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

    // The laser target is derived server-side from the committed seeds
    // (provably fair); local random is only a degraded offline fallback.
    void fetchOutcome(currentRound, { row: pRow, col: pCol }).then(o => {
      const target = o?.target ?? alive[Math.floor(Math.random() * alive.length)]
      const hit = o
        ? o.hit
        : (dim === 'row' && target === pRow) || (dim === 'col' && target === pCol)

      setLaserDim(dim)
      setLaserIndex(target)

      timerRef.current = setTimeout(() => {
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
          const newMult = o ? o.multiplier : currentMult * roundMult * HOUSE_EDGE
          setMultiplier(newMult)
          setRound(currentRound + 1)
          setLastSurvived(true)

          const newDRows = dim === 'row' ? [...dRows, target] : dRows
          const newDCols = dim === 'col' ? [...dCols, target] : dCols
          const totalDestroyed = newDRows.length + newDCols.length
          if (totalDestroyed >= currentGrid * 2 - 2) {
            settleOnChain(currentRound + 1, newMult)
            setPhase('cashout')
          }
        }
      }, LASER_MS)
    })
  }, [settleOnChain])

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
    }, TAP_LOCK_MS)
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
    setChainStatus('starting')
    setTxHash(null)
    setPhase('playing')
    void startChainGame('laser-party', wager, { grid: size }).then(r => {
      if (!r) return setChainStatus('error')
      setChainStatus('live')
      setTxHash(r.txHash)
    })
  }, [wager])

  if (phase === 'setup') {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center px-3 py-4">
        <div className="w-full max-w-[420px] flex flex-col gap-6">
          <header className="flex items-center justify-center">
            <span className="text-sm font-bold text-[#e74c3c] tracking-wide uppercase">Laser Party</span>
          </header>

          <div className="text-center animate-fade-in">
            <span className="text-4xl mb-3 block">🔫</span>
            <h2 className="text-2xl font-bold text-white mb-1">Laser Party</h2>
            <p className="text-sm text-[#6b7280]">Tap a cell. Survive the laser. Repeat.</p>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <BetSelector balance={blitzBalance} value={wager} onChange={setWager} />
          </div>

          <div className="flex gap-3 justify-center animate-fade-in" style={{ animationDelay: '0.15s' }}>
            {GRID_OPTIONS.map(opt => (
              <button
                key={opt.size}
                onClick={() => handleSelectSize(opt.size)}
                disabled={maxAffordable(blitzBalance) < WAGER_MIN}
                className="flex flex-col items-center gap-1 rounded-2xl border border-[#2a2a3a] bg-[#12121a] px-5 py-4 transition-all duration-150 hover:border-[#e74c3c] hover:bg-[#1a1a2e] active:scale-[0.95] flex-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#2a2a3a]"
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
          <div className="w-16 h-16 rounded-full bg-[#6E54FF20] flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#6E54FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white">Cashed Out!</h2>
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm text-[#6b7280]">Survived {round} rounds</span>
            <span className="text-4xl font-mono font-bold text-[#6E54FF] animate-count-up">
              {multiplier.toFixed(2)}x
            </span>
          </div>
          <div className="flex flex-col gap-2.5 w-full mt-2">
            <SharePnL game="Laser Party" emoji="🔫" multiplier={multiplier} wager={wager} />
            <button onClick={reset} className="w-full py-3 rounded-xl bg-[#6E54FF] text-white font-bold text-sm active:scale-[0.97]">
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

  const gridCells = aliveRows.map((rowIdx, ri) =>
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
          // handleCellTap is an event handler; the compiler's ref check misreads its timerRef write as render-time access
          // eslint-disable-next-line react-hooks/refs
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
                ? '#6E54FF30'
                : '#160606',
            borderColor: isBeingLased
              ? '#ff5b4d'
              : isPlayer
                ? '#6E54FF'
                : '#e0564e',
            boxShadow: isPlayer && !isBeingLased
              ? '0 0 14px rgba(110, 84, 255, 0.4)'
              : isBeingLased
                ? '0 0 12px rgba(231, 76, 60, 0.4)'
                : 'none',
          }}
        >
          {isPlayer && (
            <div className="w-full h-full flex items-center justify-center">
              <BlitzLogo
                className="text-[#6E54FF]"
                style={{
                  height: cellSize * 0.58,
                  width: 'auto',
                  transition: 'height 0.5s ease',
                  filter: 'drop-shadow(0 0 6px rgba(110, 84, 255, 0.7))',
                }}
              />
            </div>
          )}
        </button>
      )
    }),
  )

  const laserRi = aliveRows.indexOf(laserIndex)
  const laserCi = aliveCols.indexOf(laserIndex)
  const showLaser =
    laserDim !== null &&
    !(laserDim === 'row' && laserRi < 0) &&
    !(laserDim === 'col' && laserCi < 0)
  const laserBeam = showLaser ? (
    <div
      style={{
        position: 'absolute',
        top: laserDim === 'row' ? laserRi * (cellSize + GAP) : 0,
        left: laserDim === 'col' ? laserCi * (cellSize + GAP) : 0,
        width: laserDim === 'row' ? gridW : cellSize,
        height: laserDim === 'col' ? gridH : cellSize,
        background: laserDim === 'row'
          ? 'linear-gradient(90deg, transparent, #e74c3c, #ff6b35, #e74c3c, transparent)'
          : 'linear-gradient(180deg, transparent, #e74c3c, #ff6b35, #e74c3c, transparent)',
        borderRadius: 6,
        opacity: 0.7,
        filter: 'blur(6px)',
        pointerEvents: 'none',
        transformOrigin: laserDim === 'row' ? 'left center' : 'center top',
        animation: laserDim === 'row'
          ? `laser-h ${LASER_MS}ms ease-out forwards`
          : `laser-v ${LASER_MS}ms ease-out forwards`,
      }}
    />
  ) : null

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <div className="w-full max-w-[420px] mx-auto flex flex-col flex-1 px-3 py-4">
        <header className="flex items-center justify-between mb-2">
          <div className="w-[60px]" />
          <div className="flex flex-col items-center">
            <span className="text-xs text-[#6b7280] uppercase tracking-wide">Round {round + 1}</span>
            <span className="text-2xl font-mono font-bold text-[#6E54FF]">{multiplier.toFixed(2)}x</span>
          </div>
          {round > 0 && !isLasing ? (
            <button
              onClick={() => {
                sfxCashout()
                addScore('laser-party', multiplier, `${round} rounds`)
                settleOnChain(round, multiplier)
                setPhase('cashout')
              }}
              className="px-4 py-2 rounded-xl bg-[#6E54FF] text-white font-bold text-xs animate-pulse-green active:scale-[0.95]"
            >
              CASH OUT
            </button>
          ) : (
            <div className="w-[72px]" />
          )}
        </header>

        {/* multiplier progress track */}
        <div className="mb-3 px-1">
          <div className="relative h-3 mb-1">
            {ladder.map((m, i) => {
              if (ladder.length > 1 && i !== 0 && i !== ladder.length - 1 && i % Math.ceil(ladder.length / 5) !== 0) return null
              return (
                <span
                  key={i}
                  className="absolute -translate-x-1/2 text-[9px] font-mono text-[#8898a8] whitespace-nowrap"
                  style={{ left: `${ladder.length > 1 ? (i / (ladder.length - 1)) * 100 : 0}%` }}
                >
                  {m < 10 ? m.toFixed(2) : m.toFixed(1)}x
                </span>
              )
            })}
          </div>
          <div className="relative h-2 flex items-center">
            <div className="absolute inset-x-0 h-[3px] rounded-full bg-[#2a1414]" />
            <div
              className="absolute left-0 h-[3px] rounded-full bg-[#6E54FF] transition-[width] duration-300"
              style={{ width: `${ladder.length > 1 ? (Math.min(round, ladder.length - 1) / (ladder.length - 1)) * 100 : 0}%` }}
            />
            {ladder.map((_, i) => (
              <div
                key={i}
                className={`absolute w-[2px] h-2 -translate-x-1/2 rounded ${i <= round ? 'bg-[#6E54FF]' : 'bg-[#3a2222]'}`}
                style={{ left: `${ladder.length > 1 ? (i / (ladder.length - 1)) * 100 : 0}%` }}
              />
            ))}
          </div>
        </div>

        <div className="text-center mb-2">
          {playerRow < 0 && !isLasing && (
            <span className="text-sm text-[#6E54FF] font-semibold animate-fade-in">TAP A CELL</span>
          )}
          {lastSurvived && !isLasing && (
            <span className="text-sm text-[#6E54FF] font-semibold animate-fade-in">SURVIVED! TAP TO MOVE</span>
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
            {gridCells}
            {laserBeam}
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
            <span className="text-[10px] text-[#6E54FF] flex items-center justify-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#6E54FF]" />
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
