/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './App.scss'
import { Tile } from './components/Tile.jsx'
import { createMinesAndGrid } from './services/createMinesAndGrid.js';
import { getNeighbourTiles } from './services/getNeighbourTiles.js';
import githubLogo from './assets/github.svg';
import linkedinLogo from './assets/linkedin.svg';
import gmailLogo from './assets/gmail.svg';

const githubRepo = 'https://github.com/freddychannarvaez/react-minesweeper';
const portfolio = 'https://freddychannarvaez.com';

const gridSize = 10;
const totalMines = 10;

const timeLimit = 99;

const socialMediaLinks = [
  {
    name: 'github',
    link: 'https://github.com/freddychannarvaez',
    logo: githubLogo
  },
  {
    name: 'linkedin',
    link: 'https://www.linkedin.com/in/freddy-chan-narvaez/',
    logo: linkedinLogo
  },
  {
    name: 'gmail',
    link: 'mailto:freddychannarvaez@gmail.com',
    logo: gmailLogo
  }
]

function App() {
  
  const [isGameOver, setIsGameOver] = useState(false)
  const [isGameResetted, setIsGameResetted] = useState(false)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [hasWonGame, setHasWonGame] = useState(false)
  const [validateLastTile, setValidateLastTile] = useState(false)
  const [secondsPlayed, setSecondsPlayed] = useState(0)
  const [flagsLeft, setFlagsLeft] = useState(totalMines)
  const [flagsUsed, setFlagsUsed] = useState([])
  const [tilesToReveal, setTilesToReveal] = useState([])
  let { newMines: firstMines, newGrid: firstGrid } = createMinesAndGrid(gridSize, totalMines)
  const [mines, setMines] = useState(firstMines)
  const [grid, setGrid] = useState(firstGrid)
  const [currentInterval, setCurrentInterval] = useState(null)

  const handleStartGame = () => {
    if (!isGameStarted) setIsGameStarted(true)
  }

  const handleEndGame = () => {
    setIsGameOver(true)
    setIsGameResetted(false)
    clearInterval(currentInterval)
  }

  const handleResetGame = () => {
    setIsGameOver(false)
    setIsGameResetted(true)
    setCurrentInterval(null)
    setIsGameStarted(false)
    setHasWonGame(false)
  }

  const handleRevealTile = (index) => {
    if (mines.includes(index)) return
    const neighbourTiles = getNeighbourTiles(gridSize, index)
    setTilesToReveal(
      tilesToReveal => [...tilesToReveal,
      ...neighbourTiles.filter((x) => !tilesToReveal.includes(x))])
  }

  const handleFlagClick = (index, isFlagged) => {
    if (isFlagged) {
      setFlagsUsed([...flagsUsed.filter(flag => flag !== index)])
      setFlagsLeft(flagsLeft + 1)
    } else {
      setFlagsLeft(flagsLeft - 1)
      setFlagsUsed([...flagsUsed, index])
    }
  }

  const isGameWon = () => {
    return mines.every((x) => flagsUsed.includes(x))
  }

  const getTime = (startTime) => {
    const currentTime = new Date()
    const seconds = Math.floor((currentTime.getTime() - startTime.getTime()) / 1000)
    setSecondsPlayed(seconds)
    if (seconds >= timeLimit) {
      setSecondsPlayed(0)
      handleEndGame()
    }
  }

  useEffect(() => {
    if (!isGameStarted) return
    const startTime = new Date()
    setCurrentInterval(setInterval(() => getTime(startTime), 1000))
  }, [isGameStarted])

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
      setValidateLastTile(false)
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
        handleEndGame()
        setHasWonGame(true)
      }
    }
  }, [validateLastTile])

 // FIXME: Win also if you click on the last tile
 // FIXME: After win reveal all tiles
  return (
    <>
      <h1>Minesweeper clone</h1>
      <p>Difficulty: Normal</p>
      <p>Time: {timeLimit} seconds</p>
      <div className='control'>
        { /* FIXME: Make countdown timer */
          <div className='indicator'>
            <span className='secondsPlayed'>{secondsPlayed}</span>
            <span className='text'>seconds</span> 
          </div>
        }
        {
          <button className='emoji-button' onClick={handleResetGame}>{hasWonGame ? '😎' : isGameOver ? '☹️' : '🙂'}</button>
        }
        {
          <div className='indicator'>
            <span className='flagsLeft'>{flagsLeft}</span>
            <span className='text'>mines left</span> 
          </div>
        }
      </div>
      <div className={`grid ${(isGameOver && !isGameResetted) ? 'gameOver' : ''}`}>
        {
          grid.map((_, index) => 
            <Tile key={index} index={index} gridSize={gridSize} minesArray={mines}
                  tilesToReveal={tilesToReveal} revealMine={isGameOver} availableFlags={flagsLeft}
                  hasMine={grid[index]} hasGameStarted={handleStartGame} hasGameEnded={isGameOver}
                  onEndGame={handleEndGame} onResetGame={isGameResetted}
                  onFlagTile={handleFlagClick} onRevealTile={handleRevealTile}/>)
        }
        {
          isGameOver && <h3>{ hasWonGame ? 'You win' : 'Game is over'}!!</h3>
        }
      </div>

      <div className='project-description'>
        <h2>Project description</h2>
        <p>This is a minesweeper clone made with ReactJS. It is a simple game where you have to reveal all the tiles that are hidden by mines. The game is over when all the tiles are revealed or when you run out of flags. You can find more information<a href={githubRepo} target='_blank'> here.</a></p>
        <div className='social-info'>
          {
            socialMediaLinks.map((link, index) => 
              <a className='social-link' key={index} href={link.link} target='_blank'>
                <img src={link.logo}></img> 
              </a>
            )
          }
        </div>
        <p className='made-by'>Made with ❤️ by <a href={portfolio}>Freddy Chan Narváez</a></p>
      </div>
    </>
  )
}

export default App

