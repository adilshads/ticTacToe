console.log("Script loaded successfully.");

window.addEventListener("DOMContentLoaded", () => {
  // Display input fields and button
  document.getElementById("player1Name").classList.remove("hidden");
  document.getElementById("player2Name").classList.remove("hidden");
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("resetBtn").classList.remove("hidden"); // Add this line
});

// Define the Gameboard module
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

// Define the updatePlayerNames function
const updatePlayerNames = (player1Name, player2Name) => {
  const player1NameDisplay = document.getElementById("player1NameDisplay");
  const player2NameDisplay = document.getElementById("player2NameDisplay");

  player1NameDisplay.textContent = `Player 1: ${player1Name}`;
  player2NameDisplay.textContent = `Player 2: ${player2Name}`;
};

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

// Define the Game module
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
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
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
    return board.every((cell) => cell !== null);
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

// Function to render the initial game board display
const renderBoard = () => {
  const cells = document.querySelectorAll(".cell");
  const board = Gameboard.getBoard();
  cells.forEach((cell, index) => {
    cell.textContent = board[index] || ""; // Show player's marker or empty string
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

    // Hide input fields
    document.getElementById("player1Name").classList.add("hidden");
    document.getElementById("player2Name").classList.add("hidden");
    startBtn.classList.add("hidden");

    // Hide the error message if it was previously displayed
    errorMessage.classList.add("hidden");

    Game.setupGame(player1Name, player2Name);
    updatePlayerNames(player1Name, player2Name);
    Game.resetGame();
    updateBoardDisplay();
    updateResultDisplay("");
    renderBoard(); // Add this line to update the board display
  } else {
    errorMessage.classList.remove("hidden");
  }
});

// Reset Button
const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {
  // Reset the game logic and update the display
  document.getElementById("player1Name").classList.remove("hidden");
  document.getElementById("player2Name").classList.remove("hidden");
  document.getElementById("startBtn").classList.remove("hidden");

  Game.resetGame();
  updateBoardDisplay();
  updateResultDisplay("");
  renderBoard();
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
  if (!Game.isGameOver()) {
    if (Gameboard.isCellEmpty(Math.floor(cellIndex / 3), cellIndex % 3)) {
      const currentPlayer = Game.getCurrentPlayer();
      const marker = currentPlayer.getMarker();

      Gameboard.placeMarker(Math.floor(cellIndex / 3), cellIndex % 3, marker);
      updateBoardDisplay();

      if (Game.isGameOver()) {
        Game.announceResult();
      } else {
        Game.nextTurn();
        
        if (aiCheckboxElem.checked && Game.getCurrentPlayer() === aiPlayer) {
          console.log("AI's turn, calling makeAIMove"); // Add this log
          makeAIMove();
        }
      }
    } else {
      console.log("Cell already occupied!");
    }
  }
};


// // Define the AI checkbox element
// const aiCheckboxElem = document.getElementById("activateAI");

// // Define the AI player
// let aiPlayer;

// // Function to create the AI player
// const createAIPlayer = () => {
//   aiPlayer = createPlayer("AI", "O");
// };

// // Function to make AI move
// const makeAIMove = () => {
//   console.log("AI is making a move"); // Check if this message appears
//   const board = Gameboard.getBoard();
//   const emptyCells = [];

//   for (let i = 0; i < board.length; i++) {
//     if (board[i] === null) {
//       emptyCells.push(i);
//     }
//   }

//   console.log("Empty cells:", emptyCells); // Check if this displays the list of empty cells

//   if (emptyCells.length > 0) {
//     const randomIndex = Math.floor(Math.random() * emptyCells.length);
//     const randomCell = emptyCells[randomIndex];
//     console.log("AI is choosing cell:", randomCell); // Check which cell the AI is choosing
//     const aiMarker = aiPlayer.getMarker();
//     Gameboard.placeMarker(Math.floor(randomCell / 3), randomCell % 3, aiMarker);
//     updateBoardDisplay();
//   }
// };


// Add event listener to the AI checkbox
// aiCheckboxElem.addEventListener("change", () => {
//   if (aiCheckboxElem.checked) {
//     createAIPlayer();
//     console.log("AI activated"); // Add this log
//   } else {
//     aiPlayer = undefined;
//     console.log("AI deactivated"); // Add this log
//   }
// });




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