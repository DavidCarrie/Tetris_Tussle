const Board = require('../../Client/Model/board.js');
const Tetromino = require('../../Client/Model/tetromino.js');
const Model = require('../../Client/Model/Model.js');
const Singleplayer = require('../../Client/Model/singleplayer.js');


describe("singleplayer tests", () => {
    //Light tests as this is 
    test("newGame()", () => {
        let input = Singleplayer.newGame();
        let output = 0;
        expect(Singleplayer.model.score).toBe(output);
    });
    test("tick()", () => {
        let input = Singleplayer.tick();
        let output = Singleplayer.model.state;
        expect(Singleplayer.model.getState()).toBe(output);
    });
    test("keyPress(key)", () => {
        let input = Singleplayer.keyPress('down');
        let output = Singleplayer.model.state;
        expect(Singleplayer.model.getState()).toBe(output);
    });
    /*
    test("start(interval)", () => {
        let input = new Model();
        let output = 1000;
        input.start(output)
        expect(input.interval).toBe(output);
    });
    test("getEndGame()", () => {
        let input = new Model();
        input.endGame = false;
        let output = false;
        expect(input.getEndGame()).toBe(output);
    });
    test("setEndGame() - Game ended", () => {
        //Test game is ended 
        let input = new Model();
        input.setEndGame();
        let output = true;
        expect(input.endGame).toBe(output);
    });
    test("getState()", () => {
        //Test game is ended 
        let input = new Model();
        let in2 = input.getState();
        let output = 0;
        expect(in2.score).toBe(output);
    });
    test("keyPress(key)", () => {
        //Test game is ended 
        let model = new Model();
        let input = "right";
        model.keyPress(input);
        let output = [4, 0];
        expect(model.tetromino.position).toStrictEqual(output);
    });

    */

});