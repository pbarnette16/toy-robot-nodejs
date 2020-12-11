"use strict";

const command = require('./command.js')
const move = require('./move.js')

// is valid command
// returns the object if it is found otherwise returns false
function isValidCommand(req) {
   return command.commands.find((obj) => {
        return obj.command === req.split(' ')[0]
    }) || false;
}

// is valid direction
// checks to see if the direction is a valid direction
// compares the complete string or just the first character of the listed directions
// returns the object if it is found otherwise returns false
function isValidDirection(req) {
    return move.moveVector.find((obj) =>{
        return obj.facing === req || obj.facing[0] === req
    } ) || false
}

// is grid position valid
function isGridPositionValid(req, gridDim) {
    return false;
}

function isHelpCommand(req) {
    return "HELP" === req
}

// creates a validaiton object to be exported and namespace the functions
const Validation = {
    isValidCommand: isValidCommand,
    isValidDirection: isValidDirection,
    isGridPositionValid: isGridPositionValid,
    isHelpCommand: isHelpCommand
}

module.exports = Validation;