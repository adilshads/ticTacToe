# ticTacToe
Tic Tac Toe game you can play in your browser!

## Installation

1. Clone the repository: `git clone git@github.com:adilshads/ticTacToe.git`
2. Open index.html file in web browser.
3. Or click following link: https://adilshads.github.io/ticTacToe/

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


## Configuration

Explain any configuration options and how to set them. Mention environment variables or configuration files.

## Contributing

We welcome contributions! Please follow the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md) to contribute to the project.

## License

This project is licensed under the [Your License Name] - see the [LICENSE.md](LICENSE.md) file for details.

## Credits

- List contributors or libraries your project depends on.
- Mention any external resources or references.

## Documentation

For more detailed information, refer to the [documentation](docs/).

## Testing

Describe how to run tests for your project and include any relevant information about testing frameworks used.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for details on the version history and changes made in each version.

## Contact Information

- Your Name
- Email: your.email@example.com
- Twitter: [@your_twitter_handle](https://twitter.com/your_twitter_handle)

## Badges

Add relevant badges for build status, code coverage, or other metrics.

[![Build Status](...)](...)
[![Code Coverage](...)](...)

```

Feel free to adapt and customize this template based on the specific needs and conventions of your project.