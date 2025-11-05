import Canvas from "./canvas";
import PuzzleGenerator from "./generator";
import Human from "./human";

export default function createPuzzle(data) {

  /*
  1 human handle canvas
  2 create puzzle with generator
  3 return puzzle
  */

  // Canvas
  let canvas = new Canvas(100, 100)

  // Human
  let human = new Human(canvas);
  let words = data.map(item => item.name).sort((a, b) => b.length - a.length);
  console.log(words)
  let completedCanvas = human.completeCanvas(words);

  // Generator
  let generator = new PuzzleGenerator(completedCanvas)
  let puzzle = generator.createPuzzle(data);

  return puzzle;
}