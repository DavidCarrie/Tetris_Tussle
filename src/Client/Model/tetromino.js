/**
 * @module Tetromino 8 Tetromino Module
 * @brief Implements the data structure and functions for Tetromino peices
 */
const SHAPES = [
  [0x0f00, 0x4444, 0x0f00, 0x4444], // 'I'
  [0xcc00, 0xcc00, 0xcc00, 0xcc00], // 'O'
  [0x4e00, 0x4640, 0x0e40, 0x4c40], // 'T'
  [0x8e00, 0xc880, 0xe200, 0x44c0], // 'J'
  [0x2e00, 0x88c0, 0xe800, 0xc440], // 'L'
  [0x6c00, 0x8c40, 0x6c00, 0x8c40], // 'S'
  [0xc600, 0x4c80, 0xc600, 0x4c80], // 'Z'
];

/**
 * @class Tetromino
 * @brief Contains model and functions to implement Tetromino pieces
 */
class Tetromino {
  /**
   * @brief Constructor to create a random tetromino
   * @returns Model object of created tetromino
   */
  constructor() {
    this.shape = Math.floor(Math.random() * 7);
    this.state = SHAPES[this.shape];
    (this.rotation = 0), (this.shadow = 0), (this.position = [3, 0]);
  }
  /**
   * @brief Returns the position of this Tetromino
   * @returns Poisition(x, y coordinates) of Tetromino
   */
  getPosition() {
    return this.position;
  }
  /**
   * @brief Returns the shape of this Tetromino
   * @returns Integer 0-6 representing a shape
   */
  getShape() {
    return this.shape;
  }
  /**
   * @brief Returns the State of the Tetromino
   * @returns Hex representation of the state
   */
  getState() {
    return this.state;
  }
  /**
   * @brief Returns the current rotation of this Tetromino. value * 90 degrees = rotation.
   * @returns Integer representing rotation.
   */
  getRotation() {
    return this.rotation;
  }
  /**
   * @brief Rotates the Tetromino by a given amount
   * @param {*} amount Each unit of amount is 90 degrees of rotation
   */
  rotate(amount) {
    this.rotation = (this.rotation + amount) % 4;
  }
  /**
   * @brief returns the location of the shadow set by this Tetromino
   * @returns Position (x, y coordingates) of the shadow
   */
  getShadow() {
    return this.shadow;
  }
  /**
   * @brief Sets the shadow below the Tetromino on the board.
   * @param {*} shadow Y offset of the Tetromino
   */
  setShadow(shadow) {
    this.shadow = shadow + this.position[1];
  }
  /**
   * @brief Calculates the new position of the Tetromino after a gameTick
   */
  gameTick() {
    this.position[1] += 1;
  }

  //move the current tetromino if allowed
  /**
   * @brief Attempts to move the Tetromino in the indicated direction
   * @param {*} direction String reprsenting direction to be moved "down", "left" or "right"
   */
  move(direction) {
    if (direction === "down") this.position[1] += 1;
    else if (direction === "left") this.position[0] -= 1;
    else if (direction === "right") this.position[0] += 1;
  }

  //hard drop
  /**
   * @brief Drops the Tetromino vertically
   * @param {*} y The distance to fall
   */
  drop(y) {
    this.position[1] += y;
  }
}
module.exports = Tetromino
