const SHAPES = [
  [
    //I
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ], //Square
  [
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ], //T
  [
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ], //L
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ], //J
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
  ], //S
  [
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ], //Z
  [
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
];

class Tetromino {
  constructor() {
    this.shape = Math.floor(Math.random() * 7);
    this.state = SHAPES[this.shape];
    this.position = [3, 0];
    this.shadow = 0;
  }
  getPosition() {
    return this.position;
  }
  getShape() {
    return this.shape;
  }
  getState() {
    return this.state;
  }
  getShadow() {
    return this.shadow;
  }
  setShadow(shadow) {
    this.shadow = shadow + this.position[1];
  }
  //move the current piece down
  gameTick() {
    this.position[1] += 1;
  }

  //move the current tetromino if allowed
  move(direction) {
    if (direction === "down") this.position[1] += 1;
    else if (direction === "left") this.position[0] -= 1;
    else if (direction === "right") this.position[0] += 1;
  }

  //hard drop
  drop(y) {
    this.position[1] += y;
  }

  //rotate the current tetromino
  rotate(direction) {
    if (direction === "CW") {
      //rotate clockwise
      for (let i = 0; i < 2; i++) {
        for (let j = i; j < 4 - i - 1; j++) {
          let temp = this.state[i][j];
          this.state[i][j] = this.state[3 - j][i];
          this.state[3 - j][i] = this.state[3 - i][3 - j];
          this.state[3 - i][3 - j] = this.state[j][3 - i];
          this.state[j][3 - i] = temp;
        }
      }
    } else {
      // rotate counter clockwise
      for (let i = 0; i < 2; i++) {
        for (let j = i; j < 3 - i; j++) {
          let temp = this.state[i][j];
          this.state[i][j] = this.state[j][3 - i];
          this.state[j][3 - i] = this.state[3 - i][3 - j];
          this.state[3 - i][3 - j] = this.state[3 - j][i];
          this.state[3 - y][i] = temp;
        }
      }
    }
  }
}
