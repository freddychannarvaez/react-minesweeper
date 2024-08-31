import { getNeighbourTiles } from "./getNeighbourTiles";

export function calculateNeighbourMines(gridSize, tileIndex, minesArray) {
  const neighbourTiles = getNeighbourTiles(gridSize, tileIndex)

  return neighbourTiles.filter(neighbourTile => minesArray.includes(neighbourTile)).length
}
