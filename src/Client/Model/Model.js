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
    this.endGame = this.board.getEndGame();
    this.interval;
    this.held;
    this.previouslyHeld;
  }

  start(interval) {
    this.interval = interval;
  }
  getEndGame() {
    return this.endGame;
  }
  setEndGame() {
    clearInterval(this.interval);
    this.endGame = true;
  }
  getState() {
    if (this.board.getEndGame()) {
      this.setEndGame();
    }
    return {
      board: this.board.elems,
      queue: this.queue.map((t) => [t.getState()[0], t.getShape()]),
      held:
        this.held != undefined
          ? [this.held.getState()[0], this.held.getShape()]
          : undefined,
      score: this.score,
      shadow: this.tetromino.getShadow(),
      position: this.tetromino.getPosition(),
      shape: this.tetromino.getState()[this.tetromino.getRotation()],
      clr: this.tetromino.getShape(),
      paused: this.paused,
      endGame: this.endGame,
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
      this.score += this.board.addToBoard(this.tetromino);
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
    if (key !== "down") {
      this.tetromino.setShadow(this.board.hardDrop(this.tetromino));
    }
  }
}
