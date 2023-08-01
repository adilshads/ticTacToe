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
