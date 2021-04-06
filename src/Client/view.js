/**
 * @module Singleplayer 6 Singleplayer View Module and 3 Main View Module
 * @brief Generates the Singlplayer game view.
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
let backgrd, back_button, start_button, newGame_button, leaderboard_button;

let unit, topLeft;
/**
 * @brief Used to load background images in processing
 */
function preload() {
  backgrd = loadImage("images/bg.jpg");
}

/**
 * @brief Used to setup the canvas in processing
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
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

  newGame_button = createElement("a", "New Game");
  newGame_button.position(windowWidth/4, 2*windowHeight/3);
  newGame_button.class("canvas-btn");
  newGame_button.addClass("start");
  newGame_button.attribute("onClick", "start()");
  newGame_button.hide();
  

  leaderboard_button = createElement("a", "Leaderboard");
  leaderboard_button.position(2*windowWidth/4, 2*windowHeight/3);
  leaderboard_button.class("canvas-btn");
  leaderboard_button.addClass("start");
  leaderboard_button.attribute("href", "./leaderboard.html");
  leaderboard_button.hide();

  image(backgrd, 0, 0, windowWidth, windowHeight); //draw the background

  smooth();
}
/**
 * @brief Starts a new game and hides uneeded menu buttons.
 */
function start() {
  start_button.hide();
  newGame_button.hide();
  leaderboard_button.hide();

  newGame();
}


/**
 * @brief Add the score to the leaderboard if it is a top 10 score.
 * @param {*} score Points scored in the game
 */
function setScore(score){
  let scores = getItem("leaderboard") || [];
  console.log("scores", scores);
  console.log("score", score);
  scores.push(score);
  scores.sort(function(a,b){return b-a});
  if (scores.length > 10) {
    scores.pop();
  }
  storeItem('leaderboard', scores);
}

/**
 * @brief Required by processing (unused)
 */
function draw() {}
/**
 * @brief Generate the display for the game
 * @param {*} gameState Objecting holding game information
 * @returns Nothing. Returns only to end function early
 */
function display(gameState) {
  let board, queue, score, shadow, position, shape, clr, paused, endGame;
  unit = windowHeight / 25;
  topLeft = [windowWidth / 2 - 5 * unit, windowHeight / 2 - 10 * unit];
  board = gameState.board;
  queue = gameState.queue;
  held = gameState.held;
  score = gameState.score;
  shadow = gameState.shadow;
  position = gameState.position;
  shape = gameState.shape;
  clr = gameState.clr;
  paused = gameState.paused;
  endGame = gameState.endGame;

  clear();
  image(backgrd, 0, 0, windowWidth, windowHeight); //draw the background

  if (paused) {
    //draw the text
    fill(255);
    noStroke();
    textSize(unit * 5);
    textAlign(CENTER);
    text("Paused", windowWidth / 2, windowHeight / 2);
    return;
  }

  if (endGame) {
    fill(255);
    filter(BLUR);
    noStroke();
    textSize(unit * 5);
    textAlign(CENTER);
    
    setScore (score);
    text("GAME OVER", windowWidth / 2, windowHeight / 3 );  
    text(`FINAL SCORE: ${score}`, windowWidth / 2, windowHeight / 2 );
    newGame_button.show();
    leaderboard_button.show();
   
    return;
  }


  //draw the text
  fill(255);
  noStroke();
  textSize(unit);
  textAlign(CENTER);
  text(`Score: ${score}`, windowWidth / 2, unit);
  text("Hold", windowWidth / 2 - unit * 9, windowHeight / 2 - unit * 2.5);
  text("Next", windowWidth / 2 + unit * 9, windowHeight / 2 - unit * 8);

  //draw the hold area
  fill(0);
  rectMode(CENTER);
  rect(
    windowWidth / 2 - unit * 9,
    windowHeight / 2 - unit * 6,
    unit * 5,
    unit * 5
  );

  //draw the held tetromino
  if (held != undefined) {
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (held[0] & (0x8000 >> (y * 4 + x))) {
          drawBlock(
            windowWidth / 2 - unit * 10 + x * unit,
            windowHeight / 2 - unit * 8 + y * unit,
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
  rect(windowWidth / 2 + unit * 9, windowHeight / 2, unit * 5, unit * 15);
  //draw the queue
  for (let i = 0; i < queue.length; ++i) {
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (queue[i][0] & (0x8000 >> (y * 4 + x))) {
          drawBlock(
            windowWidth / 2 + unit * 8 + x * unit,
            windowHeight / 2 - unit * 7 + (y + i * 5) * unit,
            2,
            255,
            COLORS[queue[i][1]],
            unit
          );
        }
      }
    }
  }

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


/**
 * @brief Handles browser window resizing
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/**
 * @brief Draws a single square at (x, y)
 * @param {*} x X coordinate
 * @param {*} y Y coordinate
 * @param {*} outline Stroke Weight of the outline
 * @param {*} strokeClr Stroke Color.
 * @param {*} clr Color of the Tetromino
 * @param {*} unit Length of a unit calculated by window size
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
function drawBorder(unit, clr) {
  noStroke();
  fill(35, 35, 35);
  rect(windowWidth / 2, windowHeight / 2, unit * 12, unit * 22);
  fill(COLORS[clr]);
  rect(windowWidth / 2, windowHeight / 2, unit * 11.5, unit * 21.5);
  fill(35, 35, 35);
  rect(windowWidth / 2, windowHeight / 2, unit * 11, unit * 21);
}

/**
 * @brief Draws grid lines on the board
 * @param {*} unit Length of a unit calculated by window size
 * @param {*} topLeft X, Y coordinate of the top left of the board
 */
function drawGrid(unit) {
  strokeWeight(1);
  stroke(50);

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

/**
 * @brief Draws the Game Board
 * @param {*} unit Length of a unit calculated by window size
 * @param {*} topLeft X, Y coordinate of the top left of the board
 */
function drawBoard(unit, clr) {
  rectMode(CENTER);
  noStroke();
  drawBorder(unit, clr);
  fill(0);
  rect(windowWidth / 2, windowHeight / 2, unit * 10, unit * 20);
  drawGrid(unit);
}
