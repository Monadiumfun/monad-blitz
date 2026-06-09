import { useState } from 'react'
import GameHub from './components/GameHub'
import Leaderboard from './components/Leaderboard'
import HigherLower from './games/HigherLower'
import LaserParty from './games/LaserParty'
import DeathRun from './games/DeathRun'
import type { GameId } from './types'

type Screen = GameId | 'leaderboard' | null

function App() {
  const [screen, setScreen] = useState<Screen>(null)
  const [balance] = useState(1.0)

  const goHome = () => setScreen(null)

  if (screen === 'higher-lower') return <HigherLower onBack={goHome} />
  if (screen === 'laser-party') return <LaserParty onBack={goHome} />
  if (screen === 'death-run') return <DeathRun onBack={goHome} />
  if (screen === 'leaderboard') return <Leaderboard onBack={goHome} />

  return <GameHub onSelectGame={setScreen} balance={balance} />
}

export default App
