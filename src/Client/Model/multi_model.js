let multiModel, socket;

class MultiModel {
  constructor() {
    this.model = new Model();
    this.otherPlayer;
    this.players = {};
  }
  getState = () => this.model.getState();

  keyPress = (key) => {
    this.model.keyPress(key);
    display(this.getState(), this.otherPlayer);
  };

  start = () => {
    socket = io.connect("http://localhost:3000");
    let data = this.model.getState();
    socket.emit("start", data);

    this.model.start(setInterval(this.tick, 1000));
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
    let data = this.model.getState();
    display(data, this.otherPlayer);
    socket.emit("update", data);
  };
}

const newGame = () => {
  multiModel = new MultiModel();
  multiModel.start();
  socket.on("heartbeat", function (data) {
    multiModel.players = data;
    Object.keys(multiModel.players).forEach(function (key) {
      if (key !== socket) {
        multiModel.otherPlayer = multiModel.players[key];
      }
    });
  });
};

const keyPress = (key) => {
  if (multiModel && key !== "pause") {
    multiModel.keyPress(key);
  }
};
