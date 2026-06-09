import { useState, useCallback, useRef, useEffect } from 'react'
import { sfxTap, sfxCorrect, sfxBust, sfxCashout, sfxSuspense } from '../lib/sounds'
import { addScore } from '../lib/leaderboard'
import { startChainGame, recordChainMove, endChainGame, fetchOutcome } from '../lib/chainGame'
import BetSelector from '../components/BetSelector'
import SharePnL from '../components/SharePnL'
import { WAGER_DEFAULT, WAGER_MIN, clampWager, maxAffordable } from '../lib/wager'

interface DeathRunProps {
  onBack: () => void
  blitzBalance: number
}

type GameState = 'setup' | 'playing' | 'suspense' | 'cashout' | 'bust'
type ChainStatus = 'idle' | 'starting' | 'live' | 'settling' | 'settled' | 'error'
type TilesPerRow = 2 | 3 | 4

const FEE_FACTOR = 0.96
const PREVIEW_ROWS = 3
const SUSPENSE_MS = 650

function rowMultiplier(tilesPerRow: TilesPerRow): number {
  return (1 / (1 - 1 / tilesPerRow)) * FEE_FACTOR
}

function cumulativeMultiplier(tilesPerRow: TilesPerRow, rows: number): number {
  if (rows <= 0) return 1
  return Math.pow(rowMultiplier(tilesPerRow), rows)
}

const DIFFICULTIES: { tiles: TilesPerRow; label: string; desc: string }[] = [
  { tiles: 2, label: 'Easy', desc: '1 mine in 2 tiles' },
  { tiles: 3, label: 'Medium', desc: '1 mine in 3 tiles' },
  { tiles: 4, label: 'Hard', desc: '1 mine in 4 tiles' },
]

function DeathRun({ onBack, blitzBalance }: DeathRunProps) {
  const [gameState, setGameState] = useState<GameState>('setup')
  const [wager, setWager] = useState(() => clampWager(WAGER_DEFAULT, blitzBalance))
  const [tilesPerRow, setTilesPerRow] = useState<TilesPerRow>(2)
  const [currentRow, setCurrentRow] = useState(0)
  const [mines, setMines] = useState<number[]>([])
  const [picks, setPicks] = useState<number[]>([])
  const [suspenseTile, setSuspenseTile] = useState<number>(-1)
  const [chainStatus, setChainStatus] = useState<ChainStatus>('idle')
  const [txHash, setTxHash] = useState<string | null>(null)
  const currentRowRef = useRef<HTMLDivElement | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fireGameStart = useCallback((tiles: TilesPerRow) => {
    setChainStatus('starting')
    setTxHash(null)
    void startChainGame('death-run', wager, { tiles }).then(r => {
      if (!r) return setChainStatus('error')
      setChainStatus('live')
      setTxHash(r.txHash)
    })
  }, [wager])

  const settleOnChain = useCallback((score: number, mult: number) => {
    setChainStatus('settling')
    void endChainGame(score, mult).then(r => {
      if (!r) return setChainStatus('error')
      setTxHash(r.txHash)
      setChainStatus('settled')
    })
  }, [])

  useEffect(() => {
    if ((gameState === 'playing' || gameState === 'suspense') && currentRowRef.current) {
      currentRowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [currentRow, gameState])

  const multiplier = cumulativeMultiplier(tilesPerRow, picks.length)

  const startGame = useCallback((tiles: TilesPerRow) => {
    fireGameStart(tiles)
    setTilesPerRow(tiles)
    setMines([])
    setCurrentRow(0)
    setPicks([])
    setSuspenseTile(-1)
    setGameState('playing')
  }, [fireGameStart])

  const handleTilePick = useCallback((rowIndex: number, tileIndex: number) => {
    if (gameState !== 'playing' || rowIndex !== currentRow) return

    sfxTap()
    sfxSuspense()
    recordChainMove(0, picks.length + 1)
    setSuspenseTile(tileIndex)
    setGameState('suspense')

    // The mine position is derived server-side from the committed seeds
    // (provably fair); local random is only a degraded offline fallback.
    const outcome = fetchOutcome(picks.length, tileIndex)
    const suspense = new Promise<void>(resolve => {
      timerRef.current = setTimeout(resolve, SUSPENSE_MS)
    })
    void Promise.all([outcome, suspense]).then(([o]) => {
      const mine = o?.mine ?? Math.floor(Math.random() * tilesPerRow)
      const hit = o ? o.hit : mine === tileIndex

      setSuspenseTile(-1)
      setMines(prev => {
        const next = [...prev]
        next[rowIndex] = mine
        return next
      })

      if (hit) {
        sfxBust()
        const mult = cumulativeMultiplier(tilesPerRow, picks.length)
        addScore('death-run', mult, `Row ${picks.length}`)
        settleOnChain(picks.length, 0)
        setPicks(p => [...p, tileIndex])
        setGameState('bust')
        return
      }

      sfxCorrect()
      setPicks(p => [...p, tileIndex])
      setCurrentRow(rowIndex + 1)
      setGameState('playing')
    })
  }, [gameState, currentRow, picks, tilesPerRow, settleOnChain])

  const handleCashOut = useCallback(() => {
    if (gameState === 'playing' && picks.length > 0) {
      sfxCashout()
      addScore('death-run', multiplier, `Row ${picks.length}`)
      settleOnChain(picks.length, multiplier)
      setGameState('cashout')
    }
  }, [gameState, picks.length, multiplier, settleOnChain])

  const handlePlayAgain = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    fireGameStart(tilesPerRow)
    setMines([])
    setCurrentRow(0)
    setPicks([])
    setSuspenseTile(-1)
    setGameState('playing')
  }, [tilesPerRow, fireGameStart])

  if (gameState === 'setup') {
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
            <span className="text-4xl mb-3 block">💀</span>
            <h1 className="text-2xl font-bold text-white">Death Run</h1>
            <p className="text-sm text-[#6b7280] mt-1">Climb forever. Avoid the mines. Cash out anytime.</p>
          </div>

          <BetSelector balance={blitzBalance} value={wager} onChange={setWager} />

          <div className="flex flex-col gap-3">
            {DIFFICULTIES.map(({ tiles, label, desc }) => (
              <button
                key={tiles}
                onClick={() => startGame(tiles)}
                disabled={maxAffordable(blitzBalance) < WAGER_MIN}
                className="flex items-center justify-between rounded-2xl border border-[#2a2a3a] bg-[#12121a] p-5 transition-all duration-150 hover:border-[#6E54FF] hover:bg-[#1a1a2e] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#2a2a3a]"
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="text-base font-bold text-white">{label}</span>
                  <span className="text-xs text-[#6b7280]">{desc}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-lg font-mono font-bold text-[#6E54FF]">
                    {rowMultiplier(tiles).toFixed(2)}x
                  </span>
                  <span className="text-[10px] text-[#6b7280] uppercase tracking-wider">per row</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const showMines = gameState === 'bust'
  const totalVisible = currentRow + PREVIEW_ROWS + 1
  const isPlaying = gameState === 'playing' || gameState === 'suspense'

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center px-3 py-4">
      <div className="w-full max-w-[420px] flex flex-col gap-3">
        <header className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#6b7280]">
              Row <span className="text-white font-bold">{picks.length + 1}</span>
            </span>
            <span className="text-lg font-mono font-bold text-[#6E54FF]">
              {multiplier.toFixed(2)}x
            </span>
          </div>
        </header>

        <div className="flex-1 flex flex-col-reverse gap-1.5 py-2 overflow-y-auto max-h-[calc(100dvh-180px)]">
          {Array.from({ length: totalVisible }, (_, rowIndex) => {
            const isCurrentRow = rowIndex === currentRow && isPlaying
            const isCompletedRow = rowIndex < picks.length
            const isFutureRow = rowIndex > currentRow || (rowIndex === currentRow && !isPlaying)
            const isBustRow = gameState === 'bust' && rowIndex === picks.length - 1
            const rowMultValue = cumulativeMultiplier(tilesPerRow, rowIndex + 1)
            const isSuspenseRow = gameState === 'suspense' && rowIndex === currentRow

            return (
              <div
                key={rowIndex}
                ref={isCurrentRow ? currentRowRef : null}
                className={`flex items-center gap-2 transition-opacity duration-300 ${
                  isFutureRow && !showMines ? 'opacity-20' : 'opacity-100'
                }`}
              >
                <div className="w-8 flex justify-center shrink-0">
                  {isCurrentRow && !isSuspenseRow && (
                    <div className="w-2 h-2 rounded-full bg-[#6E54FF] animate-pulse-green" />
                  )}
                  {isSuspenseRow && (
                    <span className="text-sm animate-shake">...</span>
                  )}
                  {isCompletedRow && !isBustRow && (
                    <span className="text-[10px] font-mono text-[#6b7280]">{rowMultValue.toFixed(1)}x</span>
                  )}
                </div>

                <div className="flex gap-1.5 flex-1">
                  {Array.from({ length: tilesPerRow }, (_, tileIndex) => {
                    const isPicked = isCompletedRow && picks[rowIndex] === tileIndex
                    const isMine = mines[rowIndex] === tileIndex
                    const isDeathPick = isBustRow && isPicked && isMine
                    const isRevealedMine = isMine && !isDeathPick && isCompletedRow
                    const isSuspenseTile = isSuspenseRow && tileIndex === suspenseTile

                    let tileClass = 'bg-[#1a1a2e] border-[#2a2a3a]'
                    let content: React.ReactNode = null

                    if (isDeathPick) {
                      tileClass = 'bg-[#e74c3c] border-[#e74c3c] animate-shake'
                      content = <span className="text-xl">💀</span>
                    } else if (isSuspenseTile) {
                      tileClass = 'bg-[#ffb34730] border-[#ffb347]'
                    } else if (isPicked) {
                      tileClass = 'bg-[#6E54FF]/20 border-[#6E54FF]'
                      content = (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M5 10L8.5 13.5L15 7" stroke="#6E54FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )
                    } else if (isRevealedMine) {
                      tileClass = 'bg-[#e74c3c]/20 border-[#e74c3c]/50'
                      content = <span className="text-sm opacity-60">💀</span>
                    } else if (isCurrentRow && gameState === 'playing') {
                      tileClass = 'bg-[#1a1a2e] border-[#3a3a5a] hover:bg-[#2a2a4e] hover:border-[#6E54FF]/50 cursor-pointer active:scale-95'
                    }

                    return (
                      <button
                        key={tileIndex}
                        onClick={() => handleTilePick(rowIndex, tileIndex)}
                        disabled={gameState !== 'playing' || !isCurrentRow}
                        className={`flex-1 h-[52px] rounded-xl border flex items-center justify-center transition-all duration-150 ${tileClass}`}
                        style={isSuspenseTile ? {
                          animation: 'shake 0.15s ease-in-out infinite',
                          boxShadow: '0 0 16px rgba(255, 179, 71, 0.3)',
                        } : undefined}
                      >
                        {content}
                      </button>
                    )
                  })}
                </div>

                <div className="w-8 shrink-0" />
              </div>
            )
          })}
        </div>

        {gameState === 'playing' && picks.length > 0 && (
          <button
            onClick={handleCashOut}
            className="w-full py-3.5 rounded-xl bg-[#6E54FF] text-white font-bold text-sm active:scale-[0.97] animate-pulse-green"
          >
            CASH OUT {multiplier.toFixed(2)}x
          </button>
        )}

        {gameState === 'suspense' && (
          <div className="w-full py-3.5 rounded-xl bg-[#ffb34720] text-center text-[#ffb347] font-bold text-sm animate-fade-in">
            ...
          </div>
        )}

        {gameState === 'playing' && picks.length === 0 && (
          <div className="text-center text-xs text-[#6b7280] py-3">
            Pick a tile to start climbing
          </div>
        )}

        {chainStatus !== 'idle' && (
          <div className="text-center text-[10px] py-1">
            {chainStatus === 'starting' && (
              <span className="text-[#6b7280]">Starting on-chain...</span>
            )}
            {chainStatus === 'live' && (
              <span className="text-[#6E54FF] flex items-center justify-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#6E54FF]" />
                On-chain
              </span>
            )}
            {chainStatus === 'settling' && (
              <span className="text-[#6b7280]">Settling...</span>
            )}
            {chainStatus === 'settled' && txHash && (
              <span className="text-[#6b7280]">
                Settled{' '}
                <a
                  href={`https://testnet.monadscan.com/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6E54FF] underline"
                >
                  {txHash.slice(0, 6)}...{txHash.slice(-4)}
                </a>
              </span>
            )}
            {chainStatus === 'error' && (
              <span className="text-[#6b7280]/50">Off-chain</span>
            )}
          </div>
        )}

        {gameState === 'bust' && (
          <div className="flex flex-col gap-3 animate-fade-in">
            <div className="text-center py-3">
              <span className="text-xl font-bold text-[#e74c3c]">BUSTED!</span>
              <span className="text-sm text-[#6b7280] ml-2">Row {picks.length}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePlayAgain}
                className="flex-1 py-3 rounded-xl bg-[#6E54FF] text-white font-bold text-sm active:scale-[0.97]"
              >
                Try Again
              </button>
              <button
                onClick={onBack}
                className="flex-1 py-3 rounded-xl border border-[#2a2a3a] text-[#6b7280] font-bold text-sm hover:text-white active:scale-[0.97]"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {gameState === 'cashout' && (
          <div className="flex flex-col gap-3 animate-fade-in">
            <div className="text-center py-3">
              <span className="text-xl font-bold text-[#6E54FF]">CASHED OUT</span>
              <span className="text-lg font-mono font-bold text-[#6E54FF] ml-2 animate-count-up">{multiplier.toFixed(2)}x</span>
            </div>
            <SharePnL game="Death Run" emoji="💀" multiplier={multiplier} wager={wager} />
            <div className="flex gap-2">
              <button
                onClick={handlePlayAgain}
                className="flex-1 py-3 rounded-xl bg-[#6E54FF] text-white font-bold text-sm active:scale-[0.97]"
              >
                Play Again
              </button>
              <button
                onClick={onBack}
                className="flex-1 py-3 rounded-xl border border-[#2a2a3a] text-[#6b7280] font-bold text-sm hover:text-white active:scale-[0.97]"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default DeathRun
