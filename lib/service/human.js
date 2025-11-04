export default class Human {
  
  constructor(canvas) {
    this.canvas = canvas;
  }

  completeCanvas(words) {
    // place first word
    let first = words[0];

    for (let i = 0; i < first.length; i++) {
      let r = this.canvas.rowCount / 2;
      let c = (this.canvas.colCount / 2) + i;
      this.canvas.setCell(r, c, first[i]);
    }

    // place words step by step
    for (let i = 1; i < words.length; i++) {
      let word = words[i];

      // 1 find locations and pick one 
      let locations = this.findLocations(word)
      console.log(locations)

      // 2 fill words to this.canvas
      if (!locations.length) continue;
      let index = Math.floor(Math.random() * locations.length);
      let { s, down } = locations[index];

      let [sr, sc] = s;

      if (!down) {
        for (let i = 0; i < word.length; i++) {
          this.canvas.setCell(sr, sc + i, word[i]);
          
        }
      }

      if (down) {
        for (let i = 0; i < word.length; i++) {
          this.canvas.setCell(sr + i, sc, word[i]);
          
        }
      }
    }

    return this.canvas;
  }
  
  findLocations(word) {
    // {start, orientation}
    let locations = [];

    for (let r = 0; r < this.canvas.rowCount; r++) {
      for (let c = 0; c < this.canvas.colCount; c++) {
        if (!this.canvas.getCell(r, c)) continue;

        // check if crossed already
        let n, s, w, e;
        n = r > 0 && this.canvas.getCell(r - 1, c)
        s = r < this.canvas.rowCount - 1 && this.canvas.getCell(r + 1, c)
        w = c > 0 && this.canvas.getCell(r, c - 1)
        e = c < this.canvas.colCount - 1 && this.canvas.getCell(r, c + 1)

        let across = w || e;
        let down = n || s;

        if (across && down) continue;

        if (across) {
          for (let j = 0; j < word.length; j++) {
            if (this.canvas.getCell(r, c) == word[j]) {
              // matching letter and index
              let index = j; // index for matching letter

              let rs = r - index;
              let ok = 1;

              // check overhead and below;
              let overhead = this.canvas.getCell(rs - 1, c);
              let below = this.canvas.getCell(rs + word.length, c);

              if (overhead || below) {
                ok = 0;
              }

              // check path and both sides
              for (let k = 0; k < word.length; k++) {
                let center = this.canvas.getCell(rs + k, c)
                

                if (center) {
                  if (center != word[k]) {
                    ok = 0;
                  }
                } else {
                  let left = this.canvas.getCell(rs + k, c - 1);
                  let right = this.canvas.getCell(rs + k, c + 1);

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
            if (this.canvas.getCell(r, c) == word[j]) {
              // matching letter and index
              let index = j; // index for matching letter

              let cs = c - index; // j: index of matching letter
              let ok = 1;

              // check overhead and below;
              let overhead = this.canvas.getCell(r, cs - 1);
              let below = this.canvas.getCell(r, cs + word.length);
              

              if (overhead || below) {
                ok = 0;
              }

              // check path and both sides
              for (let k = 0; k < word.length; k++) {
                let center = this.canvas.getCell(r, cs + k)
                if (center) {
                  if (center != word[k]) {
                    ok = 0;
                  }
                } else {
                  let left = this.canvas.getCell(r - 1, cs + k);
                  let right = this.canvas.getCell(r + 1, cs + k);

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
}
