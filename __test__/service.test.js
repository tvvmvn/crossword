import { 
  getWord, 
} from "../lib/data";
import { 
  createPuzzle, 
  generatePuzzle, 
} from "../lib/service";


test('getWord testing', async () => {
  console.log(await getWord('a  '))
  console.log(await getWord(' b '))
})

test('generatePuzzle testing', async () => {
  let { board, captions } = await generatePuzzle()

  console.log(captions)
})

// test('createPuzzle testing', async () => {
//   let { board, captions } = await createPuzzle()

//   console.log(captions)
// })
