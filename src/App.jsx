/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './App.scss'
import { Tile } from './components/Tile.jsx'
import { createMine } from './services/createMine.js';

const gridSide = 8;
const totalMines = 8;
let grid = []


function App() {
  
  const [isGameOver, setIsGameOver] = useState(false)
  const [isGameResetted, setIsGameResetted] = useState(true)
  // const [secondsPlayed, setSecondsPlayed] = useState(0)
  const [flagsLeft, setFlagsLeft] = useState(0)
  const [flagsUsed, setFlagsUsed] = useState([])

  const handleEndGame = () => {
    console.log('Game over')
    setIsGameOver(true)
    setIsGameResetted(false)
  }

  const handleResetGame = () => {
    console.log('Reset game')
    setIsGameOver(false)
    setIsGameResetted(true)
  }

  const onHandleFlagClick = (index, isFlagged) => {
    console.log("🚀 ~ onHandleFlagClick ~ isFlagged:", isFlagged)
    if (isFlagged) {
      console.log('Flag removed')
      setFlagsUsed([...flagsUsed.filter(flag => flag !== index)])
      setFlagsLeft(flagsLeft + 1)
    } else {
      console.log('Flag added')
      setFlagsLeft(flagsLeft - 1)
      setFlagsUsed([...flagsUsed, index])
    }
  }

  // const getTime = (startTime) => {
  //   const currentTime = new Date()
  //   const seconds = Math.floor((currentTime.getTime() - startTime.getTime()) / 1000)
  //   setSecondsPlayed(seconds)
  //   console.log("🚀 ~ getTime ~ secondsPlayed:", secondsPlayed)
  // }

  // useEffect(() => {
  //   const startTime = new Date()
  //   const interval = setInterval(() => getTime(startTime), 1000)

  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    if (isGameResetted) {
      setFlagsLeft(totalMines)
      const mines = createMine(gridSide, totalMines)
      grid = Array(gridSide * gridSide).fill(false)
      grid.map((_, y) => { if (mines.includes(y)) grid[y] = true })
      console.log("🚀 ~ mines:", mines)
      setIsGameResetted(false)
    }
  }, [isGameResetted])
 
  return (
    <>
      <h1>Minesweeper game</h1>
      <div className='control'>
        {
          // <span className='secondsPlayed'>{secondsPlayed}</span>
        }
        {
          !isGameOver &&
          <button className='button' onClick={handleResetGame}>🙂</button>

        }
        {
          !isGameResetted && isGameOver &&
          <button className='button' onClick={handleResetGame}>☹️</button>
        }
        {
          <span className='flagsLeft'>{flagsLeft}</span>
        }
      </div>
      <div className={`grid ${(isGameOver && !isGameResetted) ? 'gameOver' : ''}`}>
        {
          grid.map((_, index) => 
            <Tile key={index} index={index} hasMine={grid[index]}
              endGame={handleEndGame} resetGame={isGameResetted}
              flagTile={onHandleFlagClick}/>)
        }
        {
          isGameOver && <h3>Game over!!</h3>
        }
      </div>
      
    </>
  )
}

export default App

