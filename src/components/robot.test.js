const Robot = require('./Robot');

describe('Creation of a Robot', () => {
    beforeEach(() => {
        let robot = null
     });

    test('checking to see if no grid is sent to the robot constructor', async () => {
        expect(() => {
            robot = new Robot()}
            ).toThrow("You have not set a valid grid. Try again");
    });

    test('checking to see if a negative grid is sent to the robot constructor', async () => {
        expect(() => {
            robot = new Robot({'x':-1,'y':-10}, false)}
            ).toThrow("You have not set a valid grid. Try again");
    });

    test('checking to see if a [0,0] grid is sent to the robot constructor', async () => {
        expect(() => {
            robot = new Robot({'x':0,'y':0}, false)}
            ).toThrow("You have not set a valid grid. Try again");
    });

    test('checking to see if a [5,5] grid is sent to the robot constructor', async () => {
        robot = new Robot({'x':5,'y':5}, false)
        expect(robot).toBeInstanceOf(Robot);
    });
    
});

describe('Testing Values sent to the robot PLACE command valid and invalid', () => {
    beforeEach(() => {
        let robot = null
     });



    describe('Robot: Testing of the PLACE command', () => {
        beforeEach(() => {
            robot = new Robot({'x':5,'y':5}, false);
        });

        test('Robot: Place: Plaxe bad command', () => {
            
            robot.commandController("Plaxe 1,1,N")
            .then(data =>{

            })
            .catch(e => {
                return expect.objectContaining({
                    msgType: "error",
                    msg: "Oh you think you can sneak the PLAXE 1,1,N command past me"
                  })
            })


        });
       
        test('Robot: Place: Place bad location [-1,-1]', () => {

            robot.commandController("Place -1,-1,N")
            .then(data =>{

            })
            .catch(e => {
                return expect.objectContaining([
                    {
                      msgType: "error",
                      msg: "Validation error: Well that X coordinate (-1) isn't going to work. You're outside the board"
                    }
                  ])
            })
            
        });

        test('Robot: Place: Place bad location [0,-1]', ()=>{
            
            robot.commandController("Place 0,-1,N")
            .then(data =>{

            })
            .catch(e => {
                return expect.objectContaining([
                    {
                      msgType: "error",
                      msg: "Validation error: Seriously that's the Y coordinate (-1) you wanted."
                    }
                  ])
            })
            
        })

        test('Robot: Place: Place bad location [5,5] outside the board', ()=>{
            
            robot.commandController("Place 5,5,N")
            .then(data =>{

            })
            .catch(e => {
                return expect.objectContaining([
                    {
                      msgType: 'error',
                      msg: "Validation error: Well that X coordinate (5) isn't going to work. You're outside the board"
                    }
                  ])
            })
        })

        test('Robot: Place: Place bad Direction Flark', ()=>{

            robot.commandController("Place 0,0,Flark")
            .then(data =>{

            })
            .catch(e => {
                return expect.objectContaining([
                    {
                      msgType: 'error',
                      msg: "Validation error: Flark isn't that over in that direction that way."
                    }
                  ])
            })
        })

        test('Robot: Place: Place Good location', ()=>{

            robot.commandController("Place 0,0,N")
            .then(data =>{
                return expect.objectContaining([
                    {
                      msgType: 'success',
                      msg: "I am now at [0,0] and facing N"
                    }
                  ])
            })
            .catch(e => {
                
            })
        })

    })
   
    
});

describe('Testing Values sent to the robot MOVE command valid and invalid', () => {
    beforeEach(() => {
        let robot = null
     });

    describe('Robot: Testing of the move command which is on the board.', () => {
        beforeEach(() => {
            robot = new Robot({'x':5,'y':5}, false);
            robot.commandController("Place 0,0,N")
            .then((data)=>{})
            .catch(e => {})
        });

        test('Robot: Place: Move', () => {
            
            robot.commandController("move")
            .then(data =>{
                return expect.objectContaining(
                    {
                      msgType: 'success',
                      msg: "I am now at [0,1] and facing N"
                    }
                  )
            })
            .catch(e => {
                
            })
        });
        

    })

    describe('Robot: Testing of the move command which is NOT on the board.', () => {
        beforeEach(() => {
            robot = new Robot({'x':5,'y':5}, false);
        });

        test('Robot: Place: Move', () => {

            robot.commandController("move")
            .then(data =>{
                
            })
            .catch(e => {
                return expect.objectContaining({ msgType: 'error', msg: 'Validation error: Can\t have a next move when you don\'t have a first.' })
            })
            
        });
        

    })

    describe('Robot: Testing of the MOVE command in the board corner.', () => {
        beforeEach(() => {
            robot = new Robot({'x':5,'y':5}, false);
        });

        test('Robot: Place: Move placed in [4,4] facing N', () => {
            robot.commandController("Place 4,4,N")
            .then(data => {

            })
            .catch(e => {

            })

            robot.commandController("move")
            .then(data =>{
                
            })
            .catch(e => {
                return expect.objectContaining({ msgType: 'error', msg: 'Im fallllling! Nah I\'m not going anywhere' })
            })
        });

        test('Robot: Place: Move placed in [0,0] facing S', () => {
            robot.commandController("Place 0,0,S")
            .then(data => { })
            .catch(e => { })

            robot.commandController("move")
            .then(data =>{
                
            })
            .catch(e => {
                return expect.objectContaining({ msgType: 'error', msg: 'Im fallllling! Nah I\'m not going anywhere' })
            })
        });
        

    })

});

describe('Testing Values sent to the robot LEFT command valid and invalid', () => {
    beforeEach(() => {
        let robot = null
     });

    describe('Robot: Testing of the LEFT command which is on the board. at [0,0] N', () => {
        beforeEach(() => {
            robot = new Robot({'x':5,'y':5}, false);
            robot.commandController("Place 0,0,N")
            .then(data => { })
            .catch(e => { })
        });

        test('Robot: Place[0,0] N : LEFT', () => {
            robot.commandController("left")
            .then(data =>{
                return expect.objectContaining({ msgType: 'success', msg: 'I am now at [0,0] and facing WEST' })
            })
            .catch(e => {
                
            })

        });

        test('Robot: Place[0,0] WEST : LEFT', () => {
            robot.commandController("left")
            .then(data =>{
                return expect.objectContaining({ msgType: 'success', msg: 'I am now at [0,0] and facing SOUTH' })
            })
            .catch(e => {
                
            })

        });

        test('Robot: Place[0,0] SOUTH : LEFT', () => {
            robot.commandController("left")
            .then(data =>{
                return expect.objectContaining({ msgType: 'success', msg: 'I am now at [0,0] and facing EAST' })
            })
            .catch(e => {
                
            })

        });

        test('Robot: Place[0,0] EAST : LEFT', () => {
            robot.commandController("left")
            .then(data =>{
                return expect.objectContaining({ msgType: 'success', msg: 'I am now at [0,0] and facing NORTH' })
            })
            .catch(e => {
                
            })

        });
        

    })

    describe('Robot: Testing of the Left command which is NOT on the board.', () => {
        beforeEach(() => {
            robot = new Robot({'x':5,'y':5}, false);
            
        });

        test('Robot: Left Not on the board', () => {

            robot.commandController("left")
            .then(data =>{
                
            })
            .catch(e => {
                return expect.objectContaining({ msgType: 'error', msg: 'Rotate Error: Naughty naughty, I\'m not on the grid!' })
            })
        });
        

    })
    
});


describe('Testing Values sent to the robot Right command valid and invalid', () => {
    beforeEach(() => {
        let robot = null
     });

    describe('Robot: Testing of the Right command which is on the board.', () => {
        beforeEach(() => {
            robot = new Robot({'x':5,'y':5}, false);
            robot.commandController("Place 0,0,N")
            .then(data =>{ })
            .catch(e => { })
        });

        test('Robot: Place[0,0]: Right from North', () => {

            robot.commandController("right")
            .then(data =>{
                return expect.objectContaining({ msgType: 'success', msg: 'I am now at [0,0] and facing East' })
            })
            .catch(e => {
                
            })

        });

        test('Robot: Place[0,0]: Right from East', () => {
            robot.commandController("right")
            .then(data =>{
                return expect.objectContaining({ msgType: 'success', msg: 'I am now at [0,0] and facing South' })
            })
            .catch(e => {
                
            })
        });
        
        test('Robot: Place[0,0]: Right from SOUTH', () => {
            robot.commandController("right")
            .then(data =>{
                return expect.objectContaining({ msgType: 'success', msg: 'I am now at [0,0] and facing West' })
            })
            .catch(e => {
                
            })
        });

        test('Robot: Place[0,0]: Right from WEST', () => {
            robot.commandController("right")
            .then(data =>{
                return expect.objectContaining({ msgType: 'success', msg: 'I am now at [0,0] and facing North' })
            })
            .catch(e => {
                
            })
        });

    })

    describe('Robot: Testing of the Right command which is NOT on the board.', () => {
        beforeEach(() => {
            robot = new Robot({'x':5,'y':5}, false);
            
        });

        test('Robot: Place: Move', () => {
            robot.commandController("right")
            .then(data =>{
                
            })
            .catch(e => {
                return expect.objectContaining({
                    msgType: 'error',
                    msg: "Rotate Error: Naughty naughty, I'm not on the grid!"
                  })
            })
            
        });  

    })
    
});

describe('Testing Values sent to the robot Report command valid and invalid', () => {
    beforeEach(() => {
        let robot = null
     });

    describe('Robot: Testing of the Right command which is on the board.', () => {
        beforeEach(() => {
            robot = new Robot({'x':5,'y':5}, false);
            robot.commandController("Place 0,0,N")
            .then(data => { })
            .catch(e => { })
        });

        test('Robot: Report after placement at 0,0,N', () => {
            robot.commandController("report")
            .then(data =>{
                return expect.objectContaining({ msgType: 'success', msg: '0,0,N' })
            })
            .catch(e => {
                
            })
            
        });

    })

    describe('Robot: Testing of the Report command which is NOT on the board.', () => {
        beforeEach(() => {
            robot = new Robot({'x':5,'y':5}, false);
        });

        test('Robot: Report', () => {
            robot.commandController("report")
            .then(data =>{
                
            })
            .caught(e => {
                return expect.objectContaining({ 
                    msgType: "error", 
                    msg: "Nothing to say im not on the board." 
                })
            })
        });
        

    })
    
});