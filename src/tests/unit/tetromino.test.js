const Tetromino = require('../../Client/Model/tetromino.js');

describe("Tetromino Tests", () => {
    test("Constructor test - Tetromino Shape", () => {
        let input = new Tetromino();

        expect(input.shape).toBeGreaterThan(-1);
    });
    test("Constructor test - Tetromino Shape 2", () => {
        let input = new Tetromino();
        expect(input.shape).toBeLessThan(7)
    });
    test("Constructor test - Tetromino Position", () => {
        let input = new Tetromino();
        let output = 0;
        expect(input.position[1]).toBe(output);
    });
    test("Constructor test - Shadow", () => {
        let input = new Tetromino();
        let output = 0;
        expect(input.shadow).toBe(output);
    });
    test("getPosition()", () => {
        let input = new Tetromino();
        input.position = [3, 0];
        let output = [3, 0];
        expect(input.getPosition()).toStrictEqual(output);
    });
    test("getShape()", () => {
        let input = new Tetromino();
        input.shape = 0;
        let output = 0;
        expect(input.getShape()).toBe(output);
    });
    test("getState()", () => {
        let input = new Tetromino();
        input.state = 0;
        let output = 0;
        expect(input.getState()).toBe(output);
    });
    test("getRotation()", () => {
        let input = new Tetromino();
        input.rotation = 0;
        let output = 0;
        expect(input.getRotation()).toBe(output);
    });
    test("rotate(amount)", () => {
        //Set rotation to 0, rotate 1 and check
        let input = new Tetromino();
        input.rotation = 0;
        input.rotate(1)
        let output = 1;
        expect(input.getRotation()).toBe(output);
    });
    test("getShadow()", () => {
        
        let input = new Tetromino();
        input.shadow = 0;
        let output = 0;
        expect(input.getShadow()).toBe(output);
    });
    test("setShadow(shadow)", () => {
        //Set shadow 10 units further and test
        let input = new Tetromino();
        input.shadow = 0;
        input.setShadow(10);
        let output = 10;
        expect(input.getShadow()).toBe(output);
    });
    test("gameTick()", () => {
        let input = new Tetromino();
        input.position = [0, 0];
        input.gameTick();
        let output = 1;
        expect(input.getPosition()[1]).toBe(output);
    });
    test("move(direction) - down", () => {
        let input = new Tetromino();
        input.position = [0, 0];
        input.move("down");
        let output = 1;
        expect(input.getPosition()[1]).toBe(output);
    });
    test("move(direction) - right", () => {
        let input = new Tetromino();
        input.position = [3, 0];
        input.move("right");
        let output = 4;
        expect(input.getPosition()[0]).toBe(output);
    });
    test("move(direction) - left", () => {
        let input = new Tetromino();
        input.position = [3, 0];
        input.move("left");
        let output = 2;
        expect(input.getPosition()[0]).toBe(output);
    });
    

});