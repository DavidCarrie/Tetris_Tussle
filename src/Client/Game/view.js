const COLORS = [
  "#01f0ef",
  "#F0F001",
  "#A000F1",
  "#EFA000",
  "#0101F0",
  "#02EF00",
  "#F00100",
];
//setup the canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  smooth();
}
//update the screen
function draw() {}
// /*
// function getState() {
//   return {
//     boardState= board.getBoardState();
//     ghostPos = currTetromino.getGhost();
//     currPos = currTetromino.getPosition();
//     currState = currTetromino.getState();
//     clr = currTetromino.getShape();
//   };
// }*/
function display(gameState) {
  let unit = windowHeight / 25;
  let topLeft = [windowWidth / 2 - 5 * unit, windowHeight / 2 - 10 * unit];
  let board = gameState.boardState;
  let shadowPos = gameState.shadowPos;
  let currPos = gameState.currPos;
  let currState = gameState.currState;
  let clr = gameState.clr;
  clear();
  drawBoard(unit);

  //draw the placed tetrominos
  for (let y = 0; y < 20; ++y) {
    for (let x = 0; x < 10; ++x) {
      if (board[y][x].filled === 1)
        drawBlock(
          topLeft[0] + x * unit,
          topLeft[1] + y * unit,
          1,
          0,
          COLORS[board[y][x].color],
          unit
        );
    }
  }
  //draw the current tetromino and its shadow
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (currState[y][x]) {
        drawBlock(
          topLeft[0] + (currPos[0] + x) * unit,
          topLeft[1] + (currPos[1] + y) * unit,
          2,
          255,
          COLORS[clr],
          unit
        );
        drawBlock(
          topLeft[0] + (currPos[0] + x) * unit,
          topLeft[1] + (shadowPos + y) * unit,
          2,
          255,
          "none",
          unit
        );
      }
    }
  }
  redraw(); //re-render the canvas
}

//handle browser window resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// draw a single square at (x, y)
function drawBlock(x, y, outline, strokeClr, clr, unit) {
  if (clr === "none") noFill();
  else fill(clr);
  strokeWeight(outline);
  stroke(strokeClr);
  rectMode(CORNER);
  rect(x, y, unit, unit);
}

//draw the board's border
function drawBorder(unit) {
  noStroke();
  fill(107, 185, 240);
  rect(windowWidth / 2, windowHeight / 2, unit * 12, unit * 22);
}

//draw the grid lines on the board
function drawGrid(unit) {
  strokeWeight(1);
  stroke(150);

  //Horizontal grid lines
  for (let i = 1; i < 20; i++) {
    line(
      windowWidth / 2 - unit * 5,
      windowHeight / 2 - unit * 10 + i * unit,
      windowWidth / 2 + unit * 5,
      windowHeight / 2 - unit * 10 + i * unit
    );
  }

  //Vertical grid lines
  for (let i = 1; i < 10; i++) {
    line(
      windowWidth / 2 - unit * 5 + i * unit,
      windowHeight / 2 - unit * 10,
      windowWidth / 2 - unit * 5 + i * unit,
      windowHeight / 2 + unit * 10
    );
  }
}

//draw the game board
function drawBoard(unit) {
  rectMode(CENTER);
  noStroke();
  drawBorder(unit);
  fill(0);
  rect(windowWidth / 2, windowHeight / 2, unit * 10, unit * 20);
  drawGrid(unit);
}

// //
// function keyPress(key) {
//   switch (key) {
//     case "a":
//       currentX + windowHeight / 25;
//       break;
//     case "d":
//       currentX += windowHeight / 25;

//       break;
//     case "s":
//       currentY += windowHeight / 25;

//       break;
//     /*  case "r":
//       break;
//     case " ":
//       currentY += windowHeight;

//       break;
//   }*/
//   }
// }
