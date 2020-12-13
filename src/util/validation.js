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
    //console.log("req facing direction")
    let direction = Util.getDirection(req)
    return move.moveVector.find((obj) =>{
        return obj.facing === direction || obj.facing[0] === direction
    } ) || false
}

// is grid position valid
function isPositionValid(req, gridDim) {
    let dir = Util.getPoints(req)
    
    let newPoint = [parseInt(dir[0]), parseInt(dir[1])]
    if(newPoint[0] > -1 && newPoint[0] < gridDim[0]) {
        if(newPoint[1] > -1 && newPoint[1] < gridDim[1]) {
            return true;
        }
         else {
            throw new Error("Seriously that's the Y cordinate you wanted.")
         }
            
    }
    else {
            throw new Error("Well that X cordinate isn't going to work.")
    }
            

    return false;
}

// Can the robot move 
function canMove(gridSize, currentPos) {
    
    let nextMove = move.moveVector.find((ele) => {
        return ele.facing === currentPos.facing || ele.facing[0] === currentPos.facing
    })

    let newPosition = Util.getNewPoint(currentPos.coordinates, nextMove.move)

    return (newPosition[0] > -1 && newPosition[1] > -1
    && newPosition[0] < gridSize[0] && newPosition[1] < gridSize[1]) ? true : false;
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
    isHelpCommand: isHelpCommand,
    canMove: canMove
}

// Util function to return directions
function getDirection(req) {
   return getPointsAndDirection(req)[2];
}

// Util function to return the points
function getPoints(req) {
    let point = new Array(2)
    let dirArr = getPointsAndDirection(req);
    point[0] = parseInt(dirArr[0])
    point[1] = parseInt(dirArr[1])
    return point;
}

// Util function that uses a regex to return the points and direction
// filters out any null strings
function getPointsAndDirection(req) {
    return req.split(/PLACE\s(\d)[,](\d)[,](\w)/)
                .filter(ele => ele.length > 0)
}


function getNewPoint(currentPoint, changePoint) {
    return [currentPoint[0]+changePoint[0], currentPoint[1]+changePoint[1]];
}

const Util = {
    getDirection: getDirection,
    getPoints: getPoints,
    getNewPoint: getNewPoint
}



module.exports = {Validation, Util};