export interface ChainTx {
  id: number
  label: string
  status: 'pending' | 'confirmed' | 'failed'
  txHash?: string
  leaving?: boolean
}

const MAX_ITEMS = 4
const DISMISS_AFTER_MS = 2000 // keep a confirmed toast 2s, then slide it away
const FAIL_DISMISS_MS = 4000
const EXIT_ANIM_MS = 350

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

function patch(id: number, p: Partial<ChainTx>) {
  items = items.map(t => (t.id === id ? { ...t, ...p } : t))
  emit()
}

function remove(id: number) {
  items = items.filter(t => t.id !== id)
  emit()
}

// mark a toast as leaving (triggers the slide-down exit) then remove it
function dismiss(id: number, delay: number) {
  setTimeout(() => {
    patch(id, { leaving: true })
    setTimeout(() => remove(id), EXIT_ANIM_MS)
  }, delay)
}

export function trackTx(label: string) {
  const id = nextId++
  items = [{ id, label, status: 'pending' as const }, ...items].slice(0, MAX_ITEMS)
  emit()

  return {
    confirm: (txHash: string) => {
      patch(id, { status: 'confirmed', txHash })
      dismiss(id, DISMISS_AFTER_MS)
    },
    fail: () => {
      patch(id, { status: 'failed' })
      dismiss(id, FAIL_DISMISS_MS)
    },
  }
}
