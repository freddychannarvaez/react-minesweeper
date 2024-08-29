import { useState } from "react"

export function Tile({index}) {

  const [isClicked, setIsClicked] = useState(false)

  return (
    <div className={`tile ${isClicked ? 'clicked' : 'clean' }`}
      onClick={() => setIsClicked(!isClicked)}> 
      {index}
    </div>
  )

}