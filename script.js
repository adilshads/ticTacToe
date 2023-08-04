console.log("Script loaded successfully.");




const Gameboard = (() => {
    let boardArray = Array(9).fill(null);
  
    const getBoard = () => boardArray;
  
    const isCellEmpty = (row, col) => boardArray[row * 3 + col] === null;
  
    const placeMarker = (row, col, marker) => {
      if (isCellEmpty(row, col)) {
        boardArray[row * 3 + col] = marker;
        return true; 
      }
      return false; 
    };
  
    const resetBoard = () => {
      boardArray = Array(9).fill(null);
    };
  
    return {
      getBoard,
      isCellEmpty,
      placeMarker,
      resetBoard,
    };
  })();


// Outside the Gameboard object (test code)

// Test the getBoard method
const boardState = Gameboard.getBoard();
console.log(boardState); // It should output an array with 9 elements filled with null.

// Test the isCellEmpty method
console.log(Gameboard.isCellEmpty(1, 1)); // It should return true (cell at row 1, column 1 is empty).

// Test the placeMarker method
const markerPlaced = Gameboard.placeMarker(0, 0, "X");
console.log(markerPlaced); // It should return true (placement successful).
console.log(Gameboard.getBoard()); // The board should show "X" in the top-left corner.

// Test resetting the board
Gameboard.resetBoard();
console.log(Gameboard.getBoard()); // The board should be reset to an array with 9 elements filled with null.





// Create the Player factory
const createPlayer = (name, marker) => {
  const playerName = name;
  const playerMarker = marker;

  const getName = () => playerName;
  const getMarker = () => playerMarker;

  return {
    getName,
    getMarker,
  };
};

// Test usage of the Player factory
const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");

console.log(player1.getName()); // It should output "Player 1".
console.log(player1.getMarker()); // It should output "X".

console.log(player2.getName()); // It should output "Player 2".
console.log(player2.getMarker()); // It should output "O".






// Game module
const Game = (() => {
  let player1;
  let player2;
  let gameboard;
  let currentPlayer;

  // Public method to set up the game
  const setupGame = (namePlayer1, namePlayer2) => {

    player1 = createPlayer(namePlayer1, "X");
    player2 = createPlayer(namePlayer2, "O");

    gameboard = Gameboard;

    currentPlayer = player1;
  };

  const getCurrentPlayer = () => currentPlayer;

  const nextTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  // Public method to check if the game is over (win or tie)
  const isGameOver = () => {
    const board = gameboard.getBoard();
    // Add game-over condition check logic here (Step 7).
  };

  const announceResult = () => {
    // Display a message congratulating the winning player or announcing a tie (Step 8).
  };

  const resetGame = () => {
    gameboard.resetBoard();
    currentPlayer = player1;
    // Additional reset logic if needed.
  };

  return {
    setupGame,
    getCurrentPlayer,
    nextTurn,
    isGameOver,
    announceResult,
    resetGame,
  };
})();

/*
// Export the Game module functions for testing purposes
module.exports = {
  Gameboard,
  setupGame: Game.setupGame,
  getCurrentPlayer: Game.getCurrentPlayer,
  nextTurn: Game.nextTurn,
  isGameOver: Game.isGameOver,
  announceResult: Game.announceResult,
  resetGame: Game.resetGame,
};
*/

// Render the Gameboard
const updateBoardDisplay = () => {
  const cells = document.querySelectorAll(".cell");
  const board = Gameboard.getBoard();
  cells.forEach((cell, index) => {
    cell.textContent = board[index] || ""; // Show player's marker or empty string
  });
};

const renderBoard = () => {
  const cells = document.querySelectorAll('.cell');
  const board = Gameboard.getBoard();

  cells.forEach((cell, index) => {
    cell.textContent = board[index] || ''; // Show player's marker or empty string
  });
};



// Render the result message
const updateResultDisplay = (message) => {
  const resultElement = document.querySelector(".result");
  resultElement.textContent = message;
};

// Event listener for the "Start Game" button
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
  console.log("Start Game button clicked!");

  const player1Name = document.getElementById("player1Name").value.trim();
  const player2Name = document.getElementById("player2Name").value.trim();

  if (player1Name !== "" && player2Name !== "") {
    Game.setupGame(player1Name, player2Name);
    Game.resetGame();
    updateBoardDisplay();
    updateResultDisplay("");
    renderBoard(); // Add this line to update the board display
  } else {
    alert("Please enter names for both players.");
  }
});


// Render the initial game board display
renderBoard();

// Allow players to add marks

// Event listener for cell clicks
const cells = document.querySelectorAll(".cell");
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    console.log("Cell clicked:", index);
    handleCellClick(index);
  });
});


// Function to handle cell clicks
const handleCellClick = (cellIndex) => {
  console.log("Cell clicked:", cellIndex);

  if (Gameboard.isCellEmpty(Math.floor(cellIndex / 3), cellIndex % 3)) {
    const currentPlayer = Game.getCurrentPlayer();
    const marker = currentPlayer.getMarker();

    // Place the marker on the board
    Gameboard.placeMarker(Math.floor(cellIndex / 3), cellIndex % 3, marker);

    // Update the board display
    updateBoardDisplay();

    // Check if the game is over
    if (Game.isGameOver()) {
      // Display the result
      announceResult();
    } else {
      // Switch to the next player's turn
      Game.nextTurn();
    }
  } else {
    console.log("Cell already occupied!");
  }
};
