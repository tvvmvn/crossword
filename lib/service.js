import getWord from "./data";

class Cell {
  constructor(id, label, value, q, active) {
    this.id = id;
    this.label = label;
    this.value = value;
    this.q = q;
    this.active = active;
  }
}

class Caption {
  constructor(id, label, down, content) {
    this.id = id;
    this.label = label;
    this.down = down;
    this.content = content;
  }
}

class Data {
  constructor(minLength, maxLength, targetIndex, targetCrds, startCrds, label, down) {
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.targetIndex = targetIndex;
    this.targetCrds = targetCrds;
    this.startCrds = startCrds;
    this.label = label;
    this.down = down;
  }
}

let d = [
  new Data(6, 8, null, null, [2, 0], 2, false),
  new Data(3, 8, 2, [2, 2], [0, 2], 1, true),
  new Data(4, 6, 0, [2, 5], [2, 5], 3, true),
  new Data(2, 4, 1, [5, 5], [5, 4], 4, false),
]

export async function createPuzzle() {
  
  let rowCount = 8;
  let colCount = 8;
  let board = []
  let captions = []

  for (let r = 0; r < rowCount; r++) {
    board[r] = []  
    for (let c = 0; c < colCount; c++) {
      board[r][c] = new Cell('cell' + r + c, 0, '', '', false)
    }
  }

  try {
    for (let j = 0; j < d.length; j++) {
      let {
        minLength,
        maxLength,
        targetIndex,
        targetCrds,
        startCrds,
        label,
        down
      } = d[j];

      let targetValue;

      if (targetIndex != null) {
        let [r, c] = targetCrds;
        targetValue = board[r][c].value;
      }

      let word = await getWord(minLength, maxLength, targetIndex, targetValue)

      if (!word) {
        throw 1;
      }

      let [r, c] = startCrds;

      // labeling on board
      board[r][c].label = label;

      // filling board with each letter
      if (down) {
        for (let i = r; i < r + word.length; i++) {
          board[i][c].value = word.name[i - r];
          board[i][c].active = true;
        }
      } else {
        for (let i = c; i < c + word.length; i++) {
          board[r][i].value = word.name[i - c];
          board[r][i].active = true;
        }
      }

      // add caption
      let id = label;
      id += (down ? 'down' : 'across');
      captions.push(new Caption(id, label, down, word.meaning))
    }

    return {
      board,
      captions: captions.sort((a, b) => a.label - b.label)
    }
  } catch (ex) {
    console.log('retry')
    return createPuzzle();
  }
}
