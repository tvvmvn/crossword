import Puzzle from "@/components/puzzle"
import { createPuzzle } from "@/lib/service"

export async function getStaticProps() {
  
  const puzzle = await createPuzzle()
  console.log(puzzle)
  
  return {
    props: {
      puzzle: JSON.parse(JSON.stringify(puzzle)),
      d: new Date().toLocaleString()
    },
    revalidate: 60 * 10 // every 10 minutes 
  }
}

export default function Home({ puzzle, d }) {
  
  console.log(puzzle)

  return (
    <div className="px-4 max-w-sm mx-auto">
      <h1 className="my-4 font-semibold">
        {d}
      </h1>
      
      <Puzzle puzzle={puzzle} />
    </div>
  )  
}