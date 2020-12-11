"use strict";

// Help Class
// A class that will display a help message for the user
// Created as a singleton as we dont need multiple ones in the project

const command = require('./command.js');
const ee = new (require('events').EventEmitter)();
let Messaging = require('./messaging.js');

class Help  {
    commands = null
    constructor() {
        // simplify the command structure to only display the commands and helper text
        this.commands = command.commands.map( obj => {
            let rObj = {}
            rObj["command"] = obj.command;
            rObj["help"] = obj.help;
            return rObj;
            }
        )
    }

    displayHelp() {
        // reduce the array to a string output
       let outputstring =  this.commands.reduce( (acc, curVal) => {
           // if acc is an object, which is the first go through send an empty string so it doesnt muddle the display
           return ((typeof acc === 'object') ? '' : acc) + curVal.command + " - " + curVal.help + "\n\n"
       })
    
       // calls the normal text display for the string using pub/sub
       Messaging.emit("normal", outputstring);
       //Messaging.emit("announce", outputstring);
    }

}

module.exports = new Help();