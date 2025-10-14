import Form from "@/components/form"
import Puzzle from "@/components/puzzle"
import Share from "@/components/share"
import { getDay } from "@/lib/time"
import sql from "@/lib/db"
import { createPuzzle } from "@/lib/service"

export async function getStaticProps() {
  
  const words = await sql`SELECT * FROM words`;
  const puzzle = createPuzzle(words)

  console.log(puzzle)

  let d = new Date(); 
  d.setUTCHours(d.getUTCHours() + 9)

  let year = d.getUTCFullYear()
  let month = d.getUTCMonth()
  let date = d.getUTCDate()
  let day = d.getUTCDay()
  let hour = d.getUTCHours()
  
  return {
    props: {
      d: { month, date, day, year, hour },
      puzzle: JSON.parse(JSON.stringify(puzzle)),
    },
    revalidate: 60 * 5 * 12 * 12 // every day
  }
}

export default function Home({ d, puzzle }) {

  const { month, date, day, year, hour } = d;
  console.log(puzzle)
  
  return (
    <div className="max-w-xl mx-auto bg-white">
      {/* Header */}
      <header className="pt-4 px-4">
        <h1 className="my-4 text-4xl font-semibold">
          {month + 1}월 {date}일 {getDay(day)}요일 ✏️
        </h1>
        <p className="mt-2">
           hour: {hour} 
        </p>
      </header>

      {/* Share button */}
      <div className="px-4">
        <Share />
      </div>

      {/* Puzzle */}
      <div className="mt-4 px-4">
        <Puzzle puzzle={puzzle} />
      </div>

      <footer className="mt-20 pt-4 pb-12 bg-black">
        <div className="px-4">
          {/* Subscribe form */}
          <section className="border-b border-gray-700">
            <Form />
          </section>

          {/* About */}
          <section className="mt-4">
            <h3 className="my-4 text-lg font-semibold text-white">
              About
            </h3>
            <div className="flex gap-4">
              <img
                src="/avatar.webp"
                className="w-20 h-20 object-cover rounded-full"
                alt="avatar"
              />
              <div>
                <p className="text-white">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
              </div>
            </div>
          </section>
        </div>
      </footer>
    </div>
  )
}