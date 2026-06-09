export interface ChainTx {
  id: number
  label: string
  status: 'pending' | 'confirmed' | 'failed'
  txHash?: string
}

const MAX_ITEMS = 4

let nextId = 1
let items: ChainTx[] = []
const listeners = new Set<() => void>()

function emit() {
  for (const fn of listeners) fn()
}

export function subscribeChainFeed(fn: () => void): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function getChainFeed(): ChainTx[] {
  return items
}

export function trackTx(label: string) {
  const id = nextId++
  items = [{ id, label, status: 'pending' as const }, ...items].slice(0, MAX_ITEMS)
  emit()

  const update = (patch: Partial<ChainTx>) => {
    items = items.map(t => (t.id === id ? { ...t, ...patch } : t))
    emit()
  }

  return {
    confirm: (txHash: string) => update({ status: 'confirmed', txHash }),
    fail: () => update({ status: 'failed' }),
  }
}
