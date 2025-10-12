import Form from "@/components/form"
import Puzzle from "@/components/puzzle"
import Share from "@/components/share"
import sql from "@/lib/db"
import { createPuzzle } from "@/lib/service"
import { Github, Instagram, Mail } from "@deemlol/next-icons"
import Link from "next/link"

export async function getStaticProps() {
  
  const words = await sql`SELECT * FROM words`;
  const puzzle = createPuzzle(words)

  console.log(puzzle)
  
  return {
    props: {
      puzzle: JSON.parse(JSON.stringify(puzzle)),
      d: new Date().toISOString()
    },
    revalidate: 60 * 5 // every 5 minutes
  }
}

export default function Home({ puzzle, d }) {

  console.log(puzzle)
  
  return (
    <div className="">
      <div className="max-w-sm mx-auto px-4">
        <header className="mt-8">
          <h1 className="text-5xl font-semibold">
            <code>Crossword</code>
          </h1>
          <p className="mt-2">
            {d} 🎸😎
          </p>
        </header>

        <Share />

        <div className="mt-4">
          <Puzzle puzzle={puzzle} />
        </div>
      </div>

      <footer className="mt-20 pt-4 pb-12 bg-black">
        <div className="max-w-sm mx-auto px-4">
          {/* Subscribe form */}
          <section className="border-b border-gray-700">
            <Form />
          </section>
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
                <p className="my-4 flex gap-2">
                  <Link href="https://github.com/tvvmvn" target="_blank">
                    <Github size={24} color="#ddd" />
                  </Link>
                  <Instagram size={24} color="#ddd" />
                  <Mail size={24} color="#ddd" />
                </p>
              </div>
            </div>
          </section>
        </div>
      </footer>
    </div>
  )
}