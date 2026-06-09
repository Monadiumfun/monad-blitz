import { useState, useCallback, useRef, useEffect } from 'react'
import { sfxTap, sfxCorrect, sfxBust, sfxCashout, sfxSuspense } from '../lib/sounds'
import { addScore } from '../lib/leaderboard'
import { startChainGame, endChainGame, fetchOutcome } from '../lib/chainGame'
import BetSelector from '../components/BetSelector'
import SharePnL from '../components/SharePnL'
import { WAGER_DEFAULT, WAGER_MIN, clampWager, maxAffordable } from '../lib/wager'

interface DeathRunProps {
  onBack: () => void
  blitzBalance: number
}

type GameState = 'setup' | 'playing' | 'suspense' | 'cashout' | 'bust' | 'won'
type ChainStatus = 'idle' | 'starting' | 'live' | 'settling' | 'settled' | 'error'

// Each row has a fixed number of tiles (one mine). Fewer tiles = higher risk =
// higher multiplier. rowId is the index into ROW_TILES; the play order is
// shuffleable (each row's mine is keyed on its id, so it stays provably fair).
const ROW_TILES = [7, 6, 5, 4, 3, 2]
const HOUSE_EDGE = 0.96
const SUSPENSE_MS = 300

const rowMult = (tiles: number) => (1 / (1 - 1 / tiles)) * HOUSE_EDGE

function shuffled<T>(arr: T[]): T[] {
  const r = [...arr]
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[r[i], r[j]] = [r[j], r[i]]
  }
  return r
}

function DeathRun({ onBack, blitzBalance }: DeathRunProps) {
  const [gameState, setGameState] = useState<GameState>('setup')
  const [wager, setWager] = useState(() => clampWager(WAGER_DEFAULT, blitzBalance))
  const [order, setOrder] = useState<number[]>(() => shuffled(ROW_TILES.map((_, i) => i)))
  const [playedCount, setPlayedCount] = useState(0)
  const [picks, setPicks] = useState<Record<number, number>>({})
  const [mines, setMines] = useState<Record<number, number>>({})
  const [bustRowId, setBustRowId] = useState<number | null>(null)
  const [suspense, setSuspense] = useState<{ rowId: number; tile: number } | null>(null)
  const [chainStatus, setChainStatus] = useState<ChainStatus>('idle')
  const [txHash, setTxHash] = useState<string | null>(null)
  const currentRowRef = useRef<HTMLDivElement | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const mult = order.slice(0, playedCount).reduce((m, rid) => m * rowMult(ROW_TILES[rid]), 1)

  const fireStart = useCallback(() => {
    setChainStatus('starting')
    setTxHash(null)
    void startChainGame('death-run', wager, { tilesSeq: ROW_TILES }).then(r => {
      if (!r) return setChainStatus('error')
      setChainStatus('live')
      setTxHash(r.txHash)
    })
  }, [wager])

  const settle = useCallback((score: number, m: number) => {
    setChainStatus('settling')
    void endChainGame(score, m).then(r => {
      if (!r) return setChainStatus('error')
      setTxHash(r.txHash)
      setChainStatus('settled')
    })
  }, [])

  const begin = useCallback(() => {
    fireStart()
    setOrder(shuffled(ROW_TILES.map((_, i) => i)))
    setPlayedCount(0)
    setPicks({})
    setMines({})
    setBustRowId(null)
    setSuspense(null)
    setGameState('playing')
  }, [fireStart])

  useEffect(() => {
    if ((gameState === 'playing' || gameState === 'suspense') && currentRowRef.current) {
      currentRowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [playedCount, gameState])

  // Reorder only the un-played rows — e.g. when the next row is a scary 2-tile.
  const reshuffle = useCallback(() => {
    if (gameState !== 'playing') return
    sfxTap()
    setOrder(prev => [...prev.slice(0, playedCount), ...shuffled(prev.slice(playedCount))])
  }, [gameState, playedCount])

  const pickTile = useCallback((rowId: number, tile: number) => {
    if (gameState !== 'playing' || order[playedCount] !== rowId) return
    sfxTap()
    sfxSuspense()
    setSuspense({ rowId, tile })
    setGameState('suspense')

    const tiles = ROW_TILES[rowId]
    // mine is derived server-side from the committed seeds (provably fair),
    // keyed on rowId; local random is only a degraded offline fallback.
    const outcome = fetchOutcome(rowId, tile)
    const wait = new Promise<void>(resolve => {
      timerRef.current = setTimeout(resolve, SUSPENSE_MS)
    })
    void Promise.all([outcome, wait]).then(([o]) => {
      const mine = o?.mine ?? Math.floor(Math.random() * tiles)
      const hit = o ? o.hit : mine === tile

      setSuspense(null)
      setMines(m => ({ ...m, [rowId]: mine }))
      setPicks(p => ({ ...p, [rowId]: tile }))

      if (hit) {
        sfxBust()
        setBustRowId(rowId)
        addScore('death-run', mult, `Row ${playedCount + 1}`)
        settle(playedCount, 0)
        setGameState('bust')
        return
      }

      sfxCorrect()
      const next = playedCount + 1
      setPlayedCount(next)
      if (next >= order.length) {
        const finalMult = order.reduce((m, rid) => m * rowMult(ROW_TILES[rid]), 1)
        sfxCashout()
        addScore('death-run', finalMult, 'Cleared')
        settle(order.length, finalMult)
        setGameState('won')
      } else {
        setGameState('playing')
      }
    })
  }, [gameState, order, playedCount, mult, settle])

  const cashOut = useCallback(() => {
    if (gameState === 'playing' && playedCount > 0) {
      sfxCashout()
      addScore('death-run', mult, `Row ${playedCount}`)
      settle(playedCount, mult)
      setGameState('cashout')
    }
  }, [gameState, playedCount, mult, settle])

  const playAgain = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    begin()
  }, [begin])

  // ---------------- setup ----------------
  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center px-3 py-4">
        <div className="w-full max-w-[420px] flex flex-col gap-6 animate-fade-in">

          <div className="text-center">
            <span className="text-4xl mb-3 block">💀</span>
            <h1 className="text-2xl font-bold text-white">Death Run</h1>
            <p className="text-sm text-[#6b7280] mt-1">
              Climb {ROW_TILES.length} rows of 7→2 tiles. Fewer tiles, bigger multiplier — shuffle the order to pick your risk.
            </p>
          </div>

          <BetSelector balance={blitzBalance} value={wager} onChange={setWager} />

          <div className="flex flex-col gap-1.5 rounded-2xl border border-[#2a2a3a] bg-[#12121a] p-4">
            <span className="text-[10px] uppercase tracking-wider text-[#6b7280]">Per-row multiplier</span>
            <div className="flex flex-wrap gap-1.5">
              {ROW_TILES.map(t => (
                <span key={t} className="text-xs font-mono text-[#6E54FF] bg-[#6E54FF]/10 rounded-md px-2 py-1">
                  {t} → ×{rowMult(t).toFixed(2)}
                </span>
              ))}
            </div>
            <span className="text-[10px] text-[#586878] mt-1">
              Full climb ≈ ×{ROW_TILES.reduce((m, t) => m * rowMult(t), 1).toFixed(2)}
            </span>
          </div>

          <button
            onClick={begin}
            disabled={maxAffordable(blitzBalance) < WAGER_MIN}
            className="w-full py-4 rounded-2xl bg-[#6E54FF] text-white font-bold active:scale-[0.98] transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Bet {wager} & Climb
          </button>
        </div>
      </div>
    )
  }

  // ---------------- playing / end ----------------
  const showAllMines = gameState === 'bust'
  const isPlaying = gameState === 'playing' || gameState === 'suspense'

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center px-3 py-4">
      <div className="w-full max-w-[420px] flex flex-col gap-3">
        <header className="flex items-center justify-between">
          <div className="w-6" />
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#6b7280]">
              Row <span className="text-white font-bold">{Math.min(playedCount + 1, order.length)}</span>/{order.length}
            </span>
            <span className="text-lg font-mono font-bold text-[#6E54FF]">{mult.toFixed(2)}x</span>
          </div>
        </header>

        <div className="flex-1 flex flex-col-reverse gap-1.5 py-2 overflow-y-auto max-h-[calc(100dvh-200px)]">
          {order.map((rowId, pos) => {
            const tiles = ROW_TILES[rowId]
            const isCompleted = pos < playedCount
            const isCurrent = pos === playedCount && isPlaying
            const isFuture = pos > playedCount
            const isBustRow = gameState === 'bust' && rowId === bustRowId
            const isSuspenseRow = gameState === 'suspense' && suspense?.rowId === rowId

            return (
              <div
                key={rowId}
                ref={isCurrent ? currentRowRef : null}
                className={`flex items-center gap-2 transition-opacity duration-300 ${
                  isFuture && !showAllMines ? 'opacity-35' : 'opacity-100'
                }`}
              >
                <div className="w-12 flex justify-end shrink-0">
                  <span className={`text-[10px] font-mono ${isCurrent ? 'text-[#6E54FF]' : 'text-[#586878]'}`}>
                    ×{rowMult(tiles).toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-1.5 flex-1">
                  {Array.from({ length: tiles }, (_, tileIndex) => {
                    const picked = picks[rowId]
                    const isPicked = isCompleted && picked === tileIndex
                    const isMine = mines[rowId] === tileIndex
                    const isDeathPick = isBustRow && isPicked && isMine
                    const isRevealedMine = isMine && !isDeathPick && (isCompleted || showAllMines)
                    const isSuspTile = isSuspenseRow && tileIndex === suspense?.tile

                    let tileClass = 'bg-[#1a1a2e] border-[#2a2a3a]'
                    let content: React.ReactNode = null

                    if (isDeathPick) {
                      tileClass = 'bg-[#e74c3c] border-[#e74c3c] animate-shake'
                      content = <span className="text-xl">💀</span>
                    } else if (isSuspTile) {
                      tileClass = 'bg-[#ffb34730] border-[#ffb347]'
                    } else if (isPicked) {
                      tileClass = 'bg-[#6E54FF]/20 border-[#6E54FF]'
                      content = (
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                          <path d="M5 10L8.5 13.5L15 7" stroke="#6E54FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )
                    } else if (isRevealedMine) {
                      tileClass = 'bg-[#e74c3c]/20 border-[#e74c3c]/50'
                      content = <span className="text-sm opacity-60">💀</span>
                    } else if (isCurrent && gameState === 'playing') {
                      tileClass = 'bg-[#1a1a2e] border-[#3a3a5a] hover:bg-[#2a2a4e] hover:border-[#6E54FF]/50 cursor-pointer active:scale-95'
                    }

                    return (
                      <button
                        key={tileIndex}
                        onClick={() => pickTile(rowId, tileIndex)}
                        disabled={!isCurrent || gameState !== 'playing'}
                        className={`flex-1 h-[48px] rounded-xl border flex items-center justify-center transition-all duration-150 ${tileClass}`}
                        style={isSuspTile ? { animation: 'shake 0.15s ease-in-out infinite', boxShadow: '0 0 16px rgba(255,179,71,0.3)' } : undefined}
                      >
                        {content}
                      </button>
                    )
                  })}
                </div>

                <div className="w-7 shrink-0 flex justify-center">
                  {isCurrent && !isSuspenseRow && <div className="w-2 h-2 rounded-full bg-[#6E54FF] animate-pulse-green" />}
                </div>
              </div>
            )
          })}
        </div>

        {gameState === 'playing' && playedCount < order.length && (
          <div className="flex gap-2">
            <button
              onClick={reshuffle}
              className="flex-1 py-3 rounded-xl border border-[#2a2a3a] text-[#a78bfa] font-bold text-sm hover:border-[#6E54FF] active:scale-[0.97] transition"
            >
              🔀 Shuffle rows
            </button>
            {playedCount > 0 && (
              <button
                onClick={cashOut}
                className="flex-1 py-3 rounded-xl bg-[#6E54FF] text-white font-bold text-sm active:scale-[0.97] animate-pulse-green"
              >
                Cash out {mult.toFixed(2)}x
              </button>
            )}
          </div>
        )}

        {gameState === 'playing' && playedCount === 0 && (
          <div className="text-center text-xs text-[#6b7280] py-2">
            Pick a tile to start — or shuffle if the next row looks risky
          </div>
        )}

        {gameState === 'suspense' && (
          <div className="w-full py-3.5 rounded-xl bg-[#ffb34720] text-center text-[#ffb347] font-bold text-sm animate-fade-in">...</div>
        )}

        {chainStatus !== 'idle' && (
          <div className="text-center text-[10px] py-1">
            {chainStatus === 'starting' && <span className="text-[#6b7280]">Starting on-chain...</span>}
            {chainStatus === 'live' && (
              <span className="text-[#6E54FF] flex items-center justify-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#6E54FF]" />
                On-chain
              </span>
            )}
            {chainStatus === 'settling' && <span className="text-[#6b7280]">Settling...</span>}
            {chainStatus === 'settled' && txHash && (
              <span className="text-[#6b7280]">
                Settled{' '}
                <a href={`https://testnet.monadexplorer.com/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="text-[#6E54FF] underline">
                  {txHash.slice(0, 6)}...{txHash.slice(-4)}
                </a>
              </span>
            )}
            {chainStatus === 'error' && <span className="text-[#6b7280]/50">Off-chain</span>}
          </div>
        )}

        {gameState === 'bust' && (
          <div className="flex flex-col gap-3 animate-fade-in">
            <div className="text-center py-3">
              <span className="text-xl font-bold text-[#e74c3c]">BUSTED!</span>
              <span className="text-sm text-[#6b7280] ml-2">Row {playedCount + 1}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={playAgain} className="flex-1 py-3 rounded-xl bg-[#6E54FF] text-white font-bold text-sm active:scale-[0.97]">Try Again</button>
              <button onClick={onBack} className="flex-1 py-3 rounded-xl border border-[#2a2a3a] text-[#6b7280] font-bold text-sm hover:text-white active:scale-[0.97]">Back</button>
            </div>
          </div>
        )}

        {(gameState === 'cashout' || gameState === 'won') && (
          <div className="flex flex-col gap-3 animate-fade-in">
            <div className="text-center py-3">
              <span className="text-xl font-bold text-[#6E54FF]">{gameState === 'won' ? 'CLEARED!' : 'CASHED OUT'}</span>
              <span className="text-lg font-mono font-bold text-[#6E54FF] ml-2 animate-count-up">{mult.toFixed(2)}x</span>
            </div>
            <SharePnL game="Death Run" emoji="💀" multiplier={mult} wager={wager} />
            <div className="flex gap-2">
              <button onClick={playAgain} className="flex-1 py-3 rounded-xl bg-[#6E54FF] text-white font-bold text-sm active:scale-[0.97]">Play Again</button>
              <button onClick={onBack} className="flex-1 py-3 rounded-xl border border-[#2a2a3a] text-[#6b7280] font-bold text-sm hover:text-white active:scale-[0.97]">Back</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DeathRun
