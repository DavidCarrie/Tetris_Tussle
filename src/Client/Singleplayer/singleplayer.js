const Model = require('../Model/Model.js');
/**
 * @module Singleplayer 11 Singleplayer Module
 * @brief Contains required functions to implement a singleplayer game for the user
 */

class Singleplayer {
  static model;

/**
 * @brief Initializes a new game
 * 
 */
static newGame = () => {
  this.model = new Model();
  this.model.start(setInterval(this.tick, 1000));
};

/**
 * @brief Calculates and advances the game 1 tick (cycle).
 * 
 */
 static tick = () => {
  if (!this.model.board.checkCollision(this.model.tetromino, [0, 1], 0)) {
    this.model.tetromino.gameTick();
  } else {
    this.model.score += this.model.board.addToBoard(this.model.tetromino);
    this.model.tetromino = this.model.queue.shift();
    this.model.queue.push(new Tetromino());
    this.model.tetromino.setShadow(this.model.board.hardDrop(this.model.tetromino));
  }
  let state = this.model.getState();
  display(state);
};
/**
   * @brief Handles player game controls
   * @param {*} key Button pressed
   */
 static keyPress = (key) => {
  if (this.model) {
    this.model.keyPress(key);
    let state = this.model.getState();
    display(state);
  }
};
}

module.exports = Singleplayer;





/*module.exports = {
  keypress: function() {},
  newGame: function() {},
  model
};*/


