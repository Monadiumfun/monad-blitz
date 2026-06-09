import { useState, useCallback, useRef, useEffect } from 'react'
import { sfxTap, sfxCorrect, sfxBust, sfxCashout, sfxSuspense } from '../lib/sounds'

interface DeathRunProps {
  onBack: () => void
}

type GameState = 'setup' | 'playing' | 'suspense' | 'cashout' | 'bust'
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

function DeathRun({ onBack }: DeathRunProps) {
  const [gameState, setGameState] = useState<GameState>('setup')
  const [tilesPerRow, setTilesPerRow] = useState<TilesPerRow>(2)
  const [currentRow, setCurrentRow] = useState(0)
  const [mines, setMines] = useState<number[]>([])
  const [picks, setPicks] = useState<number[]>([])
  const [suspenseTile, setSuspenseTile] = useState<number>(-1)
  const currentRowRef = useRef<HTMLDivElement | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if ((gameState === 'playing' || gameState === 'suspense') && currentRowRef.current) {
      currentRowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [currentRow, gameState])

  const multiplier = cumulativeMultiplier(tilesPerRow, picks.length)

  const ensureMines = useCallback((upTo: number, tiles: TilesPerRow, existing: number[]) => {
    if (existing.length > upTo) return existing
    const extended = [...existing]
    while (extended.length <= upTo) {
      extended.push(Math.floor(Math.random() * tiles))
    }
    return extended
  }, [])

  const startGame = useCallback((tiles: TilesPerRow) => {
    setTilesPerRow(tiles)
    const initial: number[] = []
    for (let i = 0; i < PREVIEW_ROWS + 1; i++) {
      initial.push(Math.floor(Math.random() * tiles))
    }
    setMines(initial)
    setCurrentRow(0)
    setPicks([])
    setSuspenseTile(-1)
    setGameState('playing')
  }, [])

  const handleTilePick = useCallback((rowIndex: number, tileIndex: number) => {
    if (gameState !== 'playing' || rowIndex !== currentRow) return

    sfxTap()
    sfxSuspense()
    setSuspenseTile(tileIndex)
    setGameState('suspense')

    timerRef.current = setTimeout(() => {
      setSuspenseTile(-1)

      if (mines[rowIndex] === tileIndex) {
        sfxBust()
        setPicks(p => [...p, tileIndex])
        setGameState('bust')
        return
      }

      sfxCorrect()
      const newPicks = [...picks, tileIndex]
      setPicks(newPicks)
      const nextRow = currentRow + 1
      setCurrentRow(nextRow)
      setMines(prev => ensureMines(nextRow + PREVIEW_ROWS, tilesPerRow, prev))
      setGameState('playing')
    }, SUSPENSE_MS)
  }, [gameState, currentRow, mines, picks, tilesPerRow, ensureMines])

  const handleCashOut = useCallback(() => {
    if (gameState === 'playing' && picks.length > 0) {
      sfxCashout()
      setGameState('cashout')
    }
  }, [gameState, picks.length])

  const handlePlayAgain = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    const initial: number[] = []
    for (let i = 0; i < PREVIEW_ROWS + 1; i++) {
      initial.push(Math.floor(Math.random() * tilesPerRow))
    }
    setMines(initial)
    setCurrentRow(0)
    setPicks([])
    setSuspenseTile(-1)
    setGameState('playing')
  }, [tilesPerRow])

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

          <div className="flex flex-col gap-3">
            {DIFFICULTIES.map(({ tiles, label, desc }) => (
              <button
                key={tiles}
                onClick={() => startGame(tiles)}
                className="flex items-center justify-between rounded-2xl border border-[#2a2a3a] bg-[#12121a] p-5 transition-all duration-150 hover:border-[#a2e634] hover:bg-[#1a1a2e] active:scale-[0.98]"
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="text-base font-bold text-white">{label}</span>
                  <span className="text-xs text-[#6b7280]">{desc}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-lg font-mono font-bold text-[#a2e634]">
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
            <span className="text-lg font-mono font-bold text-[#a2e634]">
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
                    <div className="w-2 h-2 rounded-full bg-[#a2e634] animate-pulse-green" />
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
                    const isRevealedMine = showMines && isMine && !isDeathPick && isCompletedRow
                    const isSuspenseTile = isSuspenseRow && tileIndex === suspenseTile

                    let tileClass = 'bg-[#1a1a2e] border-[#2a2a3a]'
                    let content: React.ReactNode = null

                    if (isDeathPick) {
                      tileClass = 'bg-[#e74c3c] border-[#e74c3c] animate-shake'
                      content = <span className="text-xl">💀</span>
                    } else if (isSuspenseTile) {
                      tileClass = 'bg-[#ffb34730] border-[#ffb347]'
                    } else if (isPicked) {
                      tileClass = 'bg-[#a2e634]/20 border-[#a2e634]'
                      content = (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M5 10L8.5 13.5L15 7" stroke="#a2e634" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )
                    } else if (isRevealedMine) {
                      tileClass = 'bg-[#e74c3c]/20 border-[#e74c3c]/50'
                      content = <span className="text-sm opacity-60">💀</span>
                    } else if (isCurrentRow && gameState === 'playing') {
                      tileClass = 'bg-[#1a1a2e] border-[#3a3a5a] hover:bg-[#2a2a4e] hover:border-[#a2e634]/50 cursor-pointer active:scale-95'
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
            className="w-full py-3.5 rounded-xl bg-[#a2e634] text-[#0a0a0f] font-bold text-sm active:scale-[0.97] animate-pulse-green"
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
      </div>

      {gameState === 'bust' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fade-in">
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-[#e74c3c]/30 bg-[#12121a] px-8 py-10 w-[320px]">
            <span className="text-5xl animate-shake">💀</span>
            <h2 className="text-2xl font-bold text-[#e74c3c]">BUSTED!</h2>
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm text-[#6b7280]">Reached Row</span>
              <span className="text-2xl font-bold text-white">{picks.length}</span>
            </div>
            <div className="flex flex-col gap-2.5 w-full mt-2">
              <button
                onClick={handlePlayAgain}
                className="w-full py-3 rounded-xl bg-[#a2e634] text-[#0a0a0f] font-bold text-sm active:scale-[0.97]"
              >
                Try Again
              </button>
              <button
                onClick={onBack}
                className="w-full py-3 rounded-xl border border-[#2a2a3a] text-[#6b7280] font-bold text-sm hover:text-white active:scale-[0.97]"
              >
                Back to Hub
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === 'cashout' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fade-in">
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-[#a2e634]/30 bg-[#12121a] px-8 py-10 w-[320px]">
            <span className="text-5xl">💰</span>
            <h2 className="text-2xl font-bold text-[#a2e634]">CASHED OUT</h2>
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm text-[#6b7280]">Final Multiplier</span>
              <span className="text-3xl font-mono font-bold text-[#a2e634] animate-count-up">{multiplier.toFixed(2)}x</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm text-[#6b7280]">Rows Cleared</span>
              <span className="text-xl font-bold text-white">{picks.length}</span>
            </div>
            <div className="flex flex-col gap-2.5 w-full mt-2">
              <button
                onClick={handlePlayAgain}
                className="w-full py-3 rounded-xl bg-[#a2e634] text-[#0a0a0f] font-bold text-sm active:scale-[0.97]"
              >
                Play Again
              </button>
              <button
                onClick={onBack}
                className="w-full py-3 rounded-xl border border-[#2a2a3a] text-[#6b7280] font-bold text-sm hover:text-white active:scale-[0.97]"
              >
                Back to Hub
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeathRun
