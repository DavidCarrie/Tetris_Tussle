let board;
let currentTetromino;
let interval;

let players = {};
let socket;
let otherPlayer;
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
  // //send update to the server
  // let data = {
  //   board: board.elems,
  //   shape: currentTetromino.getState()[currentTetromino.getRotation],
  //   shadow: currentTetromino.getShadow(),
  //   position: currentTetromino.getPosition(),
  //   clr: currentTetromino.getShape(),
  // };
  // socket.emit("update", data);
  display(getState(), otherPlayer);
}

//queue for the next pieces
function newTetromino() {
  currentTetromino = new tetromino();
}
function getState() {
  //send update to the server
  let data = {
    board: board.elems,
    shape: currentTetromino.getState()[currentTetromino.getRotation],
    shadow: currentTetromino.getShadow(),
    position: currentTetromino.getPosition(),
    clr: currentTetromino.getShape(),
  };
  socket.emit("update", data);
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
  display(getState(), otherPlayer);
}

// function playButtonClicked() {
//   newGame();
//   document.getElementById("playbutton").disabled = true;
// }

function newGame() {
  clearInterval(interval);
  board = new Board();
  currentTetromino = new Tetromino();
  currentTetromino.setShadow(board.hardDrop(currentTetromino));
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
    color
    
    
    
    return {
    board: board.elems,
    shadow: currentTetromino.getShadow(),
    position: currentTetromino.getPosition(),
    shape: currentTetromino.getState()[currentTetromino.getRotation()],
    clr: currentTetromino.getShape(),
    
    */
  let data = {
    board: board.elems,
    shape: currentTetromino.getState()[0],
    shadow: currentTetromino.getShadow(),
    position: currentTetromino.getPosition(),
    clr: currentTetromino.getShape(),
  };
  socket.emit("start", data);

  socket.on("heartbeat", function (data) {
    //console.log(data);
    players = data;
    Object.keys(players).forEach(function (key) {
      // console.log(key, players[key]);
      if (key !== socket.id) otherPlayer = players[key];
    });
  });
}
