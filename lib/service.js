let frame = [
  [1, 1, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0],
  [1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0],
]

export function createPuzzle(words) {
  try {
    let puzzle = generatePuzzle(words);

    return puzzle;
  } catch (ex) {
    console.log('retry');
    return createPuzzle();
  }
}

export function generatePuzzle(words) {
  let board = []
  for (let r = 0; r < frame.length; r++) {
    board[r] = []
    for (let c = 0; c < frame[r].length; c++) {
      board[r][c] = {
        id: 'cell' + r + c,
        label: 0,
        q: frame[r][c] ? '' : null,
        value: frame[r][c] ? ' ' : null,
        active: frame[r][c],
        around: {
          top: r > 0 && frame[r - 1][c],
          bottom: r < frame.length - 1 && frame[r + 1][c],
          left: c > 0 && frame[r][c - 1],
          right: c < frame[r].length - 1 && frame[r][c + 1]
        }
      }
    }
  }
  let captions = []
  let label = 1;
  
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {

      if (!board[r][c].active) continue;

      let { top, bottom, left, right} = board[r][c].around;
      let across = !left && right;
      let down = !top && bottom;
  
      if (across) {
        // create condition
        let condition = '';
        for (let i = c; (i < board[r].length) && board[r][i].active; i++) {
          condition += board[r][i].value;
        }

        // find a word with given condition
        let word = getWord(words, condition);
        if (!word) throw 1;
        
        // assign letters
        for (let i = 0; i < word.length; i++) {
          board[r][c + i].value = word.name[i];
        }

        // add caption
        let caption = {
          id: word.id,
          label,
          meaning: word.meaning,
          down: false,
        }

        captions.push(caption)
      }
  
      if (down) {
        //
        let condition = '';
        for (let i = r; (i < board.length) && board[i][c].active; i++) {
          condition += board[i][c].value;
        }
        
        //
        let word = getWord(words, condition);
        if (!word) throw 1;
        
        //
        for (let i = 0; i < word.length; i++) {
          board[r + i][c].value = word.name[i];
        }

        //
        let caption = {
          id: word.id,
          label,
          meaning: word.meaning,
          down: true,
        }

        captions.push(caption)
      }
  
      // add label
      if (across || down) {
        board[r][c].label = label++;
      }
    }
  }

  return { board, captions }
}

export function getWord(words, condition) {

  let candidates = words
    .filter(word => {
      let a = word.length == condition.length
      if (a) {
        let b = true;
        for (let i = 0; i < word.length; i++) {
          if (condition[i] != ' ' && (word.name[i] != condition[i])) {
            b = false;
          }
        }

        if (b) {
          return word;
        }
      }
    })
  
  if (!candidates.length) {
    return null;
  }

  let i = Math.floor(Math.random() * candidates.length);
  return candidates[i];
}
