export default class Canvas {
  
  constructor(rowCount, colCount) {
    this.rowCount = 100;
    this.colCount = 100;
    this.body = [];

    for (let r = 0; r < rowCount; r++) {
      this.body[r] = []
      for (let c = 0; c < colCount; c++) {
        this.body[r][c] = '';
      }
    }
  }

  getBody() {
    return this.body;
  }

  getCell(r, c) {
    return this.body[r][c]
  }

  setCell(r, c, value) {
    this.body[r][c] = value;
  }
}