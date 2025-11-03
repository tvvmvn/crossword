// Board
let rowCount = 100;
let colCount = 100;
let canvas;

export function createPuzzle(data) {
  let words = data.map(item => item.name);

  canvas = [];

  for (let r = 0; r < rowCount; r++) {
    canvas[r] = []
    for (let c = 0; c < colCount; c++) {
      canvas[r][c] = '';
    }
  }
  // put first word
  let first = words[0];
  for (let i = 0; i < first.length; i++) {
    let r = rowCount / 2;
    let c = (colCount / 2) + i;
    canvas[r][c] = first[i];
  }

  // loop all words
  for (let i = 1; i < words.length; i++) {
    let word = words[i];

    // 1 find locations and pick one 
    let locations = findLocations(word)
    console.log(locations)

    // 2 fill words to canvas
    if (!locations.length) continue;
    let index = Math.floor(Math.random() * locations.length);
    let { s, down } = locations[index];
    
    fillWords(s, down, word);
  }

  // crop canvas
  let croped = crop();

  // print croped
  print(croped)

  return {
    board: createBoard(croped),
    captions: createCaptions(croped, data)
  }
}

export function findLocations(word) {
  // {start, orientation}
  let locations = [];

  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < colCount; c++) {
      if (!canvas[r][c]) continue;

      // check if crossed already
      let n, s, w, e;
      n = r > 0 && canvas[r - 1][c];
      s = r < rowCount - 1 &&  canvas[r + 1][c];
      w = c > 0 && canvas[r][c - 1];
      e = c < colCount - 1 && canvas[r][c + 1];

      let across = w || e;
      let down = n || s;

      if (across && down) continue;

      if (across) {
        for (let j = 0; j < word.length; j++) {
          if (canvas[r][c] == word[j]) {
            // matching letter and index
            let index = j; // index for matching letter

            let rs = r - index;
            let ok = 1;

            // check overhead and below;
            let overhead = canvas[rs - 1][c];
            let below = canvas[rs + word.length][c];

            if (overhead || below) {
              ok = 0;
            }

            // check path and both sides
            for (let k = 0; k < word.length; k++) {
              let center = canvas[rs + k][c];

              if (center) {
                if (center != word[k]) {
                  ok = 0;
                }
              } else {
                let left = canvas[rs + k][c - 1];
                let right = canvas[rs + k][c + 1];

                if (left || right) {
                  ok = 0;
                }
              }
            }

            // add location
            if (ok) {
              let location = { s: [rs, c], down: true }

              locations.push(location)
            }
          }
        }
      }

      if (down) {
        for (let j = 0; j < word.length; j++) {
          if (canvas[r][c] == word[j]) {
            // matching letter and index
            let index = j; // index for matching letter

            let cs = c - index; // j: index of matching letter
            let ok = 1;

            // check overhead and below;
            let overhead = canvas[r][cs - 1];
            let below = canvas[r][cs + word.length];

            if (overhead || below) {
              ok = 0;
            }

            // check path and both sides
            for (let k = 0; k < word.length; k++) {
              let center = canvas[r][cs + k];

              if (center) {
                if (center != word[k]) {
                  ok = 0;
                }
              } else {
                let left = canvas[r - 1][cs + k];
                let right = canvas[r + 1][cs + k];

                if (left || right) {
                  ok = 0;
                }
              }
            }

            // add location
            if (ok) {
              let location = { s: [r, cs], down: false }

              locations.push(location)
            }
          }
        }
      }
    }
  }

  return locations;
}

export function fillWords(s, down, word) {

  let [sr, sc] = s;

  if (!down) {
    for (let i = 0; i < word.length; i++) {
      canvas[sr][sc + i] = word[i];
    }
  }

  if (down) {
    for (let i = 0; i < word.length; i++) {
      canvas[sr + i][sc] = word[i];
    }
  }
}

export function crop() {
  let rmin, cmin, rmax, cmax;
  rmin = cmin = rmax = cmax = -1;

  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < colCount; c++) {
      if (canvas[r][c]) {
        // row min and max
        if (rmin < 0) rmin = r;
        rmax = r;

        // col min
        if (cmin < 0) cmin = c;
        if (c < cmin) {
          cmin = c;
        }

        // col max
        if (cmax < 0) cmax = c;
        if (c > cmax) {
          cmax = c;
        }
      }
    }
  }

  let croped = []
  let a = canvas.slice(rmin, rmax + 1)
  for (let i = 0; i < a.length; i++) {
    let b = a[i].slice(cmin, cmax + 1);
    croped[i] = b;
  }

  return croped;
}

export function createBoard(croped) {
  let board = [];

  for (let r = 0; r < croped.length; r++) {
    board[r] = []
    for (let c = 0; c < croped[r].length; c++) {
      board[r][c] = {
        id: 'cell' + r + c,
        label: 0,
        space: [0, 0],
        value: croped[r][c],
        q: '',
        active: croped[r][c] ? true : false,
        around: {
          top: r > 0 && croped[r - 1][c],
          bottom: r < croped.length - 1 && croped[r + 1][c],
          left: c > 0 && croped[r][c - 1],
          right: c < croped[r].length - 1 && croped[r][c + 1],
        }
      }
    }
  }

  let label = 1;

  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (!board[r][c].active) continue;

      let { top, bottom, left, right } = board[r][c].around;
      let across = !left && right;
      let down = !top && bottom;

      if (across) {
        for (let i = c; i < board[r].length; i++) {
          if (!board[r][i].active) break;
          board[r][i].space[0] = label;
        }
      }

      if (down) {
        for (let i = r; i < board.length; i++) {
          if (!board[i][c].active) break;
          board[i][c].space[1] = label;
        }
      }

      if (across || down) {
        board[r][c].label = label++;
      }
    }
  }

  // console.log(board)
  return board;
}

export function createCaptions(croped, words) {
  let captions = []
  let label = 1;
  
  for (let r = 0; r < croped.length; r++) {
    for (let c = 0; c < croped[r].length; c++) {
      if (!croped[r][c]) continue;

      let top = r > 0 && croped[r - 1][c];
      let bottom = r < croped.length - 1 && croped[r + 1][c];
      let left = c > 0 && croped[r][c - 1];
      let right = c < croped[r].length - 1 && croped[r][c + 1];

      let across = !left && right;
      let down = !top && bottom;

      if (across) {
        let s = ''
        for (let i = c; i < croped[r].length; i++) {
          if (!croped[r][i]) break;
          s += croped[r][i];
        }

        captions.push({
          id: 'across' + label,
          label,
          down: false,
          about: s,
          content: '',
        })
      }

      if (down) {
        let s = ''
        for (let i = r; i < croped.length; i++) {
          if (!croped[i][c]) break;
          s += croped[i][c];
        }
                
        captions.push({
          id: 'down' + label,
          label,
          down: true,
          about: s,
          content: '',
        })
      }

      if (across || down) {
        label++;
      }
    }
  }

  for (let caption of captions) {
    for (let word of words) {
      if (caption.about == word.name) {
        caption.content = word.meaning
      }
    } 
  }

  return captions;
}

export function print(croped) {
  let s = ''
  for (let r = 0; r < croped.length; r++) {
    for (let c = 0; c < croped[r].length; c++) {
      s += (croped[r][c] || '#')
    }
    s += '\n'
  }
  console.log(s)
}
