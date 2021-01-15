const Robot = require('./Robot');

describe('Creation of a Robot', () => {
    beforeEach(() => {
        robot = new Robot.Robot({'x':5,'y':5}, false);
        handler = jest.fn();
    });

     test('Example Input 1', () => {

        //robot.on("commandController", handler)

        robot.emit("commandController", "Place 0,0,N");

        //expect(handler).toBeCalledTimes(1)
        //expect(handler).toBeCalledWith("Place 0,0,N")

        robot.emit("commandController", "Move");

        //expect(handler).toBeCalledTimes(2)
        //expect(handler).toBeCalledWith("Move")

        robot.emit("commandController", "Report");

        //expect(handler).toBeCalledTimes(3)
        //expect(handler).toBeCalledWith("Report")
        
        
        robot.emit("commandController", "Report").then((data) => {
            console.log(data)
        })
        
        //robot.emit("commandController", "Report").then((output) => {
        //    console.log(output)
        //})
        //console.log(handler.mock);
        /*
        expect(() =>{
            console.log(robot.emit("commandController", "Report"));
        }).toContain("0,1,N"); 
*/

    });
/*
    test('Example Input 2', () => {
        expect(() =>{
            robot = new Robot.Robot({x:5,y:5}, false)
            robot.emit("commandController", "Place 0,0,N");
            robot.emit("commandController", "Left");
            robot.emit("commandController", "Report");
        }).stringContaining("0,0,WEST");
        
    });

    test('Example Input 3', () => {
        expect(() =>{
            robot = new Robot.Robot({x:5,y:5}, false)
            robot.emit("commandController", "Place 1,2,N");
            robot.emit("commandController", "Move");
            robot.emit("commandController", "Move");
            robot.emit("commandController", "Left");
            robot.emit("commandController", "Move");
            robot.emit("commandController", "Report");
        }).stringContaining("3,3,NORTH");
        
    });
*/
})