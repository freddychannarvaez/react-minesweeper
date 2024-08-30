/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import mineLogo from '../assets/mine.svg'
import flagLogo from '../assets/flag.svg'


export function Tile({index, hasMine, endGame, resetGame, 
  flagTile}) {

  const [isClicked, setIsClicked] = useState(false)
  const [isFlagged, setIsFlagged] = useState(false)

  const onFlagTile = (e) => {
    e.preventDefault()
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
    }
  }, [resetGame])

  return (
    <div className={`tile ${isClicked ? 'clicked' : 'clean' }`}
      onClick={() => setIsClicked(!isClicked)}
      onContextMenu={(e) => onFlagTile(e)}> 
      {
        hasMine && isClicked && <img className={`hasMine`} src={mineLogo}/>
      }
      {
        isFlagged && <img className={`flagged`} src={flagLogo}/>
      }
      {!isClicked && !isFlagged && index}
    </div>
  )

}