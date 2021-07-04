import Cell from './Cell.js';

export default class Game {
  // creates new Game object from given seed (defaults to empty grid)
  constructor(seed = [ [ 0 ] ]) {
    this.width = seed[0].length;
    this.height = seed.length;
    this.origin = { x: 0, y: 0 };
    this.cells = { 0: {} };

    // add all live cells to Game
    for (let y = 0; y < seed.length; y++) {
      for (let x = 0; x < seed[y].length; x++) {
        if (!seed[y][x]) continue;
        this.addCell(x, y);
      }
    }

    // handles edge case of seed being a large empty grid
    if (Object.keys(this.cells).length === 1 && Object.keys(this.cells[0]).length === 0) {
      this.width = 1;
      this.height = 1;
    }
  }

  // adds a new cell to this Game
  addCell(x, y, isLive = true, neighbours = 0) {
    const newCell = new Cell(isLive, neighbours);
    if (!this.cells[y]) this.cells[y] = {};
    this.cells[y][x] = newCell;
  }

  // applies the rules and returns the resultant state
  evolve() {
    const evolvedGame = Game.duplicate(this)
      .pad()
      .countNeighbours()
      .repopulate()
      .trim();

    return evolvedGame;
  }

  // adds a border of empty cells, to allow counting of perimeter cells' neighbours
  pad() {
    const paddedGame = Game.duplicate(this);

    // add empty rows to top and bottom of grid
    paddedGame.cells[this.origin.y - 1] = {};
    paddedGame.cells[this.origin.y + this.height] = {};

    // update Game dimensions
    paddedGame.width += 2;
    paddedGame.height += 2;
    paddedGame.origin.x--;
    paddedGame.origin.y--;

    return paddedGame;
  }

  // for every live cell, increment its eight neighbours' neighbour counts
  countNeighbours() {
    const countedGame = Game.duplicate(this);

    // for every live cell
    for (let y in this.cells) {
      for (let x in this.cells[y]) {
        
        //for its eight neighbours
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dy === 0 && dx === 0) continue;

            // neighbour's coordinates
            const nx = +x + dx;
            const ny = +y + dy;

            // if there is no Cell object for neighbour, add one
            if (!countedGame.cells[ny] || !countedGame.cells[ny][nx])
              countedGame.addCell(nx, ny, false);

            // increment neighbour's neighbour count
            countedGame.cells[ny][nx].neighbours++;
          }
        }
      }
    }
    return countedGame;
  }

  // checks all active cells, repopulates according to rules
  repopulate() {
    const repopulatedGame = Game.duplicate(this);

    // for every active cell
    for (let y in this.cells) {
      for (let x in this.cells[y]) {
        const cell = this.cells[y][x];

        // apply rules of Conway's Game of Life
        if (
          (cell.isLive && (cell.neighbours === 2 || cell.neighbours === 3)) ||
          (!cell.isLive && cell.neighbours === 3)
        ) {
          repopulatedGame.cells[y][x].isLive = true;
          repopulatedGame.cells[y][x].neighbours = 0;
        } else {
          delete repopulatedGame.cells[y][x];
        }
      }
    }
    return repopulatedGame;
  }

  // removes any empty borders and columns from edges
  trim() {
    const trimmedGame = Game.duplicate(this);
    let [ trimmedY, trimmedX ] = [ 0, 0 ];

    //trim top rows
    for (let y = this.origin.y; y < this.height + this.origin.y; y++) {
      if (Object.keys(this.cells[y]).length !== 0) break;
      delete trimmedGame.cells[y];
      trimmedGame.origin.y++;
      trimmedGame.height--;
      trimmedY++;
    }

    //trim bottom rows
    for (let y = this.height + this.origin.y - 1; y >= this.origin.y + trimmedY; y--) {
      if (Object.keys(this.cells[y]).length !== 0) break;
      delete trimmedGame.cells[y];
      trimmedGame.height--;
    }

    //trim left columns
    for (let x = this.origin.x; x < this.width + this.origin.x; x++) {
      let columnEmpty = true;
      for (let y in this.cells) {
        if (this.cells[y][x]) columnEmpty = false;
      }
      if (!columnEmpty) break;
      trimmedGame.origin.x++;
      trimmedGame.width--;
      trimmedX++;
    }

    //trim right columns
    for (let x = this.width + this.origin.x - 1; x >= this.origin.x + trimmedX; x--) {
      let columnEmpty = true;
      for (let y in this.cells) {
        if (this.cells[y][x]) columnEmpty = false;
      }
      if (!columnEmpty) break;
      trimmedGame.width--;
    }

    //for edge cases of no remaining rows or columns
    if (!trimmedGame.height && !trimmedGame.width) {
      return new Game();
    }

    return trimmedGame;
  }

  // returns a duplicate of this Game, to avoid mutation when processing
  static duplicate(game) {
    const duplicateGame = new Game();
    duplicateGame.width = game.width;
    duplicateGame.height = game.height;
    duplicateGame.origin = { ...game.origin };

    //for all active cells, add a duplicate cell to duplicate Game
    for (let y in game.cells) {
      duplicateGame.cells[y] = {};
      if (!game.cells[y]) continue;
      for (let x in game.cells[y]) {
        duplicateGame.addCell(x, y, game.cells[y][x].isLive, game.cells[y][x].neighbours);
      }
    }
    return duplicateGame;
  }

  // returns a 2D Array representation of this Game
  get grid() {
    const grid = [];

    // for every row, create an empty row
    for (let y = this.origin.y; y < this.height + this.origin.y; y++) {
      const row = [];

      // for every cell, add 1 if live and 0 if dead to row
      for (let x = this.origin.x; x < this.width + this.origin.x; x++) {
        row.push(this.cells[y] && this.cells[y][x] && this.cells[y][x].isLive ? 1 : 0);
      }
      grid.push(row);
    }
    return grid;
  }

  // formats a string representing current state of Game and prints to console
  print() {
    // create a string, containing origin of this Game's grid
    let str = `origin: [ ${this.origin.x}, ${this.origin.y} ]\n\n`;

    // for edge case of no live cells
    if (Object.keys(this.cells).length === 0) {
      return console.log(str + '  [ [ 0 ] ]');
    }

    // format and add game to string, cells represented as '#' if live, '.' if dead
    let offset = ' '.repeat(str.length + 2);
    for (let row = 0; row < this.grid.length; row++) {
      str += row === 0 ? `  [ [ ` : `    [ `;
      this.grid[row].forEach((cell) => (str += cell ? '# ' : '. '));
      str += row === this.grid.length - 1 ? '] ] \n\n' : '] \n';
    }
    console.log(str);
  }
}
