const COLORS = [
  "#00ffff",
  "#FFFF00",
  "#800080",
  "#0000ff",
  "#ff7f00",
  "#00ff00",
  "#ff0000",
];

//setup the canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  smooth();
}
//update the screen
function draw() {}

function display(gameState, otherPlayer) {
  clear();
  let unit = windowHeight / 25;
  //let topLeft = [windowWidth / 2 - 5 * unit, windowHeight / 2 - 10 * unit];
  // let board = gameState.board;
  // let shadow = gameState.shadow;
  // let position = gameState.position;
  // let shape = gameState.shape;
  // let clr = gameState.clr;

  let topLeft1 = [windowWidth / 4 - 5 * unit, windowHeight / 2 - 10 * unit];
  let topLeft2 = [
    (3 * windowWidth) / 4 - 5 * unit,
    windowHeight / 2 - 10 * unit,
  ];

  //player1
  let board1 = gameState.board;
  let shadow1 = gameState.shadow;
  let position1 = gameState.position;
  let shape1 = gameState.shape;
  let clr1 = gameState.clr;
  drawBoard(unit, topLeft1);
  drawPlaced(unit, topLeft1, board1);
  drawCurrent(unit, position1, topLeft1, shadow1, clr1, shape1);
  //console.log(otherPlayer);
  if (otherPlayer != null && otherPlayer.board != null) {
    //player2
    let board2 = otherPlayer.board;
    let shadow2 = otherPlayer.shadow;
    let position2 = otherPlayer.position;
    let shape2 = otherPlayer.shape;
    let clr2 = otherPlayer.clr;
    drawBoard(unit, topLeft2);
    drawPlaced(unit, topLeft2, board2);
    drawCurrent(unit, position2, topLeft2, shadow2, clr2, shape2);
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
function drawBorder(unit, topLeft) {
  noStroke();
  fill(107, 185, 240);
  rect(topLeft[0] - unit, topLeft[1] - unit, unit * 12, unit * 22);
}

//draw the grid lines on the board
function drawGrid(unit, topLeft) {
  strokeWeight(1);
  stroke(150);

  //Horizontal grid lines
  for (let i = 1; i < 20; i++) {
    line(
      topLeft[0],
      topLeft[1] + unit * i,
      topLeft[0] + unit * 10,
      topLeft[1] + unit * i
    );
  }

  //Vertical grid lines
  for (let i = 1; i < 10; i++) {
    line(
      topLeft[0] + i * unit,
      topLeft[1],
      topLeft[0] + i * unit,
      topLeft[1] + 20 * unit
    );
  }
}

//draw the game board
function drawBoard(unit, topLeft) {
  rectMode(CORNER);
  noStroke();
  drawBorder(unit, topLeft);
  fill(0);
  rect(topLeft[0], topLeft[1], unit * 10, unit * 20);
  drawGrid(unit, topLeft);
}

function drawPlaced(unit, topLeft, board) {
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
}

function drawCurrent(unit, position, topLeft, shadow, clr, shape) {
  //draw the current tetromino and its shadow
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (shape & (0x8000 >> (y * 4 + x))) {
        if (
          position[1] + y >= 0 &&
          position[0] + x >= 0 &&
          position[0] + x < 20
        ) {
          drawBlock(
            topLeft[0] + (position[0] + x) * unit,
            topLeft[1] + (position[1] + y) * unit,
            2,
            255,
            COLORS[clr],
            unit
          );
        }
        drawBlock(
          topLeft[0] + (position[0] + x) * unit,
          topLeft[1] + (shadow + y) * unit,
          2,
          255,
          "none",
          unit
        );
      }
    }
  }
}
