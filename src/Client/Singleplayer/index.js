const Singleplayer = require('./singleplayer.js');
const View = require('./view.js');
//import sketch
class Game {
    static view = new p5(sketch);
    view.newGame = Singleplayer.newGame;



}