/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import mineLogo from '../assets/mine.svg'
import flagLogo from '../assets/flag.svg'
import { calculateNeighbourMines } from "../services/calculateNeighbourMines"


export function Tile({index, gridSize, minesArray, tilesToReveal, availableFlags,
                      hasMine, hasGameStarted, hasGameEnded, hasWonGame,
                      onEndGame, onResetGame, onFlagTile, onRevealTile, onClickTile}) {

  const [isClicked, setIsClicked] = useState(false)
  const [isFlagged, setIsFlagged] = useState(false)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [neighbourMines, setNeighbourMines] =
    useState(calculateNeighbourMines(gridSize, index, minesArray))

  const handleClickTile = (index) => {
    if (!isGameStarted) {
      setIsGameStarted(true)
      hasGameStarted(true)
    }
    if (isClicked || isFlagged || hasGameEnded) return
    setIsClicked(true)
    onClickTile()
    const neighbourMines = calculateNeighbourMines(gridSize, index, minesArray)
    setNeighbourMines(neighbourMines)
    if (neighbourMines == 0) onRevealTile(index)
  }

  const handleFlagTile = (e) => {
    e.preventDefault()
    if (availableFlags == 0 || isClicked || hasGameEnded) return
    onFlagTile(index, isFlagged)
    setIsFlagged(!isFlagged)
  }

  useEffect(() => {
    if (hasMine && isClicked) {
      onEndGame()
    }
  }, [isClicked])

  useEffect(() => {
    if (onResetGame) {
      setIsClicked(false)
      setIsFlagged(false)
      setNeighbourMines(calculateNeighbourMines(gridSize, index, minesArray))
    }
  }, [onResetGame])

  useEffect(() => {
    if (tilesToReveal.includes(index) 
          && !minesArray.includes(index) && !isClicked) { 
      handleClickTile(index)
    }
  }, [tilesToReveal])

  useEffect(() => {
    if (hasWonGame && hasMine) { setIsFlagged(true); return }
    if (hasGameEnded && hasMine && !isFlagged) setIsClicked(true)
  }, [hasGameEnded])

  return (
    <div className={`tile ${isClicked ? 'clicked' : 'clean' }`}
      onClick={() => handleClickTile(index)}
      onContextMenu={(e) => handleFlagTile(e)}> 
      {
        hasMine && isClicked && <img className={`hasMine`} src={mineLogo}/>
      }
      {
        isFlagged && <img className={`flagged`} src={flagLogo}/>
      }
      {
        isClicked && !hasMine && neighbourMines != 0 &&
        <span className={`number a${neighbourMines}`}>{neighbourMines}</span>
      }
    </div>
  )

}