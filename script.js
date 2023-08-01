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

