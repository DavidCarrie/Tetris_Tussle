/**
 * @module Multiplayer 12 Multiplayer Module
 * @brief Contains class and required functions to implement a multiplayer game for the user
 */
let multiModel,
  socket,
  countInterval,
  countNum = 3,
  globalState;

/**
 * @class MultiModel
 * @brief Contains data and required functions to implement a multiplayer game for the user
 */
class MultiModel {
  constructor(socket) {
    this.model = new Model();
    this.otherPlayer;
    this.socket = socket;
    this.roomId;
  }

  /**
   * @brief returns the gameState for the player
   * @returns
   */
  getState = () => {
    let state = this.model.getState();
    globalState = state;

    if (
      this.otherPlayer &&
      this.otherPlayer.endGame === true &&
      state.endGame === true
    ) {
      let data = { gameId: this.roomId };
      this.socket.emit("gameOver", data);
    }
    return state;
  };
  setRoomId = (id) => {
    this.roomId = id;
  };
  /**
   * @brief Processes player keypresses and updates display
   * @param {*} key Control pressed
   */
  keyPress = (key) => {
    if (!this.model.getEndGame()) {
      this.model.keyPress(key);
      let state = this.getState();
      let data = { ...state, gameId: this.roomId };
      display(state, this.otherPlayer);
      this.socket.emit("update", data);
    }
  };

  /**
   * @brief Starts the game
   */
  start = () => {
    this.model.start(setInterval(this.tick, 1000));
    let data = { ...this.getState(), gameId: this.roomId };
    this.socket.emit("start", data);
  };
  result = () => {
    let state = this.model.getState();
    if (this.otherPlayer) {
      if (state.score > this.otherPlayer.score) return 1;
      else if (state.score == this.otherPlayer.score) return 0;
      else return -1;
    }
  };

  /**
   * @brief Calculates and advances the game 1 tick(cycle).
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
    let state = this.getState();
    let data = { ...state, gameId: this.roomId };
    display(state, this.otherPlayer);
    this.socket.emit("update", data);
  };
}
const restart = () => {
  if (multiModel && multiModel.roomId) {
    newGame("restart", multiModel.roomId);
  } else {
    window.location.replace("./index.html");
  }
};
const newGame = (type = "", room = "") => {
  if (socket) {
    socket.disconnect();
  }
  socket = io.connect("http://localhost:3000");
  multiModel = new MultiModel(socket);
  if (type === "create") {
    socket.emit("createGame");
  } else if (type === "join") {
    let data = { playerName: "anon", gameId: room };
    multiModel.setRoomId(room);
    socket.emit("joinGame", data);
  } else if (type === "restart") {
    let data = { playerName: "anon", gameId: room };
    multiModel.setRoomId(room);
    socket.emit("playerRestart", data);
    restarting();
  }

  socket.on("newGameCreated", function (data) {
    multiModel.setRoomId(data.gameId);
    waiting(data.gameId);
  });

  socket.on("beginNewGame", function () {
    joined();
    countInterval = setInterval(count, 1000);
  });

  socket.on("error", function () {
    joinError();
  });

  function count() {
    countdown(countNum--);
    if (countNum === 0) {
      clearInterval(countInterval);
      multiModel.start();
    }
  }

  socket.on("heartbeat", function (data) {
    if (globalState && globalState.endGame === true) {
      display(globalState, data);
    }

    multiModel.otherPlayer = data;
  });

  socket.on("gameOver", () => {
    socket.emit("gameOverConfirm", { gameId: multiModel.roomId });
    countNum = 3;
    let result = multiModel.result();
    endScreen(result, globalState.score);
  });

  socket.on("waiting", (data) => {
    waiting(data.gameId);
  });
};
/**
 * @brief Handles player game controls
 * @param {*} key Button pressed
 */
const keyPress = (key) => {
  if (multiModel && socket && key !== "pause" && countNum === 0) {
    multiModel.keyPress(key);
  }
};
