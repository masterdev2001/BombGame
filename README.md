# vite-react-typescript-template

Vite React Typescript template for simple web frontend project.

## Tasks

- User should be able to input number of rows and columns (default: 7X7)
- Display a matrix of cells with random "Block" or "Empty" status
- Initially, place a player at random empty cell
  Player's position should be marked in the cell as red background color
- Using keyboard (up, down, left, cell), player should be able to move in different direction towards an empty cell
- Pressing "Space" key should put a bomb to the player's current position
  Bomb should be marked in the cell as black circle.
  In this case, player and bomb will be in the same position
- While player is moving, it will be blocked if target cell is "Block" or "Bomb"
- Bomb will be exploded in 3 seconds with radius of 3
- While bomb is exploded, it will remove the first meeting Blocks in radius
- Player should be able to put multiple bombs in different cells.
  If one bomb is exploded and another bomb is in radius, they should explode together
- If player is inside bomb explosion, then game should finish.

## Environment

- Windows 11
- Node v20.15.1
- Npm 10.7.0

## Tech Stacks

- Vite + React + Typescript

## Steps to run program

1. Install node modules

   ```shell
   npm install
   ```

2. Run project
   ```shell
   npm run dev
   ```
   This will host the project on http://localhost:5173.
