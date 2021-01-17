const Robot = require('./Robot');

describe('Creation of a Robot', () => {
    beforeEach(() => {
        let robot = null
     });

    test('checking to see if no grid is sent to the robot constructor', () => {
        expect(() => {
            robot = new Robot()}
            ).toThrow("You have not set a valid grid. Try again");
    });

    test('checking to see if a negative grid is sent to the robot constructor', () => {
        expect(() => {
            robot = new Robot({'x':-1,'y':-10}, false)}
            ).toThrow("You have not set a valid grid. Try again");
    });

    test('checking to see if a [0,0] grid is sent to the robot constructor', () => {
        expect(() => {
            robot = new Robot({'x':0,'y':0}, false)}
            ).toThrow("You have not set a valid grid. Try again");
    });

    test('checking to see if a [5,5] grid is sent to the robot constructor', () => {
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
                return expect(e).objectContaining({
                    msgType: 'error',
                    msg: 'Oh you think you can sneak the PLAXE 1,1,N command past me'
                  })
            })


        });
        
        test('Robot: Place: Place bad location [-1,-1]', () => {

            robot.commandController("Place -1,-1,N")
            .then(data =>{

            })
            .catch(e => {
                return expect(e).objectContaining([
                    {
                      msgType: 'error',
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
                return expect(e).objectContaining([
                    {
                      msgType: 'error',
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
                return expect(e).objectContaining([
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
                return expect(e).objectContaining([
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
                return expect(e).objectContaining([
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
        });

        test('Robot: Place: Move', () => {
            
            robot.commandController("Place 0,0,N")
            .then(data =>{
                return expect(e).objectContaining([
                    {
                      msgType: 'success',
                      msg: "I am now at [0,1] and facing N"
                    }
                  ])
            })
            .catch(e => {
                
            })
        });
        

    })

    describe('Robot: Testing of the move command which is NOT on the board.', () => {
        beforeEach(() => {
            robot = new Robot({'x':5,'y':5});
            
        });

        test('Robot: Place: Move', () => {
            expect( () => {
                robot.emit("commandController", "Move")
            }).toThrow("Whay are you trying to get me killed?")
        });
        

    })

    describe('Robot: Testing of the MOVE command in the board corner.', () => {
        beforeEach(() => {
            robot = new Robot({'x':5,'y':5});
            robot.emit("commandController", "Place 0,0,W")
        });

        test('Robot: Place: Move', () => {
            expect( () => {
                robot.emit("commandController", "Move")
            }).toThrow("Whay are you trying to get me killed?")
        });
        

    })
    
});

describe('Testing Values sent to the robot LEFT command valid and invalid', () => {
    beforeEach(() => {
        let robot = null
     });

    describe('Robot: Testing of the LEFT command which is on the board.', () => {
        beforeEach(() => {
            robot = new Robot({'x':5,'y':5});
            robot.emit("commandController", "Place 0,0,N")
        });

        test('Robot: Place: LEFT', () => {
            expect( () => {
                robot.emit("commandController", "Move")
            }).stringContaining("I am now at [0,0] and facing WEST")
        });
        

    })

    describe('Robot: Testing of the Left command which is NOT on the board.', () => {
        beforeEach(() => {
            robot = new Robot({'x':5,'y':5});
            
        });

        test('Robot: Place: Move', () => {
            expect( () => {
                robot.emit("commandController", "Move")
            }).toThrow("Rotate Error: Naughty naughty, I'm not on the grid!")
        });
        

    })
    
});

describe('Testing Values sent to the robot LEFT command valid and invalid', () => {
    beforeEach(() => {
        let robot = null
     });

    describe('Robot: Testing of the LEFT command which is on the board.', () => {
        beforeEach(() => {
            robot = new Robot({'x':5,'y':5});
            robot.emit("commandController", "Place 0,0,N")
        });

        test('Robot: Place: LEFT', () => {
            expect( () => {
                robot.emit("commandController", "Left")
            }).stringContaining("I am now at [0,0] and facing WEST")
        });
        

    })

    describe('Robot: Testing of the Left command which is NOT on the board.', () => {
        beforeEach(() => {
            robot = new Robot({'x':5,'y':5});
            
        });

        test('Robot: Place: Move', () => {
            expect( () => {
                robot.emit("commandController", "Left")
            }).toThrow("Rotate Error: Naughty naughty, I'm not on the grid!")
        });
        

    })
    
   
    
});

describe('Testing Values sent to the robot Right command valid and invalid', () => {
    beforeEach(() => {
        let robot = null
     });

    describe('Robot: Testing of the Right command which is on the board.', () => {
        beforeEach(() => {
            robot = new Robot.Robot({'x':5,'y':5});
            robot.emit("commandController", "Place 0,0,N")
        });

        test('Robot: Place: Right from North', () => {
            expect( () => {
                robot.emit("commandController", "Right")
            }).stringContaining("I am now at [0,0] and facing WEST")
        });

        test('Robot: Place: Right from West', () => {
            expect( () => {
                robot.emit("commandController", "Right")
            }).stringContaining("I am now at [0,0] and facing SOUTH")
        });
        
        test('Robot: Place: Right from SOUTH', () => {
            expect( () => {
                robot.emit("commandController", "Right")
            }).stringContaining("I am now at [0,0] and facing EAST")
        });

        test('Robot: Place: Right from EAST', () => {
            expect( () => {
                robot.emit("commandController", "Right")
            }).stringContaining("I am now at [0,0] and facing NORTH")
        });

    })

    describe('Robot: Testing of the Left command which is NOT on the board.', () => {
        beforeEach(() => {
            robot = new Robot.Robot({'x':5,'y':5});
            
        });

        test('Robot: Place: Move', () => {
            expect( () => {
                robot.emit("commandController", "Right")
            }).toThrow("Rotate Error: Naughty naughty, I'm not on the grid!")
        });
        

    })
    
});

describe('Testing Values sent to the robot Report command valid and invalid', () => {
    beforeEach(() => {
        let robot = null
     });

    describe('Robot: Testing of the Right command which is on the board.', () => {
        beforeEach(() => {
            robot = new Robot({'x':5,'y':5});
            robot.emit("commandController", "Place 0,0,N")
        });

        test('Robot: Report after placement at 0,0,N', () => {
            expect( () => {
                robot.emit("commandController", "Report")
            }).stringContaining("0,0,N")
        });

    })

    describe('Robot: Testing of the Report command which is NOT on the board.', () => {
        beforeEach(() => {
            robot = new Robot({'x':5,'y':5});
        });

        test('Robot: Report', () => {
            expect( () => {
                robot.emit("commandController", "Report")
            }).toThrow("Nothing to say im not on the board.")
        });
        

    })
    
});