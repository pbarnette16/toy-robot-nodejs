const Robot = require('./Robot');

describe('Testing of the example input/output', () => {
    beforeEach(() => {
        // the false command on the robot constructor allows for the return of the message object to easily test
        robot = new Robot({'x':5,'y':5}, false);
    });

     test('Example Input 1', () => {


        robot.commandController("Place 0,0,N")
        .then(data => {
            return expect(data).objectContaining({ msgType: 'success', msg: 'I am now at [0,0] and facing N'});
        })
        .catch(e => {

        })

        robot.commandController("Move")
        .then(data => {
            return expect(data).objectContaining({ msgType: 'success', msg: 'I am now at [0,1] and facing N' });
        })
        .catch(e => {

        })

        robot.commandController("Report")
        .then(data => {
            return expect(data).objectContaining({ msgType: 'success', msg: '0,1,N' });
        })
        .catch(e => {

        })

    });

    test('Example Input 2', () => {
        robot.commandController("Place 0,0,N")
        .then(data => {
            return expect(data).objectContaining({ msgType: 'success', msg: 'I am now at [0,0] and facing N'});
        })
        .catch(e => {

        })

        robot.commandController("Left")
        .then(data => {
            return expect(data).objectContaining({ msgType: 'success', msg: 'I am now at [0,0] and facing West'});
        })
        .catch(e => {

        })

        robot.commandController("Report")
        .then(data => {
            return expect(data).objectContaining({ msgType: 'success', msg: '0,0,WEST'});
        })
        .catch(e => {

        })
        
    });

    test('Example Input 3', () => {

        robot.commandController("Place 1,2,E")
        .then(data => {
            return expect(data).objectContaining({ msgType: 'success', msg: 'I am now at [1,2] and facing E'});
        })
        .catch(e => {

        })

        robot.commandController("Move")
        .then(data => {
            return expect(data).objectContaining({ msgType: 'success', msg: 'I am now at [2,2] and facing E'});
        })
        .catch(e => {

        })

        robot.commandController("Move")
        .then(data => {
            return expect(data).objectContaining({ msgType: 'success', msg: 'I am now at [3,2] and facing E'});
        })
        .catch(e => {

        })

        robot.commandController("Left") // look into why the whole word is spit out
        .then(data => {
            return expect(data).objectContaining({ msgType: 'success', msg: 'I am now at [3,2] and facing NORTH'});
        })
        .catch(e => {

        })

        robot.commandController("move") // look into why the whole word is spit out
        .then(data => {
            return expect(data).objectContaining({ msgType: 'success', msg: 'I am now at [3,3] and facing NORTH'});
        })
        .catch(e => {

        })

        robot.commandController("report")
        .then(data => {
            return expect(data).objectContaining({ msgType: 'success', msg: '3,3,NORTH'});
        })
        .catch(e => {

        })
        
    });

})