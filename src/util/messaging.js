"use strict";

// Messaging module
// Created as a singleton as there doesn't need to be more than one Messaging Object in the project.

const chalk = require('chalk');
const  typewriter = require('node-typewriter');
const EventEmitter = require('events').EventEmitter;

class Messaging extends EventEmitter{
    constructor() {
        super()
        this.on("announce", this.announce)
        this.on("info", this.info)
        this.on("success", this.success)
        this.on("error", this.error)
        this.on("normal", this.normal)
    }

    /**
    * To announce an action
    *
    * @param {string} message - The message to be displayed in the console
    */
    announce = async message => {
        typewriter(chalk.hex("#999")(message)).then(() =>{
            console.log(chalk.green("\n"));
      });
    }
    /**
     * To show a positve  message to the console
     *
     * @param {string} message - The message to be displayed in the console
     */
    info = async message => {
        typewriter(chalk.green(message)).then(() =>{
              console.log(chalk.green("\n"));
        })
    }
    /**
     * To show a success message to the console
     *
     * @param {string} message - The message to be displayed in the console
     */
    success = async message => {
        typewriter(chalk.black.bgGreen(message)).then( () => {
            console.log("\n")
        })
    }

    /**
     * To show an error message to the console
     *
     * @param {string} message - The message to be displayed in the console
     */
    error = async message => {
        typewriter(chalk.white.bgRed(message)).then( () => {
            console.log("\n")
        })
    }

    /**
    * To display a normal message
    *
    * @param {string} message - The message to be displayed in the console
    */
    normal = async message => {
        console.log(chalk.hex("#FFF")(message))
    }   
}

module.exports = new Messaging()