import { 
  createPuzzle, 
  generatePuzzle, 
  generateRandomWords, 
  getWord, 
  print2d
} from "../lib/service";

export function print2d(cells, attr) {
  for (let r = 0; r < cells.length; r++) {
    let row = ''
    for (let c = 0; c < cells[r].length; c++) {
      row += cells[r][c][attr] || '*';
    }
    console.log(row);
  }
}

test('generateRandomWords testing', () => {
  let words = generateRandomWords(3, 10);
  console.log(words)
})

test('getWord testing', async () => {
  console.log(getWord('1 '))
  console.log(getWord(' 2'))
  console.log(getWord(' 3 '))
})

test('generatePuzzle testing', () => {
  let { cells, captions } = generatePuzzle()

  print2d(cells, 'value')
  console.log(captions)
})

test('createPuzzle testing', () => {
  let { cells, captions } = createPuzzle()

  print2d(cells, 'value')
  console.log(captions)
})
