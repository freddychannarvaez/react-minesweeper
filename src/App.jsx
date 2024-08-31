/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './App.scss'
import { Tile } from './components/Tile.jsx'
import { createMinesAndGrid } from './services/createMinesAndGrid.js';
import { getNeighbourTiles } from './services/getNeighbourTiles.js';

const gridSize = 8;
const totalMines = 8;

function App() {
  
  const [isGameOver, setIsGameOver] = useState(false)
  const [isGameResetted, setIsGameResetted] = useState(false)
  // const [secondsPlayed, setSecondsPlayed] = useState(0)
  // const [isGameStarted, setIsGameStarted] = useState(false)
  const [validateLastTile, setValidateLastTile] = useState(false)
  const [secondsPlayed, setSecondsPlayed] = useState(0)
  const [flagsLeft, setFlagsLeft] = useState(totalMines)
  const [flagsUsed, setFlagsUsed] = useState([])
  const [tilesToReveal, setTilesToReveal] = useState([])
  let { newMines: firstMines, newGrid: firstGrid } = createMinesAndGrid(gridSize, totalMines)
  const [mines, setMines] = useState(firstMines)
  const [grid, setGrid] = useState(firstGrid)


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

  const handleRevealTile = (index) => {
    if (mines.includes(index)) return
    const neighbourTiles = getNeighbourTiles(gridSize, index)
    setTilesToReveal([...tilesToReveal,
      ...neighbourTiles.filter((x) => !tilesToReveal.includes(x))])
  }

  const onHandleFlagClick = (index, isFlagged) => {
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

  const isGameWon = () => {
    return mines.every((x) => flagsUsed.includes(x))
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
      const { newMines, newGrid } = createMinesAndGrid(gridSize, totalMines)
      setMines(newMines)
      setGrid(newGrid)
      setFlagsLeft(totalMines)
      setFlagsUsed([])
      setTilesToReveal([])
      setIsGameResetted(false)
      setSecondsPlayed(0)
    }
  }, [isGameResetted])

  useEffect(() => {
    if (flagsLeft == 0) {
      setValidateLastTile(true)
    }
  }, [flagsLeft])

  useEffect(() => {
    if (validateLastTile == true) {
      if (!isGameOver && isGameWon()) {
        setIsGameOver(true)
        alert('You won!!')
      }
    }
  }, [validateLastTile])
 
  return (
    <>
      <h1>Minesweeper game</h1>
      <div className='control'>
        {
          <span className='secondsPlayed'>{secondsPlayed}</span>
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
              gridSize={gridSize} minesArray={mines}
              endGame={handleEndGame} resetGame={isGameResetted}
              flagTile={onHandleFlagClick} revealTile={handleRevealTile}
              tilesToReveal={tilesToReveal} revealMine={isGameOver}
              availableFlags={flagsLeft}/>)
        }
        {
          isGameOver && <h3>Game over!!</h3>
        }
      </div>
      
    </>
  )
}

export default App

