import { getWords } from "@/lib/data";
import Canvas from "./canvas";
import PuzzleGenerator from "./generator";
import Human from "./human";

export default async function createPuzzle() {

  /*
  1 human handle canvas
  2 create puzzle with generator
  3 return puzzle
  */
  
  const data = await getWords();

  // Canvas
  let canvas = new Canvas(12, 12)

  // Human
  let human = new Human(canvas);
  let words = data.map(item => item.name).sort((a, b) => b.length - a.length);
  console.log(words)
  let completedCanvas = human.completeCanvas(words);

  console.log(completedCanvas)

  // Generator
  let generator = new PuzzleGenerator(completedCanvas.body)

  return generator.createPuzzle(data);
}