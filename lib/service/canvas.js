export default class Canvas {
  
  constructor(rowCount, colCount) {
    this.rowCount = rowCount;
    this.colCount = colCount;
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

  isValid(r, c) {
    let a = r < 0 || r > this.rowCount - 1
    let b = c < 0 || c > this.colCount - 1

    if (a || b) {
      return false;
    }
    return true;
  }

  getCell(r, c) {
    if (!this.isValid(r, c)) {
      return false;
    }
    return this.body[r][c]
  }

  setCell(r, c, value) {
    if (!this.isValid(r, c)) {
      throw 'invalid crds';
    }
    this.body[r][c] = value;
  }
}