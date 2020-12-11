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
function isFacingValueValid(req) {
    console.log("req facing direction")
    let direction = req.split(/PLACE\s(\d)[,](\d)[,](\w)/).filter(ele => ele.length > 0)[2]
    return move.moveVector.find((obj) =>{
        return obj.facing === direction || obj.facing[0] === direction
    } ) || false
}

// is grid position valid
function isPositionValid(req, gridDim) {
    console.log(`valid position {$req} {$gridDim}`)
    let dir = req.trim().split(/PLACE\s(\d)[,](\d)[,](\w)/).filter(ele => ele.length > 0)
    
    console.log("dir %o", dir)
    let newPoint = [parseInt(dir[0]), parseInt(dir[1])]
    if(newPoint[0] > -1 && newPoint[0] < gridDim[0]) {
        if(newPoint[1] > -1 && newPoint[1] < gridDim[1]) {
            return true;
        }
         else
            throw new Error("Seriously that's the Y cordinate you wanted.")
    }
        else
            throw new Error("Well that X cordinate isn't going to work.")

    return false;
}

// Checks for the help command
function isHelpCommand(req) {
    return "HELP" === req
}


// creates a validaiton object to be exported and namespace the functions
const Validation = {
    isValidCommand: isValidCommand,
    isFacingValueValid: isFacingValueValid,
    isPositionValid: isPositionValid,
    isHelpCommand: isHelpCommand
}

// Checks for the help command
function getDirection(req) {
    let direction =  req.split(/PLACE\s(\d)[,](\d)[,](\w)/)
}


const Util = {
    getDirection: getDirection,
    getPoints: getPoints
}



module.exports = {Validation, Util};