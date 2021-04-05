class Player {
  constructor(id, board, shape, shadow, position, clr, score) {
    this.id = id;
    this.board = board;
    this.shape = shape;
    this.shadow = shadow;
    this.position = position;
    this.clr = clr;
    this.score = score;
  }
}

module.exports = Player;
