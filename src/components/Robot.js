"use strict";

const Messaging = require("../util/messaging");
const EventEmitter = require('events').EventEmitter;
const {Validation, Util} = require("../util/validation");
const Commands = require('../util/command')

// Robot
// Created as a singleton as there is only one robot on the field at any one point
class Robot extends EventEmitter{
    currentPos = {
        facing: "Dolor",
        coordinates: [-1, -1]
    }
    gridSizeObj = [-1,-1]

    onGrid = false

    previousCommands = []

    constructor(dimensions) {
        super()
        this.gridSize = dimensions
        Messaging.emit("normal", "Your robot has been built\n");
        this.addListener("commandController", this.commandController)
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

    commandController(robotInput) {
        debugger
        console.log("command controller %s %o %o", robotInput, Commands, Validation.isValidCommand(robotInput))
       
        if(Validation.isValidCommand(robotInput)) {
            let currentAction = Commands.commands.find((obj) => {
                return obj.command === robotInput.split(' ')[0]
            })
            console.log("currentAction %o", currentAction)

            this[currentAction.action]({"command": robotInput, "currentAction": currentAction})
        }
        else {
            throw new Error("You didn't think you'd slip that command past me did you?")
        }

    }

    placeRobot(commandObj) {
        let valid = null,
        command = commandObj.command;
        try {
            valid = this.runValidation(command, commandObj.currentAction.validation);
        }
        catch(e) {
            Messaging.emit("error", e.message)
        }

            // iterate over the valid array to see if we find a false
            // if no false is found undefined will be returned
        if(valid.find(ele => ele === false) === undefined) {
            this.addPlacement(Util.getPoints(command), Util.getDirection(command))
        }

    }

    addPlacement(point, direction) {
        this.currentPos.coordinates = point;
        this.currentPos.facing = direction;
        this.onGrid = true;
        this.previousCommands.push(new Object(this.currentPos))
        //Messaging.emit("success", `I am now at ${point.join(",")} and facing ${direction}`)
    }

    returnCurrentLocation() {
        const outputStr = this.currentPos.coordinates.join(",") + "," + this.currentPos.facing
        Messaging.emit("success", outputStr)
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

        if(valid[0]) { // the validation came back true
            console.log("rotate %o  valid %o", commandObj, valid);
            let rotateDir = (command === "Left") ? -1 : 1;
            
            let rotateVector = commandObj.currentAction.rotateVector;
            let index = rotateVector.findIndex((ele) => {
                return ele.facing === this.currentPos.facing || ele.facing[0] === this.currentPos.facing
            })
            // if the index is -1 it couldnt find the current direction
            // this is an error
            if(index === -1) {
                Messaging.emit("error", "Rotate Error: How did that direction slip through?")
            }

            // reached the end of the directions vector, wrap around
            if(index + rotateDir === rotateVector.length) {
                index = 0;
            }
            // reached the beginning of the directions vector, wrap around
            else if(index + rotateDir < -1){
                index = rotateVector.length-1
            }
            else {
                // move to the next direction
                index += rotateDir 
            }
            // update the placement with the new facing direction
            this.addPlacement(this.currentPos.coordinates, rotateVector[index].facing)

        }
        else {
            // The robot is not on the grid
            Messaging.emit("error", "Rotate Error: Naughty naughty, I'm not on the grid!")
        }

    }

    move(commandObj) {
        let valid = null,
        command = commandObj.command
        try {
            valid = this.runValidation(command, commandObj.currentAction.validation);
        }
        catch(e) {
            Messaging.emit("error", "Move Error:" + e.message)
        }
    }

    runValidation(command, validation) {
        debugger
        let valid = false;
        let validArr = [];
        try {
            validation.forEach(item => {
                console.log(item)
                if(item === "isOnGrid") {
                    validArr.push(this.robotOnGrid)
                }
                else {
                    validArr.push(Validation[item](command, this.gridSize));
                }
                 
        })
        }
        catch(e) {
            console.log("validation threw an error: " + e.message)
            Messaging.emit("error", e.message)
        }
        
        console.log(validArr)
        return validArr

    }

}

module.exports.Robot = Robot