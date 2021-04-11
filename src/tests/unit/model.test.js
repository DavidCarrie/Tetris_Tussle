const Board = require('../../Client/Model/board.js');
const Tetromino = require('../../Client/Model/tetromino.js');
const Model = require('../../Client/Model/Model.js');

describe("Model tests", () => {
    test("Constructor", () => {
        let input = new Model();
        
        let output = false;
        expect(input.paused).toBe(output);
    });
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
    /*test("Constructor - endgame", () => {
        let input = new Board();
        let output = false 
        expect(input.endGame).toBe(output);
    });
    test("getElems()", () => {
        let input = new Board();
        input.elems = [];
        let output = [];
        expect(input.getElems()).toStrictEqual(output);
    });
    test("addToBoard() - add tetromino", () => {
        //create and add tetromino see if it adds.
        let input = new Board();
        let tetro = new Tetromino();
        tetro.shape = 1;
        input.addToBoard(tetro);
        
        expect(input.getElems()[3][3].filled).toBe(0);
    });
    test("getEndGame()", () => {
        let input = new Board();
        let output = false 
        expect(input.getEndGame()).toBe(output);
    });
    test("hardDrop(tetromino)", () => {
        let input = new Board();
        let tetro = new Tetromino();
        //empty board, should hardrop to last row
        output = 18;
        expect(input.hardDrop(tetro)).toBe(18);
    });
    test("clearLine()", () => {
        let input = new Board();
        //loop for 10 for columns, set up row full row and clear
        for (let j = 0; j < 10; j++){
            input.elems[0].push({ filled: 1, color: "#000000" });
        }
        output = 0;
        expect(input.clearLine()).toBe(output);
    });
   */

});