export default class Board {

  rowCount;
  colCount;
  data;

  constructor(rowCount, colCount) {
    this.rowCount = rowCount;
    this.colCount = colCount;

    this.data = []
    for (let r = 0; r < rowCount; r++) {
      this.data[r] = []
      for (let c = 0; c < colCount; c++) {
        this.data[r][c] = {
          id: 'cell' + r + c,
          label: 0,
          across: null,
          down: null,
          wordId: [0, 0],
          value: '',
          q: '',
          // markSource: () => 'foo' // serialize error
        }
      }
    }
  }

  getData() {
    return this.data;
  }

  markSource(r, c, across, down) {
    this.data[r][c].across = across;
    this.data[r][c].down = down;
  }

  getValue(r, c) { // getValueByCrds
    if (!this.isValidCrds(r, c)) {
      return null;
    }
    return this.data[r][c].value;
  }

  getWordId(r, c) {
    if (!this.isValidCrds(r, c)) {
      return null;
    }
    return this.data[r][c].wordId
  }

  setValue(r, c, val, ori, wordId) {
    if (!this.isValidCrds(r, c)) {
      throw 'invalid crds';
    }
    // value
    this.data[r][c].value = val;
    // wordId
    if (ori == 1) {
      this.data[r][c].wordId[0] = wordId
    } else if (ori == 2) {
      this.data[r][c].wordId[1] = wordId
    }
  }

  setLabel(r, c, label) {
    if (!this.isValidCrds(r, c)) {
      throw 'invalid crds';
    }
    this.data[r][c].label = label;
  }

  isValidCrds(r, c) {
    let a = r < 0 || r > this.rowCount - 1
    let b = c < 0 || c > this.colCount - 1

    if (a || b) {
      return false;
    }
    return true;
  }

  display() {
    let s = '';
    for (let r = 0; r < this.rowCount; r++) {
      for (let c = 0; c < this.colCount; c++) {
        s += (this.getValue(r, c) || '#');
      }
      s += '\n';
    }
    console.log(s)
  }
}