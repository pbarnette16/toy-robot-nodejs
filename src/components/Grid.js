"use strict";

// Class Grid
// The Grid class is used as a singleton though its not 100% as
// it isnt passing in the new command at the export, however,
// this would be fixed on a further implimentation

class Grid {
    x = 0;
    y = 0;

    constructor(x = 5, y = 5) {  
        this.x = x;
        this.y = y;
    }

    dimensions ()  {
        return {
            x: this.x,
            y: this.y
        }
    }

    sizeStr () {
        return "The grid has been created\nThe grid dimensions are [" + this.x + "," + this.y + "]."
    }

}

module.exports.Grid = Grid