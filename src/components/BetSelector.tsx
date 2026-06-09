import { useState } from 'react'
import { WAGER_MIN, WAGER_PRESETS, clampWager, maxAffordable } from '../lib/wager'

interface BetSelectorProps {
  balance: number
  value: number
  onChange: (wager: number) => void
}

function BetSelector({ balance, value, onChange }: BetSelectorProps) {
  const [draft, setDraft] = useState(String(value))
  const upper = maxAffordable(balance)
  const tooPoor = upper < WAGER_MIN

  const commit = (raw: string) => {
    setDraft(raw)
    const n = Number(raw)
    if (Number.isFinite(n) && n > 0) onChange(clampWager(n, balance))
  }

  const pick = (preset: number) => {
    const w = clampWager(preset, balance)
    setDraft(String(w))
    onChange(w)
  }

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-[#6b7280] uppercase tracking-wider">Bet (BLITZ)</span>
        <span className="text-[10px] text-[#6b7280]">
          Balance <span className="text-white font-semibold">{Math.floor(balance)}</span>
        </span>
      </div>

      <div className="flex gap-2">
        {WAGER_PRESETS.map(preset => {
          const disabled = preset > upper
          const active = !disabled && preset === value
          return (
            <button
              key={preset}
              onClick={() => pick(preset)}
              disabled={disabled}
              className={`flex-1 py-2 rounded-xl border text-sm font-bold transition-all active:scale-[0.96] ${
                active
                  ? 'border-[#6E54FF] bg-[#6E54FF20] text-[#6E54FF]'
                  : disabled
                    ? 'border-[#2a2a3a] text-[#3a3a4a] cursor-not-allowed'
                    : 'border-[#2a2a3a] bg-[#12121a] text-white hover:border-[#6E54FF]/50'
              }`}
            >
              {preset}
            </button>
          )
        })}
      </div>

      <input
        type="number"
        inputMode="numeric"
        value={draft}
        min={WAGER_MIN}
        max={upper}
        onChange={e => setDraft(e.target.value)}
        onBlur={e => commit(e.target.value)}
        className="w-full rounded-xl border border-[#2a2a3a] bg-[#12121a] px-3 py-2.5 text-center text-base font-bold text-white outline-none focus:border-[#6E54FF]"
        placeholder="Custom amount"
      />

      {tooPoor && (
        <span className="text-[10px] text-[#e74c3c] text-center">
          Not enough BLITZ — min bet is {WAGER_MIN}
        </span>
      )}
    </div>
  )
}

export default BetSelector
