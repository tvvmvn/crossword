
export function createPuzzle(frameSet, words) {
  try {
    let puzzle = generatePuzzle(frameSet, words);

    return puzzle;
  } catch (ex) {
    console.log('retry');
    return createPuzzle(frameSet, words);
  }
}

function generatePuzzle(frameSet, words) {

  let { frame, s } = frameSet;

  // init board
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
  
  // labeling
  let label = 1;
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (!board[r][c].active) continue;
  
      let { top, bottom, left, right} = board[r][c].around;
  
      let across = !left && right;
      let down = !top && bottom;
  
      if (across || down) {
        board[r][c].label = label++;
      }
    }
  }
  
  let captions = []
  
  for (let i = 0; i < s.length; i++) {
    let [r, c] = s[i]
    
    let { top, bottom, left, right} = board[r][c].around;
    let across = !left && right;
    let down = !top && bottom;
  
    if (across) {
      let clue = ''
      for (let j = c; (j < board[r].length) && board[r][j].active; j++) {
        clue += board[r][j].value;
      }
  
      let word = getWord(words, clue);
      if (!word) throw 1;
  
      for (let l = 0; l < word.length; l++) {
        board[r][c + l].value = word.name[l]
      }
  
      let caption = {
        id: 'across' + board[r][c].label,
        label: board[r][c].label,
        down: false,
        meaning: word.meaning,
      }
  
      captions.push(caption)
    }
  
    if (down) {
      let clue = ''
      for (let j = r; (j < board.length) && board[j][c].active; j++) {
        clue += board[j][c].value;
      }
  
      let word = getWord(words, clue);
      if (!word) throw 1;
  
      for (let l = 0; l < word.length; l++) {
        board[r + l][c].value = word.name[l]
      }
  
      let caption = {
        id: 'down' + board[r][c].label,
        label: board[r][c].label,
        down: true,
        meaning: word.meaning,
      }
  
      captions.push(caption)
    }
  }

  return { board, captions }
}

export function getWord(words, clue) {

  let candidates = words
    .filter(word => {
      let a = word.length == clue.length
      if (a) {
        let b = true;
        for (let i = 0; i < word.length; i++) {
          if (clue[i] != ' ' && (word.name[i] != clue[i])) {
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
