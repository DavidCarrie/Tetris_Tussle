const Board = require('../../Client/Model/board.js');
const Tetromino = require('../../Client/Model/tetromino.js');

describe("2.1.2 Board tests", () => {
    test("1 Constructor - endgame", () => {
        let input = new Board();
        let output = false 
        expect(input.endGame).toBe(output);
    });
    test("2 getElems()", () => {
        let input = new Board();
        input.elems = [];
        let output = [];
        expect(input.getElems()).toStrictEqual(output);
    });
    test("3 addToBoard() - add tetromino", () => {
        //create and add tetromino see if it adds.
        let input = new Board();
        let tetro = new Tetromino();
        tetro.shape = 1;
        input.addToBoard(tetro);
        
        expect(input.getElems()[3][3].filled).toBe(0);
    });
    test("4 getEndGame()", () => {
        let input = new Board();
        let output = false 
        expect(input.getEndGame()).toBe(output);
    });
    test("5 hardDrop(tetromino)", () => {
        let input = new Board();
        let tetro = new Tetromino();
        //empty board, should hardrop to last row
        output = 18;
        expect(input.hardDrop(tetro)).toBe(18);
    });
    test("6 clearLine()", () => {
        let input = new Board();
        //loop for 10 for columns, set up row full row and clear
        for (let j = 0; j < 10; j++){
            input.elems[0].push({ filled: 1, color: "#000000" });
        }
        output = 0;
        expect(input.clearLine()).toBe(output);
    });
   

});