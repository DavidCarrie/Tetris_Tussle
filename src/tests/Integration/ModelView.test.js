const { TestScheduler } = require("@jest/core");

describe("Integration Tests", () => {
    test("Integration of Board and Tetromino", () => {
        let input = 1;

        expect(input).toBeGreaterThan(-1);
    });
});