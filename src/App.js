import React, { useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import Home from './components/HomePage/Home'
import Game from './components/GamePage/Game'
import Results from './components/ResultsPage/Results'
import './App.css'

const App = () => {
  const [display, setDisplay] = useState('HOME')
  const [settings, setSettings] = useState(null)
  const [results, setResults] = useState(null)

  const handlePlayClick = settings => {
    setSettings(settings)
    setDisplay('GAME')
  }

  const handleGameEnd = results => {
    setResults(results)
    if (
      !localStorage.getItem('highestScore') ||
      results.score > localStorage.getItem('highestScore')
    ) {
      localStorage.setItem('highestScore', results.score)
    }
    setDisplay('RESULTS')
  }

  const handlePlayAgain = () => {
    setDisplay('GAME')
  }

  const handleHomeButtonClick = () => {
    setDisplay('HOME')
  }

  console.log(settings)

  return (
    <SwitchTransition>
      <CSSTransition classNames='swipe' key={display} timeout={350}>
        {display === 'HOME' ? (
          <Home handlePlayClick={handlePlayClick} settings={settings} />
        ) : display === 'GAME' ? (
          <Game settings={settings} handleGameEnd={handleGameEnd} />
        ) : (
          <Results
            results={results}
            handlePlayAgain={handlePlayAgain}
            handleHomeButtonClick={handleHomeButtonClick}
          />
        )}
      </CSSTransition>
    </SwitchTransition>
  )
}

export default App
