const Robot = require('./Robot');

describe('Creation of a Robot', () => {
    let robot = null
    test('checking to see if no grid is sent to the robot constructor', () => {
        expect(() => {
            robot = new Robot.Robot()}
            ).toThrow("You have not set a valid grid. Try again");
    });

    test('checking to see if a negative grid is sent to the robot constructor', () => {
        expect(() => {
            robot = new Robot.Robot(-1,-1)}
            ).toThrow("You have not set a valid grid. Try again");
    });

    test('checking to see if a [0,0] grid is sent to the robot constructor', () => {
        expect(() => {
            robot = new Robot.Robot(0,0)}
            ).toThrow("You have not set a valid grid. Try again");
    });
    
});