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
  0 |   |   |   |   |   |   |
  1 |   | R  |   |   |   |   |
  2 |   |   |   |   |   |   |
  3 |   |   |   |   |   |   |
  4 |   |   |   |   |   |   |
       

The robot takes the following commands:
- [Place](#place)
- [Move](#move)
- [Left](#left)
- [Right](#right)
- [Report](#report)

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


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


