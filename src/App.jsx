import './App.scss'
import { Tile } from './components/Tile.jsx'
import { createMine } from './services/createMine.js';

const gridSide = 8;
const totalMines = 8;

const grid = Array(gridSide * gridSide).fill(false)
const mines = createMine(gridSide, totalMines)
grid.map((_, y) => { if (mines.includes(y)) grid[y] = true })
console.log("🚀 ~ mines:", mines)

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

