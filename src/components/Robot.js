"use strict";

const Messaging = require("../util/messaging");
const EventEmitter = require('events').EventEmitter;
const Validation = require("../util/validation");
const Commands = require('../util/command')

// Robot
// Created as a singleton as there is only one robot on the field at any one point
class Robot extends EventEmitter{
    currentPos = {
        facing: "Dolor",
        coordinates: [-1, -1],
        validCommand: false
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
        //console.log("command controller %s %o", robotInput, Commands)
        if(Validation.isValidCommand(robotInput)) {
            let currentAction = Commands.commands.find((obj) => {
                return obj.command === req.split(' ')[0]
            })
            console.log("currentAction %o", currentAction)
        }
        else {
            throw new Error("You didn't think you'd slip that command past me did you?")
        }

    }

    placeRobot(command) {

    }

    setDirection() {

    }

    setCoordinates() {

    }

}

module.exports.Robot = Robot