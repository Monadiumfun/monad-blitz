import { getBalances } from './api/_lib/chain.ts'
const t0=Date.now()
const b = await getBalances('0x1f600e0Ad0Cb444b1C797BB48d5bF0dc4F25AEe5')
console.log('balances:', b, '| took', Date.now()-t0, 'ms')
