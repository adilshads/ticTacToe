console.log("Script loaded successfully.");

window.addEventListener("DOMContentLoaded", () => {
  // Display input fields and button
  document.getElementById("player1Name").classList.remove("hidden");
  document.getElementById("player2Name").classList.remove("hidden");
  document.getElementById("startBtn").classList.remove("hidden");
  
});



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
    return checkWin() || checkTie();
  };

  const resetGame = () => {
    gameboard.resetBoard();
    currentPlayer = player1;
    // Additional reset logic if needed.
  };

  const checkWin = () => {
    const board = gameboard.getBoard();
    
    // Define all possible winning combinations
    const winCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];
  
    for (const combination of winCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true; // We have a winner!
      }
    }
  
    return false; // No winner yet
  };
  
  
  const checkTie = () => {
    const board = gameboard.getBoard();
    return board.every(cell => cell !== null);
  };

  // Function to display the result on the webpage
  const displayResult = (result) => {
    const resultElement = document.querySelector(".result");
    resultElement.textContent = result;
  };

  const announceResult = () => {
    if (checkWin()) {
      const winner = getCurrentPlayer().getName();
      displayResult(`Congratulations! ${winner} wins!`);
    } else if (checkTie()) {
      displayResult("It's a tie!");
    }
  };

  return {
    setupGame,
    getCurrentPlayer,
    nextTurn,
    isGameOver,
    announceResult, // Include the function in the return object
    resetGame,
  };
})();


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
  const errorMessage = document.getElementById("errorMessage");


  if (player1Name !== "" && player2Name !== "") {

    // Display player names
    document.getElementById("player1NameDisplay").textContent = `Player 1: ${player1Name}`;
    document.getElementById("player2NameDisplay").textContent = `Player 2: ${player2Name}`;

    // Display player markers
    document.getElementById("player1MarkerDisplay").textContent = `${player1Name} chooses X`;
    document.getElementById("player2MarkerDisplay").textContent = `${player2Name} chooses O`;

    // Hide input fields
    document.getElementById("player1Name").classList.add("hidden");
    document.getElementById("player2Name").classList.add("hidden");
    startBtn.classList.add("hidden");

    // Hide the error message if it was previously displayed
    errorMessage.classList.add("hidden");
    
    Game.setupGame(player1Name, player2Name);
    Game.resetGame();
    updateBoardDisplay();
    updateResultDisplay("");
    renderBoard(); // Add this line to update the board display
  } else {
    errorMessage.classList.remove("hidden");
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
      Game.announceResult(); // Correct function call
    } else {
      // Switch to the next player's turn
      Game.nextTurn();
    }
  } else {
    console.log("Cell already occupied!");
  }
};

/*
module.exports = {
  Gameboard,
  setupGame,
  getCurrentPlayer,
  placeMarker,
  isGameOver,
  announceResult,
  resetGame,
};

*/