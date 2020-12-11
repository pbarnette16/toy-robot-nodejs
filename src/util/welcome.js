"use strict";
 
let Messaging = require('./messaging.js');
/**
 * To print out a brief guide to assist new users to the toy robot
 */
const welcomeDescription = () => {

    Messaging.emit("normal", "The application is a simulation of a toy robot moving on a square table top, of dimensions 5 units x 5 units. There are no other obstructions on the table surface. The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.\n")
    
    Messaging.emit("normal", "To end this program, press CTRL+C (for Windows) or Command+C (for Mac) on your keyboard\n")
   
    
    Messaging.emit("normal", "Each command needs to be on its own line so be sure to hit return\n")
    Messaging.emit("normal", "If you forget a command type help\n")
    Messaging.emit("announce", "Good luck be kind to the robot he's sassy")

  };

  module.exports = {welcomeDescription}