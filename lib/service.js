import { getWord } from "./data";

let frame = [
  [1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 1, 0, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 1, 0],
]

export function createPuzzle() {
  try {
    let puzzle = generatePuzzle();

    return puzzle;
  } catch (ex) {
    console.log('retry');
    return createPuzzle();
  }
}

export function generatePuzzle() {
  let board = []
  for (let r = 0; r < frame.length; r++) {
    board[r] = []
    for (let c = 0; c < frame[r].length; c++) {
      board[r][c] = {
        id: 'cell' + r + c,
        label: 0,
        across: false,
        down: false,
        q: '',
        value: frame[r][c] ? ' ' : null,
        active: frame[r][c],
        top: r > 0 && frame[r - 1][c],
        bottom: r < frame.length - 1 && frame[r + 1][c],
        left: c > 0 && frame[r][c - 1],
        right: c < frame[r].length - 1 && frame[r][c + 1]
      }
    }
  }
  let captions = []
  let label = 1;
  
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {

      if (!board[r][c].active) continue;

      let { top, bottom, left, right} = board[r][c];
      let across = !left && right;
      let down = !top && bottom;
  
      if (across) {
        board[r][c].across = true;
  
        let condition = '';
        for (let i = c; (i < board[r].length) && board[r][i].active; i++) {
          condition += board[r][i].value;
        }

        let word = getWord(condition);
        if (!word) throw 1;

        captions.push({
          id: 'across' + label,
          label,
          meaning: 'a meaning for ' + word,
          down: false,
        })
        
        for (let i = 0; i < word.length; i++) {
          board[r][c + i].value = word[i];
        }
      }
  
      if (down) {
        board[r][c].down = true;
  
        let condition = '';
        for (let i = r; (i < board.length) && board[i][c].active; i++) {
          condition += board[i][c].value;
        }
        
        let word = getWord(condition);
        if (!word) throw 1;

        captions.push({
          id: 'down' + label,
          label,
          meaning: 'a meaning for ' + word,
          down: true,
        })
  
        for (let i = 0; i < word.length; i++) {
          board[r + i][c].value = word[i];
        }
      }
  
      if (across || down) {
        board[r][c].label = label++;
      }
    }
  }

  return { board, captions }
}

