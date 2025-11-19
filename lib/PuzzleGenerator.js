export default class PuzzleGenerator {
  
  board;
  words;
  
  constructor(board, words) {
    this.board = board;
    this.words = words;
  }

  create() {
    let sorted = this.words.sort((a, b) => b.length - a.length);
    
    this.createBoard(sorted);

    // display board 
    this.board.display();

    // captions
    let across = this.createCaptions(false)
    let down = this.createCaptions(true)

    return {
      board: this.board.getData(),
      captions: { across, down },
      quizCount: {
        across: across.length,
        down: down.length
      }
    }
  }

  createBoard() {
    // set a first word
    let fword = this.words[0];
    for (let i = 0; i < fword.name.length; i++) {
      let r = 3;
      let c = 0 + i;
      let val = fword.name[i];
      this.board.setValue(r, c, val, 1, fword.id);
    }

    // assign words
    let quizCount = 1;

    for (let i = 1; i < this.words.length; i++) {

      let word = this.words[i];
      
      let locations = this.findLocations(word);
      if (!locations.length) continue;

      let index = Math.floor(Math.random() * locations.length);
      let { s, ori, wordId } = locations[index];
      let [sr, sc] = s;

      if (ori == 1) { // add across
        for (let i = 0; i < word.name.length; i++) {
          let val = word.name[i];
          this.board.setValue(sr, sc + i, val, ori, wordId);
        }
      } else if (ori == 2) {
        for (let i = 0; i < word.name.length; i++) {
          let val = word.name[i];
          this.board.setValue(sr + i, sc, val, ori, wordId);
        }
      }
      
      quizCount++;
      if (quizCount >= 10) {
        console.log('Done at i: ' + i);
        break;
      }
    }

    // labeling
    this.labeling();
  }

  createCaptions(down) {
    return this.board.getData().flat()
      .filter(cell => down ? cell.down : cell.across)
      .map(cell => {
        let word = this.words.find(word => word.id == cell.wordId[down ? 1 : 0])

        return {
          wordId: word.id,
          label: cell.label,
          about: word.name,
          content: word.meaning,
        }
      })
  }

  findLocations(w) {
    let word = w.name;
    let locations = [];

    for (let r = 0; r < this.board.rowCount; r++) {
      for (let c = 0; c < this.board.colCount; c++) {
        if (!this.board.getValue(r, c)) continue;

        let [a, b] = this.board.getWordId(r, c)
        // crossed already
        if (a > 0 && b > 0) continue;

        for (let j = 0; j < word.length; j++) {
          if (this.board.getValue(r, c) == word[j]) {

            // add down
            if (a > 0) {
              // row start
              let rs = r - j; // j: matching index with letter
              let ok = 1;

              // check if outside this.board
              if (rs < 0) {
                ok = 0;
              }

              let endIndex = rs + word.length - 1;
              let lastIndex = this.board.rowCount - 1
              if (endIndex > lastIndex) {
                ok = 0;
              }

              // check overhead and below;
              let overhead = this.board.getValue(rs - 1, c);
              let below = this.board.getValue(rs + word.length, c);

              if (overhead || below) {
                ok = 0;
              }

              // check path and both sides
              for (let k = 0; k < word.length; k++) {
                let center = this.board.getValue(rs + k, c)

                if (center) {
                  if (center != word[k]) {
                    ok = 0;
                  }
                } else {
                  let left = this.board.getValue(rs + k, c - 1);
                  let right = this.board.getValue(rs + k, c + 1);

                  if (left || right) {
                    ok = 0;
                  }
                }
              }

              // add location
              if (ok) {
                let location = {
                  s: [rs, c],
                  ori: 2,
                  wordId: w.id
                }

                locations.push(location)
              }
            }

            // add across
            if (b > 0) {
              // column start
              let cs = c - j; // j: index of matching letter
              let ok = 1;

              // check if outside this.board
              if (cs < 0) {
                ok = 0;
              }

              let endIndex = cs + word.length - 1;
              let lastIndex = this.board.colCount - 1
              if (endIndex > lastIndex) {
                ok = 0;
              }

              // check overhead and below;
              let overhead = this.board.getValue(r, cs - 1);
              let below = this.board.getValue(r, cs + word.length);

              if (overhead || below) {
                ok = 0;
              }

              // check path and both sides
              for (let k = 0; k < word.length; k++) {
                let center = this.board.getValue(r, cs + k)
                if (center) {
                  if (center != word[k]) {
                    ok = 0;
                  }
                } else {
                  let left = this.board.getValue(r - 1, cs + k);
                  let right = this.board.getValue(r + 1, cs + k);

                  if (left || right) {
                    ok = 0;
                  }
                }
              }

              // add location
              if (ok) {
                let location = {
                  s: [r, cs],
                  ori: 1,
                  wordId: w.id
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

  labeling() {
    let label = 1;

    for (let r = 0; r < this.board.rowCount; r++) {
      for (let c = 0; c < this.board.colCount; c++) {
        if (!this.board.getValue(r, c)) continue;

        let top = this.board.getValue(r - 1, c)
        let bottom = this.board.getValue(r + 1, c)
        let left = this.board.getValue(r, c - 1)
        let right = this.board.getValue(r, c + 1)

        let across = !left && right;
        let down = !top && bottom;

        if (across || down) {
          this.board.setLabel(r, c, label++);
          this.board.markSource(r, c, across, down)
        }
      }
    }
  }
}