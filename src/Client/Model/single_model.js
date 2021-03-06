let board;
let currentTetromino;
let interval;
//todo
// let lose;
// let paused;

function tick() {
  if (!board.checkCollision(currentTetromino, [0, 1], 0)) {
    currentTetromino.gameTick();
  } else {
    board.addToBoard(currentTetromino);
    currentTetromino = new Tetromino();
    currentTetromino.setShadow(board.hardDrop(currentTetromino));
  }
  display(getState());
}

//queue for the next pieces
function newTetromino() {
  currentTetromino = new tetromino();
}
function getState() {
  return {
    board: board.elems,
    shadow: currentTetromino.getShadow(),
    position: currentTetromino.getPosition(),
    shape: currentTetromino.getState()[currentTetromino.getRotation()],
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
    currentTetromino.drop(board.hardDrop(currentTetromino));
    board.addToBoard(currentTetromino);
    currentTetromino = new Tetromino();
  }
  if (key !== "down")
    currentTetromino.setShadow(board.hardDrop(currentTetromino));
  display(getState());
}

// function singlePlayer() {
//   document.getElementById("playbutton").disabled = true;
//   newGame();
// }

function newGame() {
  clearInterval(interval);
  board = new Board();
  currentTetromino = new Tetromino();
  currentTetromino.setShadow(board.hardDrop(currentTetromino));
  lose = false;
  paused = false;
  interval = setInterval(tick, 1000);
}
