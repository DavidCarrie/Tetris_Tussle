/**
 * @module MutiplayerView 7 Multiplayer View Module
 * @brief Generates the view for the multplayer game feature.
 */

const COLORS = [
  "#00ffff",
  "#FFFF00",
  "#800080",
  "#0000ff",
  "#ff7f00",
  "#00ff00",
  "#ff0000",
];
let backgrd,
  back_button,
  create_button,
  join_input,
  submit_join_button,
  restart_button,
  leaderboard_button;

let unit, topLeft;
/**
 * @brief Used to set the background image in processing
 */
function preload() {
  backgrd = loadImage("images/bg.jpg");
}

//setup the canvas
/**
 * @brief Used to setup the game canvas in processing
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  back_button = createElement("a", "Back");
  back_button.position(50, 50);
  back_button.class("canvas-btn");
  back_button.addClass("back");
  back_button.attribute("href", "./");

  create_button = createElement("a", "Create");
  create_button.position(windowWidth / 2, windowHeight / 3);
  create_button.class("canvas-btn");
  create_button.addClass("start");
  create_button.attribute("onClick", "create()");

  join_input = createInput("");
  join_input.position(windowWidth / 2, windowHeight / 2);
  join_input.addClass("join-input");

  submit_join_button = createButton("JOIN");
  submit_join_button.class("canvas-btn");
  submit_join_button.addClass("back");
  submit_join_button.position(windowWidth / 1.5, windowHeight / 2);
  submit_join_button.mousePressed(joinGame);

  restart_button = createElement("a", "Restart");
  restart_button.position(windowWidth / 4, (2 * windowHeight) / 3);
  restart_button.class("canvas-btn");
  restart_button.addClass("start");
  restart_button.attribute("onClick", "restart()");
  restart_button.hide();

  leaderboard_button = createElement("a", "Leaderboard");
  leaderboard_button.position((2 * windowWidth) / 4, (2 * windowHeight) / 3);
  leaderboard_button.class("canvas-btn");
  leaderboard_button.addClass("start");
  leaderboard_button.attribute("href", "./leaderboard.html");
  leaderboard_button.hide();

  image(backgrd, 0, 0, windowWidth, windowHeight); //draw the background
  smooth();
}
function restarting() {
  restart_button.hide();
  leaderboard_button.hide();
}
function create() {
  create_button.hide();
  join_input.hide();
  submit_join_button.hide();
  newGame("create");
}
function joined() {
  create_button.hide();
  join_input.hide();
  submit_join_button.hide();
}
function joinError() {
  clear();
  image(backgrd, 0, 0, windowWidth, windowHeight);
  fill(255, 0, 0);
  stroke(255);
  strokeWeight(2);
  textSize(windowHeight / 10);
  textAlign(CENTER);
  text("Error joining the game", windowWidth / 2, windowHeight / 2);
  redraw();
}

function joinGame() {
  const room = join_input.value();
  newGame("join", room);
}

function setScore(score) {
  let scores = getItem("leaderboard") || [];
  scores.push(score);
  scores.sort(function (a, b) {
    return b - a;
  });
  if (scores.length > 10) {
    scores.pop();
  }
  storeItem("leaderboard", scores);
}
//update the screen
/**
 * @brief required by proccessing (unused)
 */
function draw() {}
function endScreen(result = 1, score = 0) {
  clear();
  image(backgrd, 0, 0, windowWidth, windowHeight);
  fill(255);
  filter(BLUR);
  stroke(0);
  strokeWeight(2);
  textSize(unit * 2);
  textAlign(CENTER);

  setScore(score);
  if (result === 1) text("YOU WON", windowWidth / 2, windowHeight / 3);
  else if (result === 0) text("YOU TIED", windowWidth / 2, windowHeight / 3);
  else text("YOU LOST", windowWidth / 2, windowHeight / 3);
  text(`FINAL SCORE: ${score}`, windowWidth / 2, windowHeight / 2);
  restart_button.show();
  leaderboard_button.show();

  redraw();
}
function waiting(room = "") {
  clear();
  image(backgrd, 0, 0, windowWidth, windowHeight);
  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(windowHeight / 20);
  textAlign(CENTER);
  text(
    "Go to the following site on another device: \nhttp://localhost:3000/multiplayer.html",
    windowWidth / 2,
    windowHeight / 5
  );
  text(
    `The click JOIN and enter the following Game ID: \n${room}`,
    windowWidth / 2,
    windowHeight / 2
  );
  redraw(); //re-render the canvas
}

function countdown(num = 3) {
  clear();
  image(backgrd, 0, 0, windowWidth, windowHeight);
  fill(0);
  stroke(255);
  strokeWeight(1);
  textSize(windowHeight / 10);
  textAlign(CENTER);
  text(`Starting in ${num}`, windowWidth / 2, windowHeight / 2);
  redraw(); //re-render the canvas
}
function display(gameState, otherPlayer) {
  clear();
  unit = windowHeight / 25;
  let smallUnit = unit / 2;
  topLeft = [windowWidth / 3 - 2 * unit, windowHeight / 2 - 10 * unit];
  let topLeft2 = [topLeft[0] + 18 * unit, windowHeight / 2 - 10 * smallUnit];

  //player1
  let board, queue, score, shadow, position, shape, clr;
  board = gameState.board;
  queue = gameState.queue;
  held = gameState.held;
  score = gameState.score;
  shadow = gameState.shadow;
  position = gameState.position;
  shape = gameState.shape;
  clr = gameState.clr;

  image(backgrd, 0, 0, windowWidth, windowHeight);
  //////////////////////////////////////////
  //draw the text
  fill(255);
  noStroke();
  textSize(unit);
  textAlign(CENTER);
  text(`Score: ${score}`, windowWidth / 2, unit);
  text("Hold", topLeft[0] - 4 * unit, windowHeight / 2 - unit * 3.5);
  text("Next", topLeft[0] + unit * 14, windowHeight / 2 - unit * 5);

  //draw the hold area
  fill(0);
  rectMode(CENTER);
  rect(topLeft[0] - 4 * unit, windowHeight / 2 - unit * 6, unit * 5, unit * 3);

  //draw the held tetromino
  if (held != undefined) {
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (held[0] & (0x8000 >> (y * 4 + x))) {
          drawBlock(
            topLeft[0] - 6 * unit + x * unit,
            windowHeight / 2 - unit * 7 + y * unit,
            2,
            255,
            COLORS[held[1]],
            unit
          );
        }
      }
    }
  }

  //draw the queue area
  fill(0);
  rectMode(CENTER);
  noStroke();
  rect(topLeft[0] + unit * 14, windowHeight / 2, unit * 5, unit * 9);
  //draw the queue
  for (let i = 0; i < queue.length; ++i) {
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (queue[i][0] & (0x8000 >> (y * 4 + x))) {
          drawBlock(
            topLeft[0] + unit * 12 + x * unit,
            windowHeight / 2 - unit * 4 + (y + i * 3) * unit,
            2,
            255,
            COLORS[queue[i][1]],
            unit
          );
        }
      }
    }
  }
  //////////////////////////
  drawBoard(unit, topLeft);
  drawPlaced(unit, topLeft, board);
  drawCurrent(unit, position, topLeft, shadow, clr, shape);
  if (otherPlayer != null && otherPlayer.board != null) {
    //player2
    let board2 = otherPlayer.board;
    let shadow2 = otherPlayer.shadow;
    let position2 = otherPlayer.position;
    let shape2 = otherPlayer.shape;
    let clr2 = otherPlayer.clr;
    drawBoard(smallUnit, topLeft2);
    drawPlaced(smallUnit, topLeft2, board2);
    drawCurrent(smallUnit, position2, topLeft2, shadow2, clr2, shape2);
  }
  redraw(); //re-render the canvas
}

/**
 * @brief Handles browser window resizing
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}

/**
 * @brief Draws a single square at (x, y)
 * @param {*} x X coordinate
 * @param {*} y Y coordinate
 * @param {*} outline Stroke Weight of the outline
 * @param {*} strokeClr Stroke Color.
 * @param {*} clr Color of the Tetromino
 * @param {*} unit Length of square size
 */
function drawBlock(x, y, outline, strokeClr, clr, unit) {
  if (clr === "none") noFill();
  else fill(clr);
  strokeWeight(outline);
  stroke(strokeClr);
  rectMode(CORNER);
  rect(x, y, unit, unit);
}
/**
 * @brief Draw a side of the boarder of the game board
 * @param {*} unit Length of a unit calculated by window size
 * @param {*} topLeft X, Y coordinate of the top left of the board
 */
function drawBorder(unit, topLeft) {
  noStroke();
  fill(107, 185, 240);
  rect(topLeft[0] - unit, topLeft[1] - unit, unit * 12, unit * 22);
}

/**
 * @brief Draws grid lines on the board
 * @param {*} unit Length of a unit calculated by window size
 * @param {*} topLeft X, Y coordinate of the top left of the board
 */
function drawGrid(unit, topLeft) {
  strokeWeight(1);
  stroke(50);

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

/**
 * @brief Draws the Game Board
 * @param {*} unit Length of a unit calculated by window size
 * @param {*} topLeft X, Y coordinate of the top left of the board
 */
function drawBoard(unit, topLeft) {
  rectMode(CORNER);
  noStroke();
  drawBorder(unit, topLeft);
  fill(0);
  rect(topLeft[0], topLeft[1], unit * 10, unit * 20);
  drawGrid(unit, topLeft);
}

/**
 * @brief Draws the board placed Tetrominos
 * @param {*} unit Length of a unit calculate by window size
 * @param {*} topLeft X, Y coordinate of the top left of the board
 * @param {*} board Game board model
 */
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

/**
 * @brief Draws the current tetromino and its shadow
 * @param {*} unit Length of a unit calculate by window size
 * @param {*} position X Y position of the Tetromino
 * @param {*} topLeft X, Y coordinate of the top left of the board
 * @param {*} shadow Y offset of the Tetromino
 * @param {*} clr color of the Tetromino
 * @param {*} shape Shape of the Tetromino
 */
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
