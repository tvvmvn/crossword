export default class PuzzleGenerator {

  constructor(canvas) { 
    this.cropped = this.cropCanvas(canvas)
    this.printCrop();
  }

  // board and captions
  createPuzzle(words) {
    let board = [];
    let captions = [];

    for (let r = 0; r < this.cropped.length; r++) {
      board[r] = []
      for (let c = 0; c < this.cropped[r].length; c++) {
        board[r][c] = {
          id: 'cell' + r + c,
          label: 0,
          space: [0, 0],
          value: this.cropped[r][c],
          q: '',
          active: this.cropped[r][c] ? true : false,
          around: {
            top: r > 0 && this.cropped[r - 1][c],
            bottom: r < this.cropped.length - 1 && this.cropped[r + 1][c],
            left: c > 0 && this.cropped[r][c - 1],
            right: c < this.cropped[r].length - 1 && this.cropped[r][c + 1],
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
          let s = ''
          for (let i = c; i < board[r].length; i++) {
            if (!board[r][i].active) break;
            board[r][i].space[0] = label;
            s += board[r][i].value;
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
          for (let i = r; i < board.length; i++) {
            if (!board[i][c].active) break;
            board[i][c].space[1] = label;
            s += board[i][c].value;
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
          board[r][c].label = label++;
        }
      }
    }

    // assign meaning of word to captions
    for (let caption of captions) {
      for (let word of words) {
        if (caption.about == word.name) {
          caption.content = word.meaning
        }
      }
    }

    // console.log(board)
    return {
      board, captions
    }
  }

  cropCanvas(canvas) {
    let rmin, cmin, rmax, cmax;
    rmin = cmin = rmax = cmax = -1;

    for (let r = 0; r < canvas.rowCount; r++) {
      for (let c = 0; c < canvas.colCount; c++) {
        if (canvas.getCell(r, c)) {
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

    let cropped = []
    let a = canvas.getBody().slice(rmin, rmax + 1)

    for (let i = 0; i < a.length; i++) {
      let b = a[i].slice(cmin, cmax + 1);
      cropped[i] = b;
    }

    return cropped;
  }

  printCrop() {
    let s = ''
    for (let r = 0; r < this.cropped.length; r++) {
      for (let c = 0; c < this.cropped[r].length; c++) {
        s += (this.cropped[r][c] || '#')
      }
      s += '\n'
    }
    console.log(s)
  }
}