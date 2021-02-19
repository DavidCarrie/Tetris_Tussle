let board;
let currentTetromino;
let interval;
let lose;
let paused;

function tick() {
  if (!board.checkCollision(currentTetromino, [0, 1], 0)) {
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
    shadow: currentTetromino.getShadow(),
    position: currentTetromino.getPosition(),
    rotation: currentTetromino.getRotation(),
    shape: currentTetromino.getState(),
    clr: currentTetromino.getShape(),
  };
}

function keyPress(key) {
  if (key === "left" && !board.checkCollision(currentTetromino, [-1, 0], 0)) {
    currentTetromino.move("left");
  } else if (
    key === "down" &&
    !board.checkCollision(currentTetromino, [0, 1], 0)
  ) {
    currentTetromino.move("down");
  } else if (
    key === "right" &&
    !board.checkCollision(currentTetromino, [1, 0], 0)
  ) {
    currentTetromino.move("right");
  } else if (key === "rotate") {
    if (!board.checkCollision(currentTetromino, [0, 0], 1)) {
      currentTetromino.rotate();
    }
  } else if (key === "drop") {
    board.hardDrop(currentTetromino);
    board.addToBoard(currentTetromino);
    currentTetromino = new Tetromino();
    //clear lines
  }
  if (key !== "down")
    currentTetromino.setShadow(board.getShadow(currentTetromino));
  display(getState());
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
