import { getWord } from "./data";

let board = [
  [1, 1, 1, 1, 0, 0, 1],
  [0, 0, 0, 1, 0, 0, 1],
  [0, 0, 0, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 1, 0, 0, 0],
  [1, 0, 0, 1, 0, 0, 0],
  [1, 0, 0, 1, 1, 1, 1],
]

let sticks;
let cells;
let captions;

export default async function createPuzzle() {
  sticks = [];
  cells = [];
  for (let r = 0; r < board.length; r++) {
    cells[r] = [];
    for (let c = 0; c < board[r].length; c++) {
      cells[r][c] = {
        id: 'cell' + r + c,
        label: 0,
        group: [0, 0],
        q: '',
        value: ' ',
        active: board[r][c],
        around: {
          top: r > 0 && board[r - 1][c],
          bottom: r < board.length - 1 && board[r + 1][c],
          left: c > 0 && board[r][c - 1],
          right:  c < board[r].length - 1 && board[r][c + 1],
        }
      }
    }
  }
  captions = [];
  
  // labeling cells, create sticks
  labeling();
  
  try {
    // assign values to cells and create captions
    await assignValues(sticks[0]);
  } catch (ex) {
    console.log('retry');
    return await createPuzzle();
  }
  
  // result
  return { 
    cells, 
    captions: captions.sort((a, b) => {
      return a.label - b.label;
    })
  }
}

export function labeling() {
  let label = 1;

  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (!board[r][c]) continue;
  
      let { top, bottom, left, right } = cells[r][c].around;
  
      let across = !left && right;
      let down = !top && bottom;
  
      if (across) {
        let stick = {
          label,
          down: false,
          crds: [],
          active: false,
        }
  
        for (let i = c; i < board[r].length; i++) {
          if (!board[r][i]) break;
          stick.crds.push([r, i])
        }
  
        sticks.push(stick);
      }
  
      if (down) {
        let stick = {
          label,
          down: true,
          crds: [],
          active: false,
        }
  
        for (let i = r; i < board.length; i++) {
          if (!board[i][c]) break;
          stick.crds.push([i, c])
        }
  
        sticks.push(stick);
      }

      if (across || down) {
        cells[r][c].label = label++;
      }
    }
  }
}

export async function assignValues(stick) {
  // stick activated
  stick.active = true;
  // stick length
  let length = stick.crds.length;

  // assign group
  for (let i = 0; i < length; i++) {
    let [r, c] = stick.crds[i];
    if (stick.down) {
      cells[r][c].group[1] = stick.label;
    } else { // across
      cells[r][c].group[0] = stick.label;
    }
  }

  // scan
  let clue = '';

  for (let i = 0; i < length; i++) {
    let [r, c] = stick.crds[i];

    clue += cells[r][c].value;
  }

  // assign values to cells
  let word = await getWord(clue);
  stick.word = word;

  for (let i = 0; i < length; i++) {
    let [r, c] = stick.crds[i]

    cells[r][c].value = word.name[i];
  }

  // captions
  captions.push({
    id: stick.label + (stick.down ? 'down' : 'across'),
    label: stick.label,
    down: stick.down,
    word: word.name,
    content: word.meaning,
  })

  // move
  for (let i = 0; i < length; i++) {
    // console.log(stick.crds[i]) // trace working cells
    for (let j = 0; j < sticks.length; j++) {
      for (let l = 0; l < sticks[j].crds.length; l++) {
        if (sticks[j].active) continue;

        let [r, c] = stick.crds[i];
        let [a, b] = sticks[j].crds[l];

        // crossed
        if (r == a && c == b) {
          await assignValues(sticks[j])
        }
      }
    }
  }
}

