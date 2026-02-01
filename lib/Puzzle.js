export default class Puzzle {

  constructor(rowCount, colCount, words) {
    // members
    this.rowCount = rowCount;
    this.colCount = colCount;
    this.words = words.sort((a, b) => b.length - a.length);
    this.board = []
    this.captions = []

    // init board
    for (let r = 0; r < rowCount; r++) {
      this.board[r] = []
      for (let c = 0; c < colCount; c++) {
        //Cell
        this.board[r][c] = {
          id: 'cell' + r + c,
          label: 0,
          wordId: [0, 0],
          value: '',
          q: '',
        }
      }
    }

    // completion process
    this.createPuzzle();
    this.labeling();
    this.captions.sort((a, b) => a.label - b.label)
  }

  // createBoard: void
  createPuzzle() {
    // set a first word
    let word = this.words[0];
    let r = Math.floor(Math.random() * this.colCount);
    for (let i = 0; i < word.name.length; i++) {
      this.board[r][i].value = word.name[i];
      this.board[r][i].wordId[0] = word.id
    }

    this.captions.push({
      wordId: word.id,
      label: 0,
      about: word.name,
      content: word.meaning,
      ot: 'across',
    });

    // assign words
    let quizCount = 1;

    for (let i = 1; i < this.words.length; i++) {
      let word = this.words[i];
      
      let locations = this.findLocations(word.name);
      if (!locations.length) continue;

      let index = Math.floor(Math.random() * locations.length);
      // location
      let { rs, cs, ot } = locations[index];

      if (ot == 'across') { // add across
        for (let i = 0; i < word.name.length; i++) {
          this.board[rs][cs + i].value = word.name[i];
          this.board[rs][cs + i].wordId[0] = word.id;
        }
      } else if (ot == 'down') {
        for (let i = 0; i < word.name.length; i++) {
          this.board[rs + i][cs].value = word.name[i];
          this.board[rs + i][cs].wordId[1] = word.id;
        }
      }

      this.captions.push({
        wordId: word.id,
        label: 0,
        about: word.name,
        content: word.meaning,
        ot,
      });

      quizCount++;
      if (quizCount >= 10) {
        console.log('Done at i: ' + i);
        break;
      }
    }
  }

  // findLocations: location[]
  findLocations(name) {
    let locations = [];

    for (let r = 0; r < this.rowCount; r++) {
      for (let c = 0; c < this.colCount; c++) {
        if (!this.getValueByCrds(r, c)) continue;

        let [a, b] = this.board[r][c].wordId;
        
        // crossed already
        if (a > 0 && b > 0) continue;

        for (let k = 0; k < name.length; k++) {
          if (this.getValueByCrds(r, c) == name[k]) {

            // add down
            if (a > 0) {
              // row start
              let rs = r - k; // k: matching index with letter
              let ok = 1;

              // check if outside board at top
              if (rs < 0) {
                ok = 0;
              }

              // check if outside board at bottom
              let endIndex = rs + name.length - 1;
              let lastIndex = this.rowCount - 1
              if (endIndex > lastIndex) {
                ok = 0;
              }

              // check overhead and below;
              let overhead = this.getValueByCrds(rs - 1, c);
              let below = this.getValueByCrds(rs + name.length, c);

              if (overhead || below) {
                ok = 0;
              }

              // check path and both sides
              for (let k = 0; k < name.length; k++) {
                let center = this.getValueByCrds(rs + k, c)

                if (center) {
                  if (center != name[k]) {
                    ok = 0;
                  }
                } else {
                  let left = this.getValueByCrds(rs + k, c - 1);
                  let right = this.getValueByCrds(rs + k, c + 1);

                  if (left || right) {
                    ok = 0;
                  }
                }
              }

              // location
              if (ok) {
                let location = {
                  rs,
                  cs: c,
                  ot: 'down',
                }

                locations.push(location)
              }
            }

            // add across
            if (b > 0) {
              // column start
              let cs = c - k; // k: index of matching letter
              let ok = 1;

              // check if outside board
              if (cs < 0) {
                ok = 0;
              }

              let endIndex = cs + name.length - 1;
              let lastIndex = this.colCount - 1
              if (endIndex > lastIndex) {
                ok = 0;
              }

              // check overhead and below;
              let overhead = this.getValueByCrds(r, cs - 1);
              let below = this.getValueByCrds(r, cs + name.length);

              if (overhead || below) {
                ok = 0;
              }

              // check path and both sides
              for (let k = 0; k < name.length; k++) {
                let center = this.getValueByCrds(r, cs + k)
                
                if (center) {
                  if (center != name[k]) {
                    ok = 0;
                  }
                } else {
                  let left = this.getValueByCrds(r - 1, cs + k);
                  let right = this.getValueByCrds(r + 1, cs + k);

                  if (left || right) {
                    ok = 0;
                  }
                }
              }

              // location
              if (ok) {
                let location = {
                  rs: r,
                  cs,
                  ot: 'across',
                }

                locations.push(location)
              }
            }
          }
        }
      }
    }

    return locations;
  }

  // labeling: void
  labeling() {
    let label = 1;

    for (let r = 0; r < this.rowCount; r++) {
      for (let c = 0; c < this.colCount; c++) {
        if (!this.getValueByCrds(r, c)) continue;

        let top = this.getValueByCrds(r - 1, c)
        let bottom = this.getValueByCrds(r + 1, c)
        let left = this.getValueByCrds(r, c - 1)
        let right = this.getValueByCrds(r, c + 1)

        let across = !left && right;
        let down = !top && bottom;

        if (across) {
          let id = this.board[r][c].wordId[0];
          for (let caption of this.captions) {
            let a = caption.ot == 'across';
            let b = caption.wordId == id;

            if (a && b) {
              caption.label = label;
            }
          }
        }

        if (down) {
          let id = this.board[r][c].wordId[1];
          for (let caption of this.captions) {
            let a = caption.ot == 'down';
            let b = caption.wordId == id;

            if (a && b) {
              caption.label = label;
            }
          }
        }

        if (across || down) {
          this.board[r][c].label = label++;
        }
      }
    }
  }

  getValueByCrds(r, c) { 
    if (
      r < 0 
      || r > this.rowCount - 1 
      || c < 0 
      || c > this.colCount - 1
    ) {
      return null;
    }
    return this.board[r][c].value;
  }

  display() {
    let s = '';
    for (let r = 0; r < this.rowCount; r++) {
      for (let c = 0; c < this.colCount; c++) {
        s += (this.getValueByCrds(r, c) || '#');
      }
      s += '\n';
    }
    console.log(s)
  }
}