"use strict";

const { dim } = require("chalk");
const Messaging = require("../util/messaging");
const EventEmitter = require('events').EventEmitter;
const Validation = require("./util/validation")

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
        if(dimensions.x > 0 && dimensions.y > 0) {
            this.gridSizeObj[0] = dimensions.x;
            this.gridSizeObj[1] = dimensions.y;
        }
        else
            throw new Error("I cant move on that size grid. Please")
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

    commandController(command) {
        
    }

    placeRobot(command) {

    }

    setDirection() {

    }

    setCoordinates() {

    }

}

module.exports.Robot = Robot