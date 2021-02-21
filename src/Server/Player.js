class Player {
  constructor(
    id,
    gameMode,
    isPlaying,
    board,
    shape,
    shadow,
    nextShape,
    position,
    color
  ) {
    this.id = id;
    this.gameMode = gameMode;
    this.isPlaying = isPlaying;
    this.board = board;
    this.shape = shape;
    this.shadow = shadow;
    this.nextShape = nextShape;
    this.position = position;
    this.clr = color;
  }
}

module.exports = Player;
