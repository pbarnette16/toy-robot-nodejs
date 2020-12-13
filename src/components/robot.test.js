const Robot = require('./Robot');

describe('Creation of a Robot', () => {
    beforeEach(() => {
        let robot = null
     });

    test('checking to see if no grid is sent to the robot constructor', () => {
        expect(() => {
            robot = new Robot.Robot()}
            ).toThrow("You have not set a valid grid. Try again");
    });

    test('checking to see if a negative grid is sent to the robot constructor', () => {
        expect(() => {
            robot = new Robot.Robot({'x':-1,'y':-10})}
            ).toThrow("You have not set a valid grid. Try again");
    });

    test('checking to see if a [0,0] grid is sent to the robot constructor', () => {
        expect(() => {
            robot = new Robot.Robot({'x':0,'y':0})}
            ).toThrow("You have not set a valid grid. Try again");
    });

    test('checking to see if a [5,5] grid is sent to the robot constructor', () => {
        robot = new Robot.Robot({'x':5,'y':5})
        expect(robot).toBeInstanceOf(Robot.Robot);
    });
    
});

describe('Testing Values sent to the robot valid and invalid', () => {
    beforeEach(() => {
        let robot = null
     });

    describe('Robot: Testing of the place command', () => {
        beforeEach(() => {
            robot = new Robot.Robot({'x':5,'y':5});
        });

        test('Robot: Place: Plaxe bad command', () => {
            expect( () => {
                robot.emit("commandController", "Plaxe 1,1,N")
            }).toThrow("You didn't think you'd slip that command past me did you?")
        });

        test('Robot: Place: Place bad location [-1,-1]', () => {
            expect(() =>{
                robot.emit("commandController", "Place -1,-1,N")
            }).toEqual("Stu")
        });

        test('Robot: Place: Place bad Direction Flark', () => {
            expect(() => {
                robot.emit("commandController", "Place 0,0,Flark")
            }).toEqual("Stu")
        });

        test('Robot: Place: Place bad Direction J', () => {
            expect(() => {
                robot.emit("commandController", "Place 0,0,J")
            }).toEqual("Stu")
        });

    })
    
    /*
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
    */
    
});