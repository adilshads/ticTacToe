# ticTacToe
Tic Tac Toe game you can play in your browser!

## Installation

1. Clone the repository: `git clone git@github.com:adilshads/ticTacToe.git`
2. Open index.html file in web browser.
3. Or click following link: https://adilshads.github.io/ticTacToe/

## Instructions

1. Fill out names of Player 1 and 2. 
2. Click "Start Game". 
3. 3 in a Row Wins
4. Click "Reset Game" to play again. 

## Usage

1. Gameboard Module
```javascript
// Define the Gameboard module
const Gameboard = (() => {
  // ... (code omitted for brevity)

  return {
    getBoard,
    isCellEmpty,
    placeMarker,
    resetBoard,
  };
})();
```
Explanation:
The `Gameboard` module is responsible for managing the game board. It provides functions like `getBoard` to retrieve the current state of the board, `isCellEmpty` to check if a cell is unoccupied, `placeMarker` to mark a cell with a player's marker, and `resetBoard` to reset the entire game board.

2. Player Factory
```javascript
// Create the Player factory
const createPlayer = (name, marker) => {
  // ... (code omitted for brevity)

  return {
    getName,
    getMarker,
  };
};
```
Explanation:
The `createPlayer` function is a factory function for creating player objects. It takes a name and marker as parameters and returns a player object with `getName` and `getMarker` methods to access the player's name and marker.

3. Game Module
```javascript
// Define the Game module
const Game = (() => {
  // ... (code omitted for brevity)

  return {
    setupGame,
    getCurrentPlayer,
    nextTurn,
    isGameOver,
    announceResult, // Include the function in the return object
    resetGame,
  };
})();
```
Explanation:
The `Game` module manages the overall game logic. It includes functions like `setupGame` to initialize the game, `getCurrentPlayer` to get the current player, `nextTurn` to switch to the next player, `isGameOver` to check if the game is finished, `announceResult` to display the result on the webpage, and `resetGame` to reset the game.

4. Event Listeners for Start and Reset Buttons
```javascript
// Event listener for the "Start Game" button
const startBtn = document.getElementById("startBtn");
// ... (code omitted for brevity)

// Reset Button
const resetBtn = document.getElementById("resetBtn");
// ... (code omitted for brevity)
```
Explanation:
These event listeners listen for clicks on the "Start Game" and "Reset" buttons. When the "Start Game" button is clicked, it initializes the game based on player names. The "Reset" button allows the user to reset the game, clearing the board and starting a new game.

5. Handling Cell Clicks
```javascript
// Event listener for cell clicks
const cells = document.querySelectorAll(".cell");
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    // ... (code omitted for brevity)
    handleCellClick(index);
  });
});

// Function to handle cell clicks
const handleCellClick = (cellIndex) => {
  // ... (code omitted for brevity)
};
```
Explanation:
These code snippets handle the interaction when a player clicks on a cell in the game board. The `handleCellClick` function checks if the cell is empty, places the current player's marker, updates the display, checks for a game-over condition, and switches to the next player's turn.


## License

MIT License

Copyright (c) [2024] [Adil Shad]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Screenshots

[Clear Board](img/ticTacToeClear.png)
[Win Board](img/ticTacToeWin.png)
[Tie Board](img/ticTacToeTie.png)