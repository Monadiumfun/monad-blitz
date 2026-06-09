import { useSyncExternalStore } from 'react'
import { getChainFeed, subscribeChainFeed } from '../lib/chainFeed'

const EXPLORER_TX_URL = 'https://testnet.monadexplorer.com/tx/'

function shortHash(hash: string): string {
  return `${hash.slice(0, 6)}…${hash.slice(-4)}`
}

function ChainFeed() {
  const txs = useSyncExternalStore(subscribeChainFeed, getChainFeed)

  if (txs.length === 0) return null

  return (
    <div className="fixed bottom-3 left-3 z-40 flex flex-col gap-1 pointer-events-none">
      {txs.map(tx => (
        <div
          key={tx.id}
          className="flex items-center gap-2 rounded-lg border border-[#2a2a3a] bg-[#12121acc] px-2.5 py-1.5 text-[11px] backdrop-blur-sm pointer-events-auto animate-fade-in"
        >
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              tx.status === 'pending'
                ? 'bg-[#ffb347] animate-pulse'
                : tx.status === 'confirmed'
                  ? 'bg-[#6E54FF]'
                  : 'bg-[#e74c3c]'
            }`}
          />
          <span className="text-[#6b7280]">{tx.label}</span>
          {tx.status === 'confirmed' && tx.txHash && (
            <a
              href={`${EXPLORER_TX_URL}${tx.txHash}`}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[#836FFF] hover:text-white"
            >
              {shortHash(tx.txHash)}
            </a>
          )}
          {tx.status === 'pending' && <span className="text-[#ffb347]">sponsored…</span>}
        </div>
      ))}
    </div>
  )
}

export default ChainFeed
