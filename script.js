// Gameboard object
const Gameboard = (() => {

    let boardArray = Array(9).fill(null);

    const getBoard = () => boardArray;
  
    return {
      getBoard,
    };
})();
  