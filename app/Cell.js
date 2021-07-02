export default class Cell {
  constructor(isLive = true, neighbours = 0) {
    this.isLive = isLive;
    this.neighbours = neighbours;
  }
}
