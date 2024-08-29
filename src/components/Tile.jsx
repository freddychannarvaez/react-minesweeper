import { useState } from "react"
import mineLogo from '../assets/mine.svg'


export function Tile({index, hasMine}) {

  const [isClicked, setIsClicked] = useState(false)

  return (
    <div className={`tile ${isClicked ? 'clicked' : 'clean' }`}
      onClick={() => setIsClicked(!isClicked)}> 
      {
        hasMine && isClicked && <img className={`hasMine`} src={mineLogo}/>
      }
      {!isClicked && index}
    </div>
  )

}