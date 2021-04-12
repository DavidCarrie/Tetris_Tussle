// import { Model } from "../Model/Model.js";
/**
 * @module Singleplayer 11 Singleplayer Module
 * @brief Contains required functions to implement a singleplayer game for the user
 */

class Singleplayer {
  constructor() {
    this.model;
    this.display;
  }

  /**
   * @brief Initializes a new game
   *
   */
  newGame = () => {
    this.model = new Model();
    this.model.start(setInterval(this.tick, 1000));
  };

  setDisplay = (displayFunc) => {
    this.display = displayFunc;
  };

  /**
   * @brief Calculates and advances the game 1 tick (cycle).
   *
   */
  tick = () => {
    if (!this.model.board.checkCollision(this.model.tetromino, [0, 1], 0)) {
      this.model.tetromino.gameTick();
    } else {
      this.model.score += this.model.board.addToBoard(this.model.tetromino);
      this.model.tetromino = this.model.queue.shift();
      this.model.queue.push(new Tetromino());
      this.model.tetromino.setShadow(
        this.model.board.hardDrop(this.model.tetromino)
      );
    }
    let state = this.model.getState();
    this.display(state);
  };

  /**
   * @brief Handles player game controls
   * @param {*} key Button pressed
   */
  keyPress = (key) => {
    if (this.model) {
      this.model.keyPress(key);
      let state = this.model.getState();
      this.display(state);
    }
  };
}

// module.exports = Singleplayer;
