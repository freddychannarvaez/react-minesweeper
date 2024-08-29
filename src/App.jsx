import './App.scss'
import { Tile } from './components/Tile.jsx'

const grid = Array(9).fill(false)
console.log("🚀 ~ grid:", grid)
const mine = Math.floor(Math.random() * grid.length)
grid[mine] = true
console.log("🚀 ~ mine:", mine)

function App() {
 
  return (
    <>
      <h1>Minesweeper game</h1>
      <div className={`grid`}>
        {
          grid.map((_, index) => 
            <Tile key={index} index={index} hasMine={grid[index]}/>)
        }
      </div>
      
    </>
  )
}

export default App

