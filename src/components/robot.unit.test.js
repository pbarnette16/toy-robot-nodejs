const Robot = require('./Robot');

describe('Creation of a Robot', () => {
    beforeEach(() => {
        let robot = null
     });

     test('Example Input 1', () => {
        expect(() => {
            robot = new Robot.Robot({x:5,y:5})
            robot.emit("commandController", "Place 0,0,N");
            robot.emit("commandController", "Move");
            robot.emit("commandController", "Report");
        }).stringContaining("0,0,N");
    });

    test('Example Input 2', () => {
        expect(() =>{
            robot = new Robot.Robot({x:5,y:5})
            robot.emit("commandController", "Place 0,0,N");
            robot.emit("commandController", "Left");
            robot.emit("commandController", "Report");
        }).stringContaining("0,0,WEST");
        
    });

    test('Example Input 3', () => {
        expect(() =>{
            robot = new Robot.Robot({x:5,y:5})
            robot.emit("commandController", "Place 1,2,N");
            robot.emit("commandController", "Move");
            robot.emit("commandController", "Move");
            robot.emit("commandController", "Left");
            robot.emit("commandController", "Move");
            robot.emit("commandController", "Report");
        }).stringContaining("3,3,NORTH");
        
    });

})