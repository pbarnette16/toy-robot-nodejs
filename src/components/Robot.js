"use strict";

// Robot
// Created as a singleton as there is only one robot on the field at any one point

class Robot {
    currentPos = {
        facing: "Dolor",
        coordinates: [-1, -1],
        onGrid: false
    }

    previousCommands = []

    constructor() {

    }

    commandController(command) {
        
    }

}

module.exports = new Robot()