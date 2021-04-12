/**
 * @module View 6 Singleplayer View Module and 3 Main View Module
 * @brief Generates the Singlplayer game view.
 */
const View = (p) => {
  p.COLORS = [
    "#00ffff",
    "#FFFF00",
    "#800080",
    "#0000ff",
    "#ff7f00",
    "#00ff00",
    "#ff0000",
  ];
  p.startFunc,
    p.backgrd,
    p.back_button,
    p.start_button,
    p.newGame_button,
    p.leaderboard_button,
    p.unit,
    p.topLeft;

  /**
   * @brief Used to load background images in processing
   */
  p.preload = () => {
    p.backgrd = p.loadImage("../images/bg.jpg");
  };
  /**
   * @brief Used to setup the canvas in processing
   */
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.back_button = p.createElement("a", "Back");
    p.back_button.position(50, 50);
    p.back_button.class("canvas-btn");
    p.back_button.addClass("back");
    p.back_button.attribute("href", "./");

    p.start_button = p.createElement("a", "Start");
    p.start_button.center();
    p.start_button.class("canvas-btn");
    p.start_button.addClass("start");
    p.start_button.attribute("onClick", "sketch.start()");

    p.newGame_button = p.createElement("a", "New Game");
    p.newGame_button.position(p.windowWidth / 4, (2 * p.windowHeight) / 3);
    p.newGame_button.class("canvas-btn");
    p.newGame_button.addClass("start");
    p.newGame_button.attribute("onClick", "sketch.start()");
    p.newGame_button.hide();

    p.leaderboard_button = p.createElement("a", "Leaderboard");
    p.leaderboard_button.position(
      (2 * p.windowWidth) / 4,
      (2 * p.windowHeight) / 3
    );
    p.leaderboard_button.class("canvas-btn");
    p.leaderboard_button.addClass("start");
    p.leaderboard_button.attribute("href", "./leaderboard.html");
    p.leaderboard_button.hide();

    p.image(p.backgrd, 0, 0, p.windowWidth, p.windowHeight); //draw the background
    p.smooth();
  };

  /**
   * @brief Starts a new game and hides uneeded menu buttons.
   */
  p.start = () => {
    if (!p.startFunc) return;

    p.start_button.hide();
    p.newGame_button.hide();
    p.leaderboard_button.hide();
    p.startFunc();
  };

  /**
   * @brief Add the score to the leaderboard if it is a top 10 score.
   * @param {*} score Points scored in the game
   */
  p.setScore = (score) => {
    let scores = p.getItem("leaderboard") || [];
    scores.push(score);
    scores.sort(function (a, b) {
      return b - a;
    });
    if (scores.length > 10) {
      scores.pop();
    }
    p.storeItem("leaderboard", scores);
  };

  /**
   * @brief Required by processing (unused)
   */
  p.draw = () => {};

  /**
   * @brief Generate the display for the game
   * @param {*} gameState Objecting holding game information
   * @returns Nothing. Returns only to end function early
   */
  p.display = (gameState) => {
    // return;
    let board,
      queue,
      score,
      shadow,
      position,
      shape,
      clr,
      paused,
      endGame,
      held;
    p.unit = p.windowHeight / 25;
    p.topLeft = [
      p.windowWidth / 2 - 5 * p.unit,
      p.windowHeight / 2 - 10 * p.unit,
    ];
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

    p.clear();
    p.image(p.backgrd, 0, 0, p.windowWidth, p.windowHeight); //draw the background

    if (paused) {
      //draw the text
      p.fill(255);
      p.noStroke();
      p.textSize(p.unit * 5);
      p.textAlign(p.CENTER);
      p.text("Paused", p.windowWidth / 2, p.windowHeight / 2);
      return;
    }

    if (endGame) {
      p.fill(255);
      p.filter(p.BLUR);
      p.stroke(0);
      p.strokeWeight(2);
      p.textSize(p.unit * 2);
      p.textAlign(p.CENTER);

      p.setScore(score);
      p.text("GAME OVER", p.windowWidth / 2, p.windowHeight / 3);
      p.text(`FINAL SCORE: ${score}`, p.windowWidth / 2, p.windowHeight / 2);
      p.newGame_button.show();
      p.leaderboard_button.show();

      return;
    }

    //draw the text
    p.fill(255);
    p.noStroke();
    p.textSize(p.unit);
    p.textAlign(p.CENTER);
    p.text(`Score: ${score}`, p.windowWidth / 2, p.unit);
    p.text(
      "Hold",
      p.windowWidth / 2 - p.unit * 9,
      p.windowHeight / 2 - p.unit * 2.5
    );
    p.text(
      "Next",
      p.windowWidth / 2 + p.unit * 9,
      p.windowHeight / 2 - p.unit * 5
    );

    //draw the hold area
    p.fill(0);
    p.rectMode(p.CENTER);
    p.rect(
      p.windowWidth / 2 - p.unit * 9,
      p.windowHeight / 2 - p.unit * 5,
      p.unit * 5,
      p.unit * 3
    );

    //draw the held tetromino
    if (held != undefined) {
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
          if (held[0] & (0x8000 >> (y * 4 + x))) {
            p.drawBlock(
              p.windowWidth / 2 - p.unit * 11 + x * p.unit,
              p.windowHeight / 2 - p.unit * 6 + y * p.unit,
              2,
              255,
              p.COLORS[held[1]],
              p.unit
            );
          }
        }
      }
    }

    //draw the queue area
    p.fill(0);
    p.rectMode(p.CENTER);
    p.noStroke();
    p.rect(
      p.windowWidth / 2 + p.unit * 9,
      p.windowHeight / 2,
      p.unit * 5,
      p.unit * 9
    );
    //draw the queue
    for (let i = 0; i < queue.length; ++i) {
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
          if (queue[i][0] & (0x8000 >> (y * 4 + x))) {
            p.drawBlock(
              p.windowWidth / 2 + p.unit * 7 + x * p.unit,
              p.windowHeight / 2 - p.unit * 4 + (y + i * 3) * p.unit,
              2,
              255,
              p.COLORS[queue[i][1]],
              p.unit
            );
          }
        }
      }
    }

    p.drawBoard(p.unit, clr);

    //draw the placed tetrominos
    for (let y = 0; y < 20; ++y) {
      for (let x = 0; x < 10; ++x) {
        if (board[y][x].filled === 1)
          p.drawBlock(
            p.topLeft[0] + x * p.unit,
            p.topLeft[1] + y * p.unit,
            1,
            0,
            p.COLORS[board[y][x].color],
            p.unit
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
            p.drawBlock(
              p.topLeft[0] + (position[0] + x) * p.unit,
              p.topLeft[1] + (position[1] + y) * p.unit,
              2,
              255,
              p.COLORS[clr],
              p.unit
            );
          }
          p.drawBlock(
            p.topLeft[0] + (position[0] + x) * p.unit,
            p.topLeft[1] + (shadow + y) * p.unit,
            2,
            255,
            "none",
            p.unit
          );
        }
      }
    }

    p.redraw(); //re-render the canvas
  };

  /**
   * @brief Handles browser window resizing
   */
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  /**
   * @brief Draws a single square at (x, y)
   * @param {*} x X coordinate
   * @param {*} y Y coordinate
   * @param {*} outline Stroke Weight of the outline
   * @param {*} strokeClr Stroke Color.
   * @param {*} clr Color of the Tetromino
   * @param {*} unit Length of a unit calculated by window size
   */
  p.drawBlock = (x, y, outline, strokeClr, clr, unit) => {
    if (clr === "none") p.noFill();
    else p.fill(clr);
    p.strokeWeight(outline);
    p.stroke(strokeClr);
    p.rectMode(p.CORNER);
    p.rect(x, y, unit, unit);
  };

  /**
   * @brief Draw a side of the boarder of the game board
   * @param {*} unit Length of a unit calculated by window size
   * @param {*} topLeft X, Y coordinate of the top left of the board
   */
  p.drawBorder = (unit, clr) => {
    p.noStroke();
    p.fill(35, 35, 35);
    p.rect(p.windowWidth / 2, p.windowHeight / 2, unit * 12, unit * 22);
    p.fill(p.COLORS[clr]);
    p.rect(p.windowWidth / 2, p.windowHeight / 2, unit * 11.5, unit * 21.5);
    p.fill(35, 35, 35);
    p.rect(p.windowWidth / 2, p.windowHeight / 2, unit * 11, unit * 21);
  };

  /**
   * @brief Draws grid lines on the board
   * @param {*} unit Length of a unit calculated by window size
   * @param {*} topLeft X, Y coordinate of the top left of the board
   */
  p.drawGrid = (unit) => {
    p.strokeWeight(1);
    p.stroke(50);

    //Horizontal grid lines
    for (let i = 1; i < 20; i++) {
      p.line(
        p.windowWidth / 2 - unit * 5,
        p.windowHeight / 2 - unit * 10 + i * unit,
        p.windowWidth / 2 + unit * 5,
        p.windowHeight / 2 - unit * 10 + i * unit
      );
    }

    //Vertical grid lines
    for (let i = 1; i < 10; i++) {
      p.line(
        p.windowWidth / 2 - unit * 5 + i * unit,
        p.windowHeight / 2 - unit * 10,
        p.windowWidth / 2 - unit * 5 + i * unit,
        p.windowHeight / 2 + unit * 10
      );
    }
  };

  /**
   * @brief Draws the Game Board
   * @param {*} unit Length of a unit calculated by window size
   * @param {*} topLeft X, Y coordinate of the top left of the board
   */
  p.drawBoard = (unit, clr) => {
    p.rectMode(p.CENTER);
    p.noStroke();
    p.drawBorder(unit, clr);
    p.fill(0);
    p.rect(p.windowWidth / 2, p.windowHeight / 2, unit * 10, unit * 20);
    p.drawGrid(unit);
  };
};

// module.exports = View;
