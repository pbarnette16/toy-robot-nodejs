// Class Grid

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

module.exports = new Grid()