import Form from "@/components/form"
import Puzzle from "@/components/puzzle"
import Share from "@/components/share"
import { getDay } from "@/lib/time"
import sql from "@/lib/db"
import { createPuzzle } from "@/lib/service"
import { getFrameSet } from "@/lib/frames"
import { Inter, Roboto_Mono, Dongle } from 'next/font/google'
import Layout from "@/components/layout"

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })
const roboto_mono = Roboto_Mono({ subsets: ['latin'] })

export async function getStaticProps() {

  const frameSet = getFrameSet(1);
  const words = await sql`SELECT * FROM words`;
  const puzzle = createPuzzle(frameSet, words)

  console.log(puzzle)

  let d = new Date();
  d.setUTCHours(d.getUTCHours() + 9)

  let year = d.getUTCFullYear()
  let month = d.getUTCMonth()
  let date = d.getUTCDate()
  let day = d.getUTCDay()
  let hour = d.getUTCHours()
  let minutes = d.getUTCMinutes();

  return {
    props: {
      d: { month, date, day, year, hour, minutes },
      puzzle: JSON.parse(JSON.stringify(puzzle)),
    },
    revalidate: 60 * 5 * 12 * 12 // every day
  }
}

export default function Home({ d, puzzle }) {

  const { month, date, day, year, hour, minutes } = d;
  console.log(puzzle)

  return (
    <Layout>
      {/* Header */}
      <header className="pt-4 px-4">
        <h1 className={`my-4 text-4xl font-semibold ${roboto_mono.className}`}>
          {month + 1}월 {date}일 {getDay(day)}요일 ✏️
        </h1>
        <p className="mt-2">
          {hour}:{minutes}
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
    </Layout>
  )
}