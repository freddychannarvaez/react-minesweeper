 # Minesweeper Clone

 ## Description
 Clone of the classic Minesweeper game using React Hooks. Project development is divided in the next secions:
 
 ### Create tile component
 * [x] Should create component
 * [x] Should have unclicked style
 * [x] Should have clicked style

 ### Create tile logic
 * [x] Should be empty or have a mine
 * [ ] Should display number of neighbour mines

 ### Create game basic logic
 * [ ] Should be able to reset game
 * [ ] Should be able to flag tiles
 * [ ] Should open neighbour tiles if empty, after tile is clicked
 * [ ] Should win game if all flags are used and put into every mine
 
 ### Create difficulty levels
 * [ ] Normal - 10x10 grid with 10 mines 
 * [ ] Hard - 30x30 grid with 30 tiles
 * [ ] Expert - 50x50 with 50 tiles

 ## Installing
  To clone the repo:
 ```
 cd project_folder
 git clone https://github.com/freddychannarvaez/react-minesweeper.git
 ```
 To install dependencies inside project_folder:
 ```
 npm install
 ```
 To run the project
 ```
 npm run dev
 ```

 ## Authors
 [Freddy Chan Narvaez](freddychannarvaez.com)

--------------------
TODO: Steps to complete project
  - Create tile component ✅
  - Create tile logic
    - If its empty or has a mine ✅
    - Should display a number if its next to a mine ✅
  - Create grid ✅
  - Create game logic
    - Be able to reset game ✅
    - Win game if there is one tile left ✅
    - If click on empty tile, open neighbour tiles ✅
  - Create difficulty levels
    - One tile with 4x4 grid
    - Two tiles with 6x6 grid
    - Three tiles with 8x8 grid

  First/Last Row/Column
  FR, FC, LR, LC

  Coordinates:
  UL - UP - UR
  LE - XX - RI
  DL - DW - DR

  UL - Disabled if FC/FR
  UP - Disabled if FR
  UR - Disabled if FR/LC
  LE - Disabled if FC
  XX - 
  RI - Disabled if LC
  DL - Disabled if FC/LR
  DW - Disabled if LR
  DR - Disabled if LR/LC