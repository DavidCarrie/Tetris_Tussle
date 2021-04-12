const Tetromino = require('../../Client/Model/tetromino.js');

describe("2.1.1 Tetromino Tests", () => {
    test("1 Constructor test - Tetromino Shape", () => {
        let input = new Tetromino();

        expect(input.shape).toBeGreaterThan(-1);
    });
    test("2 Constructor test - Tetromino Shape 2", () => {
        let input = new Tetromino();
        expect(input.shape).toBeLessThan(7)
    });
    test("3 Constructor test - Tetromino Position", () => {
        let input = new Tetromino();
        let output = 0;
        expect(input.position[1]).toBe(output);
    });
    test("4 Constructor test - Shadow", () => {
        let input = new Tetromino();
        let output = 0;
        expect(input.shadow).toBe(output);
    });
    test("5 getPosition()", () => {
        let input = new Tetromino();
        input.position = [3, 0];
        let output = [3, 0];
        expect(input.getPosition()).toStrictEqual(output);
    });
    test("6 getShape()", () => {
        let input = new Tetromino();
        input.shape = 0;
        let output = 0;
        expect(input.getShape()).toBe(output);
    });
    test("7 getState()", () => {
        let input = new Tetromino();
        input.state = 0;
        let output = 0;
        expect(input.getState()).toBe(output);
    });
    test("8 getRotation()", () => {
        let input = new Tetromino();
        input.rotation = 0;
        let output = 0;
        expect(input.getRotation()).toBe(output);
    });
    test("9 rotate(amount)", () => {
        //Set rotation to 0, rotate 1 and check
        let input = new Tetromino();
        input.rotation = 0;
        input.rotate(1)
        let output = 1;
        expect(input.getRotation()).toBe(output);
    });
    test("10 getShadow()", () => {
        
        let input = new Tetromino();
        input.shadow = 0;
        let output = 0;
        expect(input.getShadow()).toBe(output);
    });
    test("11 setShadow(shadow)", () => {
        //Set shadow 10 units further and test
        let input = new Tetromino();
        input.shadow = 0;
        input.setShadow(10);
        let output = 10;
        expect(input.getShadow()).toBe(output);
    });
    test("12 gameTick()", () => {
        let input = new Tetromino();
        input.position = [0, 0];
        input.gameTick();
        let output = 1;
        expect(input.getPosition()[1]).toBe(output);
    });
    test("13 move(direction) - down", () => {
        let input = new Tetromino();
        input.position = [0, 0];
        input.move("down");
        let output = 1;
        expect(input.getPosition()[1]).toBe(output);
    });
    test("14 move(direction) - right", () => {
        let input = new Tetromino();
        input.position = [3, 0];
        input.move("right");
        let output = 4;
        expect(input.getPosition()[0]).toBe(output);
    });
    test("15 move(direction) - left", () => {
        let input = new Tetromino();
        input.position = [3, 0];
        input.move("left");
        let output = 2;
        expect(input.getPosition()[0]).toBe(output);
    });
    

});