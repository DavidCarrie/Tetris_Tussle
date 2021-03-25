let model;
class Model {
  constructor() {
    this.board = new Board();
    this.tetromino = new Tetromino();
    this.tetromino.setShadow(this.board.hardDrop(this.tetromino));
    this.queue = [];
    for (let i = 0; i < 3; ++i) {
      this.queue.push(new Tetromino());
    }
    this.score = 0;
    this.paused = false;
    this.interval;
    this.held;
    this.previouslyHeld;
  }
  start() {
    this.interval = setInterval(tick, 1000);
  }

  getState() {
    return {
      board: this.board.elems,
      queue: this.queue.map((t) => [t.getState()[0], t.getShape()]),
      held:
        this.held != undefined
          ? [this.held.getState()[0], this.held.getShape()]
          : undefined,
      score: this.board.getScore(),
      shadow: this.tetromino.getShadow(),
      position: this.tetromino.getPosition(),
      shape: this.tetromino.getState()[this.tetromino.getRotation()],
      clr: this.tetromino.getShape(),
      paused: this.paused,
    };
  }

  keyPress(key) {
    if (
      key === "left" &&
      !this.board.checkCollision(this.tetromino, [-1, 0], 0)
    ) {
      this.tetromino.move("left");
    } else if (
      key === "down" &&
      !this.board.checkCollision(this.tetromino, [0, 1], 0)
    ) {
      this.tetromino.move("down");
    } else if (
      key === "right" &&
      !this.board.checkCollision(this.tetromino, [1, 0], 0)
    ) {
      this.tetromino.move("right");
    } else if (key === "rotateCW") {
      if (!this.board.checkCollision(this.tetromino, [0, 0], 1)) {
        this.tetromino.rotate(1);
      }
    } else if (key === "rotateCCW") {
      if (!this.board.checkCollision(this.tetromino, [0, 0], 3)) {
        this.tetromino.rotate(3);
      }
    } else if (key === "drop") {
      this.tetromino.drop(this.board.hardDrop(this.tetromino));
      this.board.addToBoard(this.tetromino);
      this.tetromino = this.queue.shift();
      this.queue.push(new Tetromino());
    } else if (key === "hold") {
      if (this.held) {
        if (this.previouslyHeld !== this.tetromino) {
          let temp;
          temp = this.tetromino;
          this.tetromino = this.held;
          this.previouslyHeld = this.held;
          this.held = temp;
        }
      } else {
        this.held = this.tetromino;
        this.tetromino = this.queue.shift();
        this.queue.push(new Tetromino());
      }
    } else if (key === "pause") {
      if (!this.paused) {
        clearInterval(this.interval);
        this.paused = true;
      } else {
        this.interval = setInterval(tick, 1000);
        this.paused = false;
      }
    }
    if (key !== "down")
      this.tetromino.setShadow(this.board.hardDrop(this.tetromino));
    display(this.getState());
  }
}

const newGame = () => {
  model = new Model();
  model.start();
};

const tick = () => {
  if (!model.board.checkCollision(model.tetromino, [0, 1], 0)) {
    model.tetromino.gameTick();
  } else {
    model.board.addToBoard(model.tetromino);
    model.tetromino = model.queue.shift();
    model.queue.push(new Tetromino());
    model.tetromino.setShadow(model.board.hardDrop(model.tetromino));
  }
  display(model.getState());
};
