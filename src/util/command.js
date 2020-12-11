"use strict";

// This is the command structure for the robots commands
// The command input will be checked against the commands listed
// applying the validations if necessary
// the action will control what the robot does next
// the vector is the structure wich will control how the robot moves

const move = require('./move.js')

let rotateVector = move.moveVector.map( obj => {
    let rObj = {}
    rObj["facing"] = obj.facing
    return rObj
    }
)

const commands = [
{
    command: 'PLACE',
    help: "Place will put the robot onto the board. If the location and direction given to the place command are not valid the command will be ignored. The robot can be picked up and placed at any time.",
    validation: ['isOnGrid','isFacingValueValid', 'isPositionValid'],
    action: 'placeRobot'
},
{
    command: 'MOVE',
    help: "`Move` will move the robot one square in direction (NORTH, EAST, SOUTH, WEST) that it is currently facing.",
    validation: ['isOnGrid','canMove'],
    moveVector: move.moveVector,
    action: 'moveObj'
},
{
    command: 'LEFT',
    help: "`Left` will turn the robot 90 degrees to the left face a new direction. As an example, if the robot is facing North, giving the command of `Left` will turn the robot to the West. ",
    validation: ['isOnGrid'],
    rotateVector: rotateVector,
    action: 'rotateLeft'
}, {
    command: 'RIGHT',
    help: "`Right` will turn the robot 90 degrees to the right to face a new direction. As an example, if the robot is facing North, giving the command of `Right` will turn the robot to the East.",
    validation: ['isOnGrid'],
    rotateVector: rotateVector,
    action: 'rotateRight'
}, {
    command: 'REPORT',
    help: "`Report` will output the current location of the robot. The output will have the same structure as the place command, (X,Y,Direction)",
    validation: ['isOnGrid'],
    action: 'returnCurrentLocation'
}, {
    command: "HELP",
    help: "Displays the commands to control the robot.",
    action: 'displayHelp',
    robotIgnore: true
}
];

module.exports = {commands}
