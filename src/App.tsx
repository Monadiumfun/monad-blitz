import { useState } from 'react'
import GameHub from './components/GameHub'
import HigherLower from './games/HigherLower'
import LaserParty from './games/LaserParty'
import DeathRun from './games/DeathRun'
import type { GameId } from './types'

function App() {
  const [currentGame, setCurrentGame] = useState<GameId | null>(null)
  const [balance] = useState(1.0)

  if (currentGame === 'higher-lower') {
    return <HigherLower onBack={() => setCurrentGame(null)} />
  }

  if (currentGame === 'laser-party') {
    return <LaserParty onBack={() => setCurrentGame(null)} />
  }

  if (currentGame === 'death-run') {
    return <DeathRun onBack={() => setCurrentGame(null)} />
  }

  return <GameHub onSelectGame={setCurrentGame} balance={balance} />
}

export default App
