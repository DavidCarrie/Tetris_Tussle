const ROWS = 20;
const COLS = 10;
//let score = 0;
class Board {

  constructor() {
    // initialize an empty elems
    this.elems = [];
    this.endGame = false;
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
            this.endGame = true;
          }
        }
      }
    }
    return this.clearLine(y);
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

  getEndGame(){
    return this.endGame;
  }

  hardDrop(tetromino) {
    let y = 0;
    while (!this.checkCollision(tetromino, [0, y + 1], 0)) y++;
    return y;
  }

  clearLine(y) {
    //return score added
    let score = 0;
    let multiplier = 1;
    for (let row = ROWS - 1; row >= 0; --row) {
      let rowFilled = true;
      for (let col = 0; col < COLS; ++col) {
        if (this.elems[row][col].filled == 0) {
          rowFilled = false;
          multiplier = 1;
          break;
        }
      }

      if (rowFilled) {
        score += 40 * multiplier;
        multiplier += 1;
        this.elems.splice(row, 1);
        this.elems.unshift([]);
        for (let j = 0; j < COLS; ++j) {
          this.elems[0].push({ filled: 0, color: "#000000" });
        }
        row += 1;
      }
    }
    return score;
  }
}
