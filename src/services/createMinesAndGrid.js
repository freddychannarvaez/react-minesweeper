
export function createMinesAndGrid(gridSize, minesNumber) {
  const total = Math.floor(gridSize * gridSize)
  const mines = []
  const grid = Array(total).fill(false)
  for (let i = 0; i < minesNumber; i++) {
    mines.push(validateMine(total, mines))
  }
  mines.map((x) => grid[x] = true)
  // return mines
  return { newGrid: grid, newMines: mines }
}

const validateMine = (total, existingMines) => {
  const mine = Math.floor(Math.random() * total)
  if (!existingMines.includes(mine)) {
    return mine
  } else {
    return validateMine(total, existingMines)
  }
}