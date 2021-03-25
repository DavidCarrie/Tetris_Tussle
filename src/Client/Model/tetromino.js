const SHAPES = [
  [0x4444, 0x0f00, 0x4444, 0x0f00], // 'I'
  [0xcc00, 0xcc00, 0xcc00, 0xcc00], // 'O'
  [0x4640, 0x0e40, 0x4c40, 0x4e00], // 'T'
  [0x44c0, 0x8e00, 0xc880, 0xe200], // 'J'
  [0x88c0, 0xe800, 0xc440, 0x2e00], // 'L'
  [0x8c40, 0x6c00, 0x8c40, 0x6c00], // 'S'
  [0x4c80, 0xc600, 0x4c80, 0xc600], // 'Z'
];

class Tetromino {
  constructor() {
    this.shape = Math.floor(Math.random() * 7);
    this.state = SHAPES[this.shape];
    (this.rotation = 0), (this.shadow = 0), (this.position = [3, 0]);
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
  getRotation() {
    return this.rotation;
  }
  rotate(amount) {
    this.rotation = (this.rotation + amount) % 4;
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
}
