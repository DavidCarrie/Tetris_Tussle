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
    let shape = tetromino.getShape();
    let x = tetromino.getPosition()[0];
    let y = tetromino.getPosition()[1];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (x + j < 10 && y + i < 20 && state[i][j] === 1) {
          this.boardState[y + i][x + j].filled = 1;
          this.boardState[y + i][x + j].color = shape;
        }
      }
    }
    console.log(this.boardState);
  }
  checkCollision(tetromino, direction) {
    let tx = tetromino.getPosition()[0] + direction[0];
    let ty = tetromino.getPosition()[1] + direction[1];
    let state = tetromino.getState();
    for (let y = 0; y < 4; ++y) {
      for (let x = 0; x < 4; ++x) {
        if (state[y][x] === 1 && (ty + y > 19 || tx + x > 9 || tx < 0))
          return true;
        if (state[y][x] === 1 && this.boardState[ty + y][tx + x].filled === 1)
          return true;
      }
    }

    return false;
  }
  hardDrop(tetromino) {
    let y = 0;
    while (!this.checkCollision(tetromino, [0, y + 1])) y++;
    tetromino.drop(y);
  }
  getShadow(tetromino) {
    let y = 0;
    while (!this.checkCollision(tetromino, [0, y + 1])) y++;
    return y;
  }
}
