 # Minesweeper Clone

 ## Description
 Clone of the classic Minesweeper game using React Hooks. Project development is divided in the next secions:
 
 ### Create tile component
 * [x] Should create component
 * [x] Should have unclicked style
 * [x] Should have clicked style

 ### Create tile logic
 * [x] Should be empty or have a mine
 * [x] Should display number of neighbour mines

 ### Create game basic logic
 * [x] Should lose game if click on mined tile
 * [x] Should create controls to play and reset game
 * [x] Should be able to reset game
 * [x] Should create new mines array after reset game
 * [ ] Should create timer to show time played
 * [x] Should be able to flag tiles
 * [x] Should create flags counter to show how many flags are used
 * [x] Should only be able to use as many flags as mines
 * [x] Should open neighbour tiles if empty, after tile is clicked
 * [x] Should win game if all flags are used and put into every mine
 
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