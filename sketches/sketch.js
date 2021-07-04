import Game from '../app/Game.js';

let seed;
let game;

// set location of seed JSON file
const seedPath = '../seeds/pentadecathalon.json';

// set resolution to a divisor of width and height
const [ width, height ] = [ 330, 540 ];
const resolution = 30;

// central width and height coordinates
let centreWidth = Math.floor(width / resolution / 2);
let centreHeight = Math.floor(height / resolution / 2);

new p5(function(p5) {
  // get seed data from JSON file before setup
  p5.preload = function() {
    seed = p5.loadJSON(seedPath);
  };

  p5.setup = function() {
    p5.createCanvas(width, height);
    p5.frameRate(6);
    p5.background(0);

    game = new Game(seed.grid);
    console.log(game);

    // get width and height of seed grid
    let seedWidth = seed.grid[0].length;
    let seedHeight = seed.grid.length;

    // adjust central coordinates, to allow for seed to be centred
    centreWidth -= Math.floor(seedWidth / 2);
    centreHeight -= Math.floor(seedHeight / 2);
  };

  p5.draw = function() {
    p5.background(0);
    drawGrid();
    drawGame();
    game = game.evolve();
  };

  function drawGrid() {
    p5.fill(6);
    p5.stroke(65, 65, 65);
    p5.strokeWeight(5);
    
    // for every cell draw an empty square, to make a grid
    for (let y = 0; y <= height / resolution; y++) {
      for (let x = 0; x <= width / resolution; x++) {
        p5.square(x * resolution, y * resolution, resolution);
      }
    }
  }

  function drawGame() {
    p5.fill(78, 0, 255);

    // for every live cell, draw a filled square
    for (let y in game.cells) {
      if (!game.cells[y]) continue;
      for (let x in game.cells[y]) {
        const cellX = x * resolution + centreWidth * resolution;
        const cellY = y * resolution + centreHeight * resolution;
        if (game.cells[y][x]) p5.square(cellX, cellY, resolution);
      }
    }
  }
});
