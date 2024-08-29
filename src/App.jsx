import './App.scss'
import { Tile } from './components/Tile.jsx'

const grid = Array(9).fill(false)
console.log("🚀 ~ grid:", grid)

function App() {
 
  return (
    <>
      <h1>Minesweeper game</h1>
      <div className={`grid`}>
        {
          grid.map((_, index) => <Tile key={index} index={index}/>)
        }
      </div>
      
    </>
  )
}

export default App

