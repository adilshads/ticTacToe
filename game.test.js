const { setupGame, getCurrentPlayer, nextTurn, isGameOver, announceResult, resetGame } = require('./script');
const Gameboard = require('./script').Gameboard;

// Test the game flow
test('Test the game flow', () => {
  // Test initial setup
  setupGame("Player 1", "Player 2");
  expect(getCurrentPlayer().getName()).toBe("Player 1");
  expect(getCurrentPlayer().getMarker()).toBe("X");
//  expect(isGameOver()).toBe(false);

  // Test placing markers
  const markerPlaced = Gameboard.placeMarker(0, 0, getCurrentPlayer().getMarker());
  expect(markerPlaced).toBe(true);
  expect(Gameboard.getBoard()).toEqual(['X', null, null, null, null, null, null, null, null]);

  nextTurn();
  expect(getCurrentPlayer().getName()).toBe("Player 2");
  expect(getCurrentPlayer().getMarker()).toBe("O");

  // Additional tests for placing markers on other cells can be added here

  // Test board reset
  resetGame();
//  expect(isGameOver()).toBe(false);
  expect(Gameboard.getBoard()).toEqual([null, null, null, null, null, null, null, null, null]);
});