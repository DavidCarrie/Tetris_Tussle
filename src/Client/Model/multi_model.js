/**
 * @module Multiplayer 12 Multiplayer Module
 * @brief Contains class and required functions to implement a multiplayer game for the user
 */
let multiModel, socket;

/**
 * @class MultiModel
 * @brief Contains data and required functions to implement a multiplayer game for the user
 */
class MultiModel {
  constructor(socket) {
    this.model = new Model();
    this.otherPlayer;
    this.players = {};
    this.socket = socket;
  }

  /**
   * @brief returns the gameState for the player
   */
  getState = () => this.model.getState();

  /**
   * @brief Processes player keypresses and updates display
   * @param {*} key Control pressed
   */
  keyPress = (key) => {
    this.model.keyPress(key);
    display(this.getState(), this.otherPlayer);
  };

  /**
   * @brief Starts the game
   */
  start = () => {
    this.model.start(setInterval(this.tick, 1000));
    let data = this.model.getState();
    this.socket.emit("start", data);
  };

  /**
   * @brief Calculates and advances the game 1 tick(cycle).
   */
  tick = () => {
    if (!this.model.board.checkCollision(this.model.tetromino, [0, 1], 0)) {
      this.model.tetromino.gameTick();
    } else {
      let temp = this.model.score;
      this.model.score += this.model.board.addToBoard(this.model.tetromino);
      if (
        this.model.tetromino.getPosition()[1] === 0 &&
        temp === this.model.score
      ) {
        clearInterval(this.model.interval);
        newGame();
      }
      this.model.tetromino = this.model.queue.shift();
      this.model.queue.push(new Tetromino());
      this.model.tetromino.setShadow(
        this.model.board.hardDrop(this.model.tetromino)
      );
    }
    let data = this.model.getState();
    display(data, this.otherPlayer);
    this.socket.emit("update", data);
  };
}
/**
 * @brief Sets up a new Game
 */
const newGame = () => {
  if (socket) {
    socket.disconnect();
  }
  socket = io.connect("http://localhost:3000");
  multiModel = new MultiModel(socket);
  multiModel.start();
  socket.on("heartbeat", function (data) {
    multiModel.players = data;
    Object.keys(multiModel.players).forEach(function (key) {
      //console.log("key", key, "socket", socket);
      if (key !== socket.id) {
        multiModel.otherPlayer = multiModel.players[key];
      }
    });
  });
};
/**
   * @brief Handles player game controls
   * @param {*} key Button pressed
   */
const keyPress = (key) => {
  if (multiModel && key !== "pause") {
    multiModel.keyPress(key);
  }
};
