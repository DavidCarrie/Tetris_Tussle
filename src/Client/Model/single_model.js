let model;

const newGame = () => {
  model = new Model();
  model.start(setInterval(tick, 1000));
};

const tick = () => {
  if (!model.board.checkCollision(model.tetromino, [0, 1], 0)) {
    model.tetromino.gameTick();
  } else {
    let temp = model.score;
    model.score += model.board.addToBoard(model.tetromino);
    if (model.tetromino.getPosition()[1] === 0 && temp === model.score) {
      clearInterval(model.interval);
      //newGame();
    }
    model.tetromino = model.queue.shift();
    model.queue.push(new Tetromino());
    model.tetromino.setShadow(model.board.hardDrop(model.tetromino));
  }
  display(model.getState());
};

const keyPress = (key) => {
  if (model) {
    model.keyPress(key);
    display(model.getState());
  }
};
