const Grid = require('./Grid');

describe('Creation of a default Grid Object', () => {
    const grid = new Grid();
    const defaultGrid = { 'x':5, 'y':5};
    
    test('checking to see if a defult grid is [5,5]', () => {
        expect(grid.dimensions()).toEqual(defaultGrid);
    });

    test('check to see output of size = [5,5]', () => {
        expect(grid.sizeStr()).toContain("[5,5]")
    })
})

describe('Creation of a larger [9,9] Grid Object', () => {
    const grid = new Grid(9,9);
    const alternateGrid = { 'x':9, 'y':9};
    test('check to see if alternate of a [9,9] grid is created', () => {
        expect(grid.dimensions()).toEqual(alternateGrid);
    })

    test('check to see output of size = [9,9]', () => {
        expect(grid.sizeStr()).toContain("[9,9]")
    })
})


describe('Creation of a Grid Object with negative inputs', () => {
    const grid = new Grid(-20,-20);
    const alternateGrid = { 'x':5, 'y':5};
    test('check to see if grid of [-20,-20] created', () => {
        expect(grid.dimensions()).toEqual(alternateGrid);
    })

    test('check to see output of size = [5,5]', () => {
        expect(grid.sizeStr()).toContain("[5,5]")
    })
})

describe('Creation of a Grid Object with alpha inputs', () => {
    const grid = new Grid('a','b');
    const alternateGrid = { 'x':5, 'y':5};
    test('check to see if grid of [a,b] created', () => {
        expect(grid.dimensions()).toEqual(alternateGrid);
    })

    test('check to see output of size = [5,5]', () => {
        expect(grid.sizeStr()).toContain("[5,5]")
    })
})

describe('Creation of a Grid Object with symbol inputs', () => {
    const grid = new Grid('#','$');
    const alternateGrid = { 'x':5, 'y':5};
    test('check to see if grid of [#,$] created', () => {
        expect(grid.dimensions()).toEqual(alternateGrid);
    })

    test('check to see output of size = [5,5]', () => {
        expect(grid.sizeStr()).toContain("[5,5]")
    })
})