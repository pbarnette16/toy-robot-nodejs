// Messaging module
// Created as a singleton as there doesn't need to be more than one Messaging Object in the project.

const chalk = require('chalk');
const  typewriter = require('node-typewriter');

class Messaging {
    constructor() {

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
    const error = async message => {
        typewriter(chalk.white.bgRed(message)).then( () => {
        console.log("\n")
    })
    }
}

module.exports = new Messaging()