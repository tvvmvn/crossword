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

export default async function createPuzzle() {
  try {
    return await generate();
  } catch (ex) {
    console.log('retry');
    return await createPuzzle();
  }
}

async function generate() {
  // init cells
  let cells = [];
  for (let r = 0; r < board.length; r++) {
    cells[r] = [];
    for (let c = 0; c < board[r].length; c++) {
      cells[r][c] = {
        id: 'cell' + r + c,
        label: 0,
        space: [0, 0], // [across, down]
        q: '',
        value: ' ',
        active: board[r][c],
        around: {
          top: r > 0 && board[r - 1][c],
          bottom: r < board.length - 1 && board[r + 1][c],
          left: c > 0 && board[r][c - 1],
          right: c < board[r].length - 1 && board[r][c + 1],
        }
      }
    }
  }

  // 1 labeling and spacing
  let label = 1;

  for (let r = 0; r < cells.length; r++) {
    for (let c = 0; c < cells[r].length; c++) {
      if (!cells[r][c].active) continue;

      let { top, bottom, left, right } = cells[r][c].around;
      let across = !left && right;
      let down = !top && bottom;

      if (across) {
        for (let i = c; i < cells[r].length; i++) {
          if (!cells[r][i].active) break;
          cells[r][i].space[0] = label;
        }
      }

      if (down) {
        for (let i = r; i < cells.length; i++) {
          if (!cells[i][c].active) break;
          cells[i][c].space[1] = label;
        }
      }
    
      if (across || down) {
        cells[r][c].label = label++;
      }
    }
  }

  // 2 assigning values
  let captions = [];
  let ignited = false;
  let holes;
  
  do { // repeat until no holes
    console.log('do')
    holes = 0;
  
    for (let r = 0; r < cells.length; r++) {
      for (let c = 0; c < cells[r].length; c++) {
        if (!cells[r][c].active) continue;
    
        let { top, bottom, left, right } = cells[r][c].around;
        let across = !left && right;
        let down = !top && bottom;
    
        if (across) {
          // scan
          let clue = '';
          for (let i = c; i < cells[r].length; i++) {
            if (!cells[r][i].active) break;
            clue += cells[r][i].value;
          }

          let target = clue.trim().length == 1;
          let empty = clue.trim().length == 0;
          let start = empty && !ignited;

          // if (!ignited) {
          //   ignited = true;
          // }

          if (target || start) {
            // let's assign words now
            let word = await getWord(clue);
      
            for (let i = 0; i < word.length; i++) {
              cells[r][i + c].value = word.name[i];
            }
    
            // add captions for a word
            let label = cells[r][c].label;

            let caption = {
              id: 'across' + label,
              label,
              down: false,
              word: word.name,
              content: word.meaning,
            }
    
            captions.push(caption);
          }
        }

        if (down) {
          // scan
          let clue = '';
          for (let i = r; i < cells.length; i++) {
            if (!cells[i][c].active) break;
            clue += cells[i][c].value;
          }

          let target = clue.trim().length == 1;
          let empty = clue.trim().length == 0;
          let start = empty && !ignited;

          if (target || start) {
            // let's assign words now
            let word = await getWord(clue);

            for (let i = 0; i < word.length; i++) {
              cells[i + r][c].value = word.name[i];
            }

            // add captions for a word
            let label = cells[r][c].label;

            let caption = {
              id: 'down' + label,
              label,
              down: true,
              word: word.name,
              content: word.meaning,
            }

            captions.push(caption);
          }
        }

        if (across || down) {
          ignited = true;
        }
  
        if (cells[r][c].value == ' ') {
          holes++;
        }
      }
    }
  } while (holes)
  
  return { 
    cells, 
    captions: captions.sort((a, b) => a.label - b.label) 
  };
}
