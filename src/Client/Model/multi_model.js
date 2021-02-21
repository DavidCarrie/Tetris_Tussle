let board;
let currentTetromino;
let interval;
let players = {};
let socket;
let playing = false;
//todo
// let lose;
// let paused;

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
    board: board.elems,
    shadow: currentTetromino.getShadow(),
    position: currentTetromino.getPosition(),
    shape: currentTetromino.getState()[currentTetromino.getRotation()],
    clr: currentTetromino.getShape(),
  };
}

function keyPress(key) {
  if (playing === true) {
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
      currentTetromino.setShadow(board.getShadow(currentTetromino));
    display(getState());
  }
}

// function playButtonClicked() {
//   newGame();
//   document.getElementById("playbutton").disabled = true;
// }

function newGame() {
  clearInterval(interval);
  board = new Board();
  currentTetromino = new Tetromino();
  currentTetromino.setShadow(board.getShadow(currentTetromino));
  lose = false;
  paused = false;
  interval = setInterval(tick, 1000);
  socket = io.connect("http://localhost:3000");

  /*gameMode,
    isPlaying,
    board,
    shape,
    shadow,
    nextShape,
    position,
    color*/
  let data = {
    gameMode: "multi",
    board: board,
    shape: c,
    shadow: c,
    nextShape: c,
    position: c,
    color: c,
  };
  socket.emit("start", dat  a);
  //set is playing
  socket.on("heartbeat", function (data) {
    //console.log(data);
    if(playing = data.)
    players = data;
  });
}
