# Toy Robot Challenge

```
     ,     ,
    (\____/)
     (_oo_)
       (O)
     __||__    \)
  []/______\[] /
  / \______/ \/
 /    /__\
(\   /____\
```

The application is a simulation of a toy robot moving on a square table top, of dimensions 5 units x 5 units. There are no other obstructions on the table surface. The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.


  |  |  0 | 1  | 2  |  3 | 4  |
  |---|---|---|---|---|---|
  4 |  |   |       |       |      |      |
  3 |   | R  |   |   |   |   |
  2 |   |   |   |   |   |   |
  1 |   |   |   |   |   |   |
  0 |   |   |   |   |   |   |
       
R is the location of the robot in this case (1,3)


### The robot takes the following commands:
- [Place](#place)
- [Move](#move)
- [Left](#left)
- [Right](#right)
- [Report](#report)

Any commands given that are not listed above will be ignored along with any commands that would put the robot in peril.

## Place

Place will put the robot onto the board. If the location and direction given to the place command are not valid the command will be ignored. The robot can be picked up and placed at any time.

`Place X, Y, F`

`X` must be a valid X location on the 5x5 grid.
`Y` must be a valid Y location on the 5x5 grid.
`F` must be a valid direction of:
 - NORTH
 - EAST
 - SOUTH
 - WEST

## Move

`Move` will move the robot one square in direction (NORTH, EAST, SOUTH, WEST) that it is currently facing.

## Left

`Left` will turn the robot 90 degrees to the left face a new direction. As an example, if the robot is facing North, giving the command of `Left` will turn the robot to the West. 

## Right

`Right` will turn the robot 90 degrees to the right to face a new direction. As an example, if the robot is facing North, giving the command of `Right` will turn the robot to the East.

## Report

`Report` will output the current location of the robot. The output will have the same structure as the place command, (X,Y,Direction)

## Other commands

All other commands given to the robot will result in the robot ignoring your commands. Its not very smart, you see.


#### Development Directions

This project is done as a command line interface in able to allow the developer to have a bit of interactivity. As a front-end developer it feels strange to me to not have some kind of interface. 
[Read about the development directions.](DESIGNDIRECTION.md)


## Available Scripts

To get started with the program
`yarn install` This will install all of the necessary files to run the robot.
Please make sure you have the most current version of node.

In the project directory, you can run:
### `yarn app`
This command will start the app.

### `yarn test`
This command will start the tests.

### `yarn test-watch`
This command will run the jest test in watch mode.

### `yarn debug`
This command will start the debugger so that you can run it in chrome to step through the code.

