process.env.DATABASE_URL='file:/tmp/dr-test.db'
const { initSchema, createUser, insertGame } = await import('./api/_lib/db.ts')
await initSchema()
await createUser({ telegramId: 42, username: 'tester', referredBy: null })
await insertGame({ telegramId: 42, game: 'death-run', onchainId: 1,
  seed: '0x'+'ab'.repeat(32), wager: '100', startTx: '0xstart',
  clientSeed: '0x'+'cd'.repeat(32), config: JSON.stringify({ tilesSeq: [7,6,5,4,3,2] }) })
// expected mines for each rowId
const { deathRunMine, deathRunRowMultiplier } = await import('./api/_lib/fair.ts')
const TILES=[7,6,5,4,3,2]
for(let r=0;r<6;r++) console.log('expected rowId',r,'tiles',TILES[r],'mine=',deathRunMine('0x'+'ab'.repeat(32),'0x'+'cd'.repeat(32),1,r,TILES[r]),'mult=',deathRunRowMultiplier(TILES[r]).toFixed(3))
process.exit(0)
