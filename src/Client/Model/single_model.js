/**
 * @module Singleplayer 11 Singleplayer Module
 * @brief Contains class and required functions to implement a singleplayer game for the user
 */
let model;

/**
 * @brief Initializes a new game
 * 
 */
const newGame = () => {
  model = new Model();
  model.start(setInterval(tick, 1000));
};

/**
 * @brief Calculates and advances the game 1 tick (cycle).
 * 
 */
const tick = () => {
  if (!model.board.checkCollision(model.tetromino, [0, 1], 0)) {
    model.tetromino.gameTick();
  } else {
    model.score += model.board.addToBoard(model.tetromino);
    model.tetromino = model.queue.shift();
    model.queue.push(new Tetromino());
    model.tetromino.setShadow(model.board.hardDrop(model.tetromino));
  }
  let state = model.getState();
  display(state);
};
/**
   * @brief Handles player game controls
   * @param {*} key Button pressed
   */
const keyPress = (key) => {
  if (model) {
    model.keyPress(key);
    let state = model.getState();
    display(state);
  }
};
