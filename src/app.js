#!/usr/bin/env node

"use strict";

/* Enviro variables */
const config = require('../config.json');
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';

/* Objects brought into the project */
const validation = require('./util/validation');
let Grid = require('./components/Grid');
let Messaging = require('./util/messaging');
const Help = require('./util/Help');
let {welcomeDescription} = require('./util/welcome');
let Robot = require('./components/Robot')

const Validation = require("./util/validation")


/**
 * To receive input command from user continuously, until user explicity terminate the program
 */
const readInput = () => {
  let stdin = process.openStdin();
  // create grid
  const grid = new Grid.Grid(defaultConfig.grid[0], defaultConfig.grid[1]);
  let robot = null;

  // pubsub call for letting the user know about the grid
  Messaging.emit("normal",grid.sizeStr());

  try {
    robot = new Robot.Robot(grid.dimensions())
  }
  catch(e) {
    Messaging.emit("error", e.message);
    return;
  }
  

  stdin.addListener('data', function(d) {
    let command = d
      .toString()
      .trim()
      .toUpperCase();

      try {
          if(Validation.isValidCommand(command)){
            if(!Validation.isHelpCommand(command)) {
                // sends the command to the robot to process
                robot.emit("commandController", command)
            }
            else {
                // Calls program help
                Help.displayHelp()
            }
              
          }
          else {
            Messaging.emit("error", "Did you really think that command would work on me?")
          }
            
      }
      catch(e) {
          Messaging.emit("error", "Something screwed up.")
      }  


      //console.log(command)

  });
};


/**
 * To initialize this program
 */
const init = () => {
  
    welcomeDescription()

    //console.log(Grid.sizeStr())
    //console.log(Grid.dimensions())

      
    // create a new grid based on the configuration
    //console.log(new Grid.Grid(defaultConfig.grid[0], defaultConfig.grid[1]))

    //console.log(defaultConfig)
    readInput();
};

init();