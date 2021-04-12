const Board = require('../../Client/Model/board.js');
const Tetromino = require('../../Client/Model/tetromino.js');
const Model = require('../../Client/Model/Model.js');

describe("2.1.3 Model tests", () => {
    test("1 Constructor", () => {
        let input = new Model();
        
        let output = false;
        expect(input.paused).toBe(output);
    });
    test("2 start(interval)", () => {
        let input = new Model();
        let output = 1000;
        input.start(output)
        expect(input.interval).toBe(output);
    });
    test("3 getEndGame()", () => {
        let input = new Model();
        input.endGame = false;
        let output = false;
        expect(input.getEndGame()).toBe(output);
    });
    test("4 setEndGame() - Game ended", () => {
        //Test game is ended 
        let input = new Model();
        input.setEndGame();
        let output = true;
        expect(input.endGame).toBe(output);
    });
    test("5 getState()", () => {
        let input = new Model();
        let in2 = input.getState();
        let output = 0;
        expect(in2.score).toBe(output);
    });
    test("6 keyPress(key) - right", () => {
        let model = new Model();
        let input = "right";
        model.keyPress(input);
        let output = [4, 0];
        expect(model.tetromino.position).toStrictEqual(output);
    });

    

});