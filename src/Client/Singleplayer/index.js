let sketch = new p5(View);
let game = new Singleplayer();

sketch.startFunc = game.newGame;
game.display = sketch.display;
