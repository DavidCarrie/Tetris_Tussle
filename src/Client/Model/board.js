/**
 * @module Board 9 Board Module
 * @brief Contains game state, and all functions needed to facilitate board functions
 */

const ROWS = 20;
const COLS = 10;
/**
 * @class Board
 * @brief Provides Board functionality
 * @details  Provides functionality to model a game of tetris.
 *
 */
class Board {
  /**
   * @brief Construct empty board.
   * @details Initializes an empty board available for a game.
   * @returns Model Object
   */
  constructor() {
    // initialize an empty elems
    this.elems = [];
    this.endGame = false;
    for (let i = 0; i < ROWS; ++i) {
      this.elems.push([]);
      for (let j = 0; j < COLS; ++j) {
        this.elems[i].push({ filled: 0, color: "#000000" });
      }
    }
  }

  /**
   * @brief Retrieve this board's stored elements (Tetrominos).
   * @returns List of elements (Tetrominos) stored in the board.
   */
  getElems() {
    return this.elems;
  }

  /**
   * @brief Add a tetromino to the board.
   * @param {*} tetromino Tetromino to add to the board.
   * @returns Integer representing the score calculated
   */
  addToBoard(tetromino) {
    if (this.endGame === true) return 0;
    let state = tetromino.getState();
    let index = tetromino.getRotation();
    let shape = tetromino.getShape();
    let x = tetromino.getPosition()[0];
    let y = tetromino.getPosition()[1];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (state[index] & (0x8000 >> (i * 4 + j))) {
          if (y + i >= 1 && x + j >= 0 && x + j < 20) {
            if (this.elems[y + i][x + j].filled === 1) {
              this.endGame = true;
            } else {
              this.elems[y + i][x + j].filled = 1;
              this.elems[y + i][x + j].color = shape;
            }
          } else if (y + i < 0) {
            this.endGame = true;
          }
        }
      }
    }
    if (!this.endGame) return this.clearLine();
    return 0;
  }

  /**
   * @brief Check if the tetromino given will collide with any board elements
   * @param {*} tetromino Tetromino to check for collision
   * @param {*} direction Direction the Tetromino will move
   * @param {*} rotation Current rotation of the Tetromino
   * @returns Boolean - True if a collision will occur
   */
  checkCollision(tetromino, direction, rotation) {
    let tx = tetromino.getPosition()[0] + direction[0];
    let ty = tetromino.getPosition()[1] + direction[1];
    let state = tetromino.getState();
    let index = (tetromino.getRotation() + rotation) % 4;

    for (let y = 0; y < 4; ++y) {
      for (let x = 0; x < 4; ++x) {
        if (state[index] & (0x8000 >> (y * 4 + x))) {
          if (ty + y > 19 || tx + x > 9 || tx + x < 0 || ty + y < 0) {
            return true;
          } else if (this.elems[ty + y][tx + x].filled === 1) {
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * @brief Accessor for endGame attribute
   * @returns boolean representing if the board is in the endGame state
   */
  getEndGame() {
    return this.endGame;
  }
  /**
   * @brief Drops the given Tetromino vertically onto the board
   * @param {*} tetromino Tetromino to be hard dropped
   * @returns Integer representing height (depth) where the tetromino lands
   */
  hardDrop(tetromino) {
    let y = 0;
    while (!this.checkCollision(tetromino, [0, y + 1], 0)) y++;
    return y;
  }

  /**
   * @brief Checks to see if any lines should be clered, clears them, and generates score
   * @returns Integer representing score gained
   */
  clearLine() {
    //return score added
    let score = 0;
    let multiplier = 1;
    for (let row = ROWS - 1; row >= 0; --row) {
      let rowFilled = true;
      for (let col = 0; col < COLS; ++col) {
        if (this.elems[row][col].filled == 0) {
          rowFilled = false;
          multiplier = 1;
          break;
        }
      }

      if (rowFilled) {
        score += 40 * multiplier;
        multiplier += 1;
        this.elems.splice(row, 1);
        this.elems.unshift([]);
        for (let j = 0; j < COLS; ++j) {
          this.elems[0].push({ filled: 0, color: "#000000" });
        }
        row += 1;
      }
    }
    return score;
  }
}
// module.exports = Board;
