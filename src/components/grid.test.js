const Grid = require('./Grid');

describe('Creation of a default Grid Object', () => {
   
    const grid = new Grid();
    const defaultGrid = { 'x':5, 'y':5}; 
    
    test('checking to see if a defult grid is [5,5]', async () => {
        return expect(grid.dimensions()).toEqual(defaultGrid);
    });

    test('check to see output of size = [5,5]', async () => {
        return expect(grid.sizeStr()).toContain("[5,5]")
    })
})

describe('Creation of a larger [9,9] Grid Object', () => {

    const grid = new Grid(9,9);
    const alternateGrid = { 'x':9, 'y':9};

    test('check to see if alternate of a [9,9] grid is created', async () => {
        return expect(grid.dimensions()).toEqual(alternateGrid);
    })

    test('check to see output of size = [9,9]', () => {
        return expect(grid.sizeStr()).toContain("[9,9]")
    })
})


describe('Creation of a Grid Object with negative inputs', () => {

    const grid = new Grid(-20,-20);
    const alternateGrid = { 'x':5, 'y':5};

    test('check to see if grid of [5,5] created from (-20,-20)', async () => {
        return expect(grid.dimensions()).toEqual(alternateGrid);
    })

    test('check to see output of size = [5,5]', async () => {
        return expect(grid.sizeStr()).toContain("[5,5]")
    })
})

describe('Creation of a Grid Object with alpha inputs', () => {

    const grid = new Grid('a','b');
    const alternateGrid = { 'x':5, 'y':5}; 

    test('check to see if grid of [5,5] created from ("a", "b")', async () => {
        return expect(grid.dimensions()).toEqual(alternateGrid);
    })

    test('check to see output of size = [5,5]', async () => {
        return expect(grid.sizeStr()).toContain("[5,5]")
    })
})

describe('Creation of a Grid Object with symbol inputs', () => {

    const grid = new Grid('#','$');
    const alternateGrid = { 'x':5, 'y':5};

    test('check to see if grid of [5,5] created ("#","$")', async () => {
        return expect(grid.dimensions()).toEqual(alternateGrid);
    })

    test('check to see output of size = [5,5]', async () => {
        return expect(grid.sizeStr()).toContain("[5,5]")
    })
})


describe('Creation of a Grid Object with Huge size', () => {

    const grid = new Grid(1000,1000);
    const alternateGrid = { 'x':1000, 'y':1000}; 

    test('check to see if grid of [1000,1000] created from (1000,1000)', async () => {
        return expect(grid.dimensions()).toEqual(alternateGrid);
    })

    test('check to see output of size = [1000,1000]', async () => {
        return expect(grid.sizeStr()).toContain("[1000,1000]")
    })
})

describe('Creation of a Grid Object with negative/positive values', () => {

    const grid = new Grid(-1,5);
    const alternateGrid = { 'x':5, 'y':5};

    test('check to see if grid of [5,5] created from (-1,5)', async () => {
        return expect(grid.dimensions()).toEqual(alternateGrid);
    })

    test('check to see output of size = [5,5]', async () => {
        return expect(grid.sizeStr()).toContain("[5,5]")
    })
})

describe('Creation of a Grid Object with positive/negative values', () => {

    const grid = new Grid(10,-5);
    const alternateGrid = { 'x':10, 'y':5};

    test('check to see if grid of [10,5] created from (10,-5)', async () => {
        return expect(grid.dimensions()).toEqual(alternateGrid);
    })

    test('check to see output of size = [10,5]', async () => {
        return expect(grid.sizeStr()).toContain("[10,5]")
    })
})