const COLORS = [
  "#00ffff",
  "#FFFF00",
  "#800080",
  "#0000ff",
  "#ff7f00",
  "#00ff00",
  "#ff0000",
];
let backgrd, back_button, start_button, canvas;
function preload() {
  backgrd = loadImage("images/bg.jpg");
}

//setup the canvas
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  back_button = createElement("a", "Back");
  back_button.position(50, 50);
  back_button.class("canvas-btn");
  back_button.addClass("back");
  back_button.attribute("href", "./");

  start_button = createElement("a", "Start");
  start_button.center();
  start_button.class("canvas-btn");
  start_button.addClass("start");
  start_button.attribute("onClick", "start()");
  image(backgrd, 0, 0, windowWidth, windowHeight); //draw the background
  smooth();
}
function start() {
  start_button.hide();
  newGame();
}
//update the screen
function draw() {}
function display(gameState) {
  let unit = windowHeight / 25;
  let topLeft = [windowWidth / 2 - 5 * unit, windowHeight / 2 - 10 * unit];
  let board = gameState.board;
  let shadow = gameState.shadow;
  let position = gameState.position;
  let shape = gameState.shape;
  let clr = gameState.clr;
  let score = gameState.score;
  clear();
  image(backgrd, 0, 0, windowWidth, windowHeight); //draw the background

  //draw the text
  fill(255);
  noStroke();
  textSize(unit * 1.5);
  textAlign(CENTER);
  text(`Score: ${score}`, windowWidth / 2 + unit * 16, unit * 3);
  textSize(unit);
  text("Hold", windowWidth / 2 - unit * 10, windowHeight / 2 - unit * 3);

  //draw the hold area
  fill(0);
  rectMode(CENTER);
  rect(
    windowWidth / 2 - unit * 10,
    windowHeight / 2 - unit * 6,
    unit * 4,
    unit * 4
  );

  drawBoard(unit, clr);

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
function drawBorder(unit, clr) {
  noStroke();
  fill(35, 35, 35);
  rect(windowWidth / 2, windowHeight / 2, unit * 12, unit * 22);
  fill(COLORS[clr]);
  rect(windowWidth / 2, windowHeight / 2, unit * 11.5, unit * 21.5);
  fill(35, 35, 35);
  rect(windowWidth / 2, windowHeight / 2, unit * 11, unit * 21);
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
function drawBoard(unit, clr) {
  rectMode(CENTER);
  noStroke();
  drawBorder(unit, clr);
  fill(0);
  rect(windowWidth / 2, windowHeight / 2, unit * 10, unit * 20);
  drawGrid(unit);
}
