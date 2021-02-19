const ROWS = 20;
const COLS = 10;

class Board {
  constructor() {
    // initialize an empty board
    this.boardState = [];
    for (let i = 0; i < ROWS; ++i) {
      this.boardState.push([]);
      for (let j = 0; j < COLS; ++j) {
        this.boardState[i].push({ filled: 0, color: "#000000" });
      }
    }
  }

  getBoardState() {
    return this.boardState;
  }

  addToBoard(tetromino) {
    let state = tetromino.getState();
    let index = tetromino.getRotation();
    let shape = tetromino.getShape();
    let x = tetromino.getPosition()[0];
    let y = tetromino.getPosition()[1];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (state[index] & (0x8000 >> (i * 4 + j))) {
          // if (x + j < 10 && y + i < 20 && state[i][j] === 1) {
          this.boardState[y + i][x + j].filled = 1;
          this.boardState[y + i][x + j].color = shape;
        }
      }
    }
    // clearLine();
  }
  checkCollision(tetromino, direction, rotation) {
    let tx = tetromino.getPosition()[0] + direction[0];
    let ty = tetromino.getPosition()[1] + direction[1];
    let state = tetromino.getState();
    let index = (tetromino.getRotation() + rotation) % 4;
    for (let y = 0; y < 4; ++y) {
      for (let x = 0; x < 4; ++x) {
        if (state[index] & (0x8000 >> (y * 4 + x))) {
          if (ty + y > 19 || tx + x > 9 || tx + x < 0) {
            return true;
          } else if (this.boardState[ty + y][tx + x].filled === 1) {
            return true;
          }
        }
      }
    }
    return false;
  }
  hardDrop(tetromino) {
    let y = 0;
    while (!this.checkCollision(tetromino, [0, y + 1], 0)) y++;
    tetromino.drop(y);
  }
  getShadow(tetromino) {
    let y = 0;
    while (!this.checkCollision(tetromino, [0, y + 1], 0)) y++;
    return y;
  }

  clearLine() {
    let numLines = 0;
    let lines = [];
    let startRow = -1;
    for (let i = 0; i < ROWS; i++) {
      let j;
      for (j = 0; j < COLS && this.boardState[j].filled === 1; j++) {}
      if (j === COLS) {
        numLines += 1;
        if (startRow === -1) startRow = j;
      } else if (numLines > 0) {
        lines.push([startRow, numLines]);
        startRow = -1;
      }
    }
    if (numLines > 0) lines.push([startRow, numLines]);
    //loop through lines and add to score accordingly
    this.board.unshift(); //add row of zeros
    this.board.pop();
  }
}
