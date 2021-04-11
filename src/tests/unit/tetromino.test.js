const { TestScheduler } = require("@jest/core");
//const Tetromino = require('../../Client/Model/tetromino.js');
import { Tetromino } from "../../Client/Model/tetromino.js";

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
        
    });
    
   
});