import { createPuzzle } from "@/lib/service"

export async function getStaticProps() {
  
  const puzzle = await createPuzzle()
  console.log(puzzle)
  
  return {
    props: {
      puzzle: JSON.parse(JSON.stringify(puzzle)),
      clock: new Date().toUTCString()
    },
    revalidate: 60 * 10 // every 10 minutes 
  }
}

const FILTER_MAP = {
  ACROSS: (caption) => !caption.down,
  DOWN: (caption) => caption.down
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

export default function Home({ puzzle, clock }) {
  
  console.log(puzzle)
  const { board, captions } = puzzle;

  return (
    <div className="px-4">
      <h1 className="my-4 font-semibold">
        {clock}
      </h1>

      <table className="w-full table-fixed">
        <tbody className="border divide-y">
          {board.map((row, r) => (
            <tr key={r} className="divide-x grid grid-cols-8">
              {row.map((col, c) => (
                <td key={c} className="relative pt-[100%] bg-gray-200">
                  {col.active && (
                    <>
                      {!!col.label && (
                        <label 
                          htmlFor={col.id}
                          className="absolute top-0 left-0 px-1 font-semibold z-10"
                        >
                          {col.label}
                        </label>
                      )}
                      <input 
                        id={col.id}
                        type="text" 
                        className="absolute inset-0 bg-white text-center outline-none"
                        value={col.value}
                        readOnly
                      />
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {FILTER_NAMES.map(name => (
        <section key={name}>
          <h3 className="my-4 font-semibold">
            {name}
          </h3>

          <ul>
            {captions.filter(FILTER_MAP[name]).map(caption => (
              <li key={caption.word}>
                {caption.label}. {caption.content}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )  
}