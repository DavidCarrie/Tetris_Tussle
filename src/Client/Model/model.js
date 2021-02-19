let board;
let currentTetromino;
let interval;
let lose;
let paused;
function tick() {
  if (!board.checkCollision(currentTetromino, [0, 1])) {
    currentTetromino.gameTick();
  } else {
    board.addToBoard(currentTetromino);
    currentTetromino = new Tetromino();
    currentTetromino.setShadow(board.getShadow(currentTetromino));
  }
  display(getState());
}
//queue for the next pieces

function newTetromino() {
  currentTetromino = new tetromino();
}
function getState() {
  return {
    boardState: board.boardState,
    shadowPos: currentTetromino.getShadow(),
    currPos: currentTetromino.getPosition(),
    currState: currentTetromino.getState(),
    clr: currentTetromino.getShape(),
  };
}

function keyPress(key) {
  if (key === "left" && !board.checkCollision(currentTetromino, [-1, 0])) {
    currentTetromino.move("left");
    currentTetromino.setShadow(board.getShadow(currentTetromino));
    display(getState());
  } else if (
    key === "down" &&
    !board.checkCollision(currentTetromino, [0, 1])
  ) {
    currentTetromino.move("down");
    display(getState());
  } else if (
    key === "right" &&
    !board.checkCollision(currentTetromino, [1, 0])
  ) {
    currentTetromino.move("right");
    currentTetromino.setShadow(board.getShadow(currentTetromino));
    display(getState());
  } else if (key === "rotate") {
    currentTetromino.rotate("CW");
    currentTetromino.setShadow(board.getShadow(currentTetromino));
    if (!board.checkCollision(currentTetromino, [0, 0])) display(getState());
    else {
      currentTetromino.rotate("CCW");
      board.getShadow(currentTetromino);
    }
  } else if (key === "drop") {
    board.hardDrop(currentTetromino);
    board.addToBoard(currentTetromino);
    currentTetromino = new Tetromino();
    currentTetromino.setShadow(board.getShadow(currentTetromino));
    display(getState());
  }
}

function playButtonClicked() {
  newGame();
  document.getElementById("playbutton").disabled = true;
}
function newGame() {
  clearInterval(interval);
  board = new Board();
  currentTetromino = new Tetromino();
  currentTetromino.setShadow(board.getShadow(currentTetromino));
  lose = false;
  paused = false;
  interval = setInterval(tick, 1000);
}
//////////////add hard drop
