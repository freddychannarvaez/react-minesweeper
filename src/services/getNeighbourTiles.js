export function getNeighbourTiles(gridSize, tileIndex) {
  const leftBorder = tileIndex % gridSize
  const rightBorder = gridSize - leftBorder - 1
  const upBorder = Math.floor(tileIndex / gridSize)
  const downBorder = gridSize - upBorder - 1

  // Create available tiles array
  const availableTiles = [];
  // UL
  if (leftBorder != 0 && upBorder != 0) { availableTiles.push(tileIndex - gridSize - 1) }  
  // UP
  if (upBorder != 0) { availableTiles.push(tileIndex - gridSize) }
  // UR
  if (rightBorder != 0 && upBorder != 0) { availableTiles.push(tileIndex - gridSize + 1) }
  // LE
  if (leftBorder != 0) { availableTiles.push(tileIndex - 1) }
  // RI
  if (rightBorder != 0) { availableTiles.push(tileIndex + 1) }
  // DL
  if (leftBorder != 0 && downBorder != 0) { availableTiles.push(tileIndex + gridSize - 1) }
  // DW
  if (downBorder != 0) { availableTiles.push(tileIndex + gridSize) }
  // DR
  if (rightBorder != 0 && downBorder != 0) { availableTiles.push(tileIndex + gridSize + 1) }

  return availableTiles
}

// First/Last Row/Column
// FR, FC, LR, LC

// Coordinates:
// UL - UP - UR
// LE - XX - RI
// DL - DW - DR

// UL - Disabled if FC/FR
// UP - Disabled if FR
// UR - Disabled if FR/LC
// LE - Disabled if FC
// XX - 
// RI - Disabled if LC
// DL - Disabled if FC/LR
// DW - Disabled if LR
// DR - Disabled if LR/LC