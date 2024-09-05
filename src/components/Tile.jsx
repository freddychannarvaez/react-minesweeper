/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import mineLogo from '../assets/mine.svg'
import flagLogo from '../assets/flag.svg'
import { calculateNeighbourMines } from "../services/calculateNeighbourMines"


export function Tile({index, hasMine, gridSize, minesArray,
  endGame, resetGame, flagTile, revealTile, tilesToReveal,
  revealMine, availableFlags}) {

  const [isClicked, setIsClicked] = useState(false)
  const [isFlagged, setIsFlagged] = useState(false)
  const [neighbourMines, setNeighbourMines] =
    useState(calculateNeighbourMines(gridSize, index, minesArray))

  const onClickTile = (index) => {
    if (isClicked) return
    if (isFlagged) return
    setIsClicked(true)
    const neighbourMines = calculateNeighbourMines(gridSize, index, minesArray)
    setNeighbourMines(neighbourMines)
    if (neighbourMines == 0) revealTile(index)
  }

  const onFlagTile = (e) => {
    e.preventDefault()
    if (availableFlags == 0 || isClicked) return
    flagTile(index, isFlagged)
    setIsFlagged(!isFlagged)
  }

  useEffect(() => {
    if (hasMine && isClicked) {
      endGame()
    }
  }, [isClicked])

  useEffect(() => {
    if (resetGame) {
      setIsClicked(false)
      setIsFlagged(false)
      setNeighbourMines(calculateNeighbourMines(gridSize, index, minesArray))
    }
  }, [resetGame])

  useEffect(() => {
    if (tilesToReveal.includes(index) 
          && !minesArray.includes(index) && !isClicked) { 
      onClickTile(index)
    }
  }, [tilesToReveal])

  useEffect(() => {
    if (revealMine && hasMine && !isFlagged) {
      setIsClicked(true)
    }
  }, [revealMine])

  return (
    <div className={`tile ${isClicked ? 'clicked' : 'clean' }`}
      onClick={() => onClickTile(index)}
      onContextMenu={(e) => onFlagTile(e)}> 
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