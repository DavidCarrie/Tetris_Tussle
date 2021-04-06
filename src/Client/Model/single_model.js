let model;

const newGame = () => {
  model = new Model();
  model.start(setInterval(tick, 1000));
};

const tick = () => {
  if (!model.board.checkCollision(model.tetromino, [0, 1], 0)) {
    model.tetromino.gameTick();
  } else {
    model.score += model.board.addToBoard(model.tetromino);
    model.tetromino = model.queue.shift();
    model.queue.push(new Tetromino());
    model.tetromino.setShadow(model.board.hardDrop(model.tetromino));
  }
  let state = model.getState();
  display(state);
};

const keyPress = (key) => {
  if (model) {
    model.keyPress(key);
    let state = model.getState();
    display(state);
  }
};
