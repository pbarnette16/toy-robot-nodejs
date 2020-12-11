#!/usr/bin/env node

const validation = require('./util/validation.js')
const chalk = require('chalk');
require('./util/messaging')
let Grid = require('./components/Grid');
let Messaging = require('./util/messaging.js');

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

    console.log(Grid.sizeStr())
    console.log(Grid.dimensions())

  Messaging.announce(Grid.sizeStr())  
  readInput();
};

init();