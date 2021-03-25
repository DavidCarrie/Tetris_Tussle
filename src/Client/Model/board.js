const ROWS = 20;
const COLS = 10;
let score = 0;
class Board {
  constructor() {
    // initialize an empty elems
    this.elems = [];
    for (let i = 0; i < ROWS; ++i) {
      this.elems.push([]);
      for (let j = 0; j < COLS; ++j) {
        this.elems[i].push({ filled: 0, color: "#000000" });
      }
    }
  }

  getElems() {
    return this.elems;
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
          if (y + i >= 1 && x + j >= 0 && x + j < 20) {
            this.elems[y + i][x + j].filled = 1;
            this.elems[y + i][x + j].color = shape;
          } else if (y + i == 0) {
            // newGame(); //end game here////////////
          }
        }
      }
    }
    this.clearLine();
  }
  checkCollision(tetromino, direction, rotation) {
    let tx = tetromino.getPosition()[0] + direction[0];
    let ty = tetromino.getPosition()[1] + direction[1];
    let state = tetromino.getState();
    let index = (tetromino.getRotation() + rotation) % 4;

    for (let y = 0; y < 4; ++y) {
      for (let x = 0; x < 4; ++x) {
        if (state[index] & (0x8000 >> (y * 4 + x))) {
          if (ty + y > 19 || tx + x > 9 || tx + x < 0 || ty + y < 0) {
            return true;
          } else if (this.elems[ty + y][tx + x].filled === 1) {
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
    return y;
  }

  clearLine() {
    let multiplier = 1;
    for (let y = ROWS - 1; y >= 0; --y) {
      let rowFilled = true;
      print(y);
      for (let x = 0; x < COLS; ++x) {
        if (this.elems[y][x].filled == 0) {
          rowFilled = false;
          break;
        }
      }
      if (rowFilled) {
        score += 10 * multiplier;
        multiplier + 1;
        for (var yy = y; yy > 0; --yy) {
          for (var x = 0; x < COLS; ++x) {
            board.elems[yy][x] = board.elems[yy - 1][x];
          }
        }
        ++y;
      }
    }
  }

  getScore() {
    return score;
  }

  deleteRow(array, row) {
    array = array.slice(0); // make copy
    array.splice(row - 1, 1);
    return array;
  }
}
