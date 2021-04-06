let multiModel,
  socket,
  countInterval,
  countNum = 3;

class MultiModel {
  constructor(socket) {
    this.model = new Model();
    this.otherPlayer;
    this.socket = socket;
    this.roomId;
  }
  getState = () => this.model.getState();
  setRoomId = (id) => {
    this.roomId = id;
  };
  keyPress = (key) => {
    this.model.keyPress(key);
    display(this.getState(), this.otherPlayer);
  };
  start = () => {
    this.model.start(setInterval(this.tick, 1000));
    let data = { ...this.model.getState(), gameId: this.roomId };
    this.socket.emit("start", data);
  };

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
    let data = { ...this.model.getState(), gameId: this.roomId };
    display(data, this.otherPlayer);
    this.socket.emit("update", data);
  };
}

const newGame = (type = "", room = "") => {
  if (socket) {
    socket.disconnect();
  }
  socket = io.connect("http://localhost:3000");
  multiModel = new MultiModel(socket);
  if (type === "create") {
    socket.emit("createGame");
  }
  if (type === "join") {
    let data = { playerName: "anon", gameId: room };
    multiModel.setRoomId(room);
    socket.emit("joinGame", data);
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
    multiModel.otherPlayer = data;
    console.log(data);
  });

  socket.on("gameOver", () => {
    if (multiModel.getState().endGame === true) {
      //calculate who won and dc from socket
    }
  });
};

const keyPress = (key) => {
  if (multiModel && socket && key !== "pause") {
    multiModel.keyPress(key);
  }
};
