"use strict";

const Messaging = require("../util/messaging");
const {Validation, Util} = require("../util/validation");
const Commands = require('../util/command')
const Move = require('../util/move')

let EventEmitter = require("events").EventEmitter;
let Promise = require("bluebird");
const { reject } = require("bluebird");

// Robot
// Created as a singleton as there is only one robot on the field at any one point
class Robot{
    currentPos = {
        facing: "Dolor",
        coordinates: [-1, -1]
    }
    gridSizeObj = [-1,-1]

    onGrid = false

    previousCommands = []

    announce = true

    outputObj = null

    constructor(dimensions, announce = true) {
        //super()
        this.gridSize = dimensions;   
        
        //this.addListener("commandController", this.commandController);
        //util.promisify(this.emit)
        //this.on('finish instruction', this.finishInstruction)
        this.commandController = Promise.promisifyAll(this.commandController);

        this.announce = announce;
        this.output = null
        if(this.announce) {
            Messaging.emit("normal", "Your robot has been built\n");
        }
        
    }

    set gridSize(dimensions) {
        //console.log(`${dimensions} ${dimensions.hasOwnProperty('x')} ${dimensions.hasOwnProperty('y')}`)
        try {

            if(dimensions.x > 0 && dimensions.y > 0) {
              this.gridSizeObj[0] = dimensions.x;
              this.gridSizeObj[1] = dimensions.y;
           }
           else
            throw new Error("You have not set a valid grid. Try again")
                
        }
        catch(e) {
            throw new Error("You have not set a valid grid. Try again")
        }
        
    }

    get gridSize() {
        return this.gridSizeObj;
    }

    set robotOnGrid(val) {
        this.onGrid = val;
    }

    get robotOnGrid() {
        return this.onGrid;
    }

    finishInstruction() {
        return this.outputObj;
    }

    commandController(robotInput){
        this.outputObj = null
        let robotInputLocal = robotInput
        //console.log("command controller %s %o %o", robotInput, Commands, Validation.isValidCommand(robotInput))
        if(Validation.isValidCommand(robotInputLocal)) {
            let currentAction = Commands.commands.find((obj) => {
                return obj.command === robotInputLocal.split(' ')[0]
            })
            //console.log("currentAction %o", currentAction)

            let outputObj =  this[currentAction.action]({"command": robotInputLocal, "currentAction": currentAction})

            //console.log("output log" + outputObj)

            if(this.announce) {
                Messaging.emit(outputObj.msgType, outputObj.msg)
            }
            else {
                //console.log("setting output: "+ outputObj)
                this.outputObj = outputObj;
                //this.emit('finish instruction')
                
                return Promise.resolve(this.outputObj);
                
            }
        }
        else {
            if(this.announce) {
                Messaging.emit("error", `Oh you think you can sneak the ${robotInputLocal} command past me`)
            }
            else {
                return Promise.reject({msgType: "error", msg: `Oh you think you can sneak the ${robotInputLocal} command past me`})
            }
        }

    }

    placeRobot(commandObj) {
        let valid = null,
        command = commandObj.command;
        try {
            valid = this.runValidation(command, commandObj.currentAction.validation);
        }
        catch(e) {
            valid = {msgType: "error", msg: "Place robot error:" +e.message}
        }
            // iterate over the valid array to see if we find a false
            

        if(!valid.hasOwnProperty("msgType") && valid.find(ele => ele === false) === undefined) {
            return this.addPlacement(Util.getPoints(commandObj.command), Util.getDirection(commandObj.command))
        }
        else {
            return [valid, { msgType: "error", msg: "Please don't put me in a bad place."}]
        }

    }

    addPlacement(point, direction) {
        this.currentPos.coordinates = point;
        this.currentPos.facing = direction;
        this.robotOnGrid = true;
        this.previousCommands.push(new Object(this.currentPos))
        return {msgType: "success", msg: `I am now at [${point.join(",")}] and facing ${direction}` } 
    }

    returnCurrentLocation() {
        if(this.robotOnGrid) {
            const outputStr = this.currentPos.coordinates.join(",") + "," + this.currentPos.facing
            return {msgType: "success", msg: outputStr};
        }
        else {
            return {msgType: "error", msg:"Nothing to say im not on the board." };
        }
        
    }


    rotate(commandObj) {
        let valid = null,
        command = commandObj.command
        try {
            valid = this.runValidation(command, commandObj.currentAction.validation);
        }
        catch(e) {
            Messaging.emit("error", "Rotate Validation error:" +e.message)
        }

        if(!valid.hasOwnProperty("msgType") && valid[0]) { // the validation came back true
           
            let rotateDir = (command === "LEFT") ? -1 : 1;
            
            let rotateVector = commandObj.currentAction.rotateVector;
            let index = rotateVector.findIndex((ele) => {
                return ele.facing === this.currentPos.facing || ele.facing[0] === this.currentPos.facing
            })
            // if the index is -1 it couldnt find the current direction
            // this is an error
            if(index === -1) {
                return {msgType: "error", msg: "Rotate Error: How did that direction slip through?"};
            }

            // reached the end of the directions vector, wrap around
            if(index + rotateDir === rotateVector.length) {
                index = 0;
            }
            // reached the beginning of the directions vector, wrap around
            else if(index + rotateDir === -1){
                index = rotateVector.length-1
            }
            else {
                // move to the next direction
                index += rotateDir 
            }
            // update the placement with the new facing direction
            return this.addPlacement(this.currentPos.coordinates, rotateVector[index].facing)

        }
        else {
            // The robot is not on the grid
            return {msgType: "error", msg :"Rotate Error: Naughty naughty, I'm not on the grid!"}
        }

    }

    move(commandObj) {
        let valid = null,
        command = commandObj.command
        try {
            valid = this.runValidation(command, commandObj.currentAction.validation);
        }
        catch(e) {
            return {msgType: "error", msg: "Move Error:" + e.message};
        }

            // iterate over the valid array to see if we find a false
            // if no false is found undefined will be returned
        if(!valid.hasOwnProperty("msgType") && valid.find(ele => ele === false) === undefined) {
            let nextMove = Move.moveVector.find((ele) => {
                return ele.facing === this.currentPos.facing || ele.facing[0] === this.currentPos.facing
            })
        
            let newPosition = Util.getNewPoint(this.currentPos.coordinates, nextMove.move)

            return this.addPlacement(newPosition, this.currentPos.facing)
        }
        else {
            return {msgType: "error", msg: "Whay are you trying to get me killed?"};
        }

    }

    runValidation(command, validation) {
    
        let valid = false;
        let validArr = [];
        try {
            validation.forEach(item => {
                if(item === "isOnGrid") {
                    validArr.push(this.robotOnGrid)
                }
                else if(item === "canMove" && this.robotOnGrid) {
                    validArr.push(Validation[item](this.gridSize, this.currentPos))
                }
                else {
                    validArr.push(Validation[item](command, this.gridSize));
                }

                 
        })
        }
        catch(e) {
            //console.log("validation threw an error: " + e.message)
            return {msgType: "error", msg: "Validation error: " + e.message}
            
        }
        
        //console.log(validArr)
        return validArr

    }

}

module.exports = Promise.promisifyAll(Robot);