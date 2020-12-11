#!/usr/bin/env node

"use strict";

/* Enviro variables */
const config = require('../config.json');
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';

/* Objects brought into the project */
const validation = require('./util/validation.js');
let Grid = require('./components/Grid');
let Messaging = require('./util/messaging.js');
const Help = require('./util/Help');
const EventEmitter = require('events').EventEmitter;


/**
 * To receive input command from user continuously, until user explicity terminate the program
 */
const readInput = () => {
  let stdin = process.openStdin();

  stdin.addListener('data', function(d) {
    let command = d
      .toString()
      .trim()
      .toUpperCase();


  });
};


/**
 * To initialize this program
 */
const init = () => {
  //explainer.printHeader();
  //explainer.printDescription();

    //console.log(Grid.sizeStr())
    //console.log(Grid.dimensions())

      
    // create a new grid based on the configuration
    //console.log(new Grid.Grid(defaultConfig.grid[0], defaultConfig.grid[1]))
    const grid = new Grid.Grid(defaultConfig.grid[0], defaultConfig.grid[1]);


    // pubsub call for letting the user know about the grid
    Messaging.emit("normal",grid.sizeStr());  
    
    // Calls program help
    Help.displayHelp()

    console.log(defaultConfig)
    readInput();
};

init();