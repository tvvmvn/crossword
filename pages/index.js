import createPuzzle from "@/lib/service"
import { getDateTime } from "@/lib/time"
import { getFrameSet } from "@/lib/frames"
import Form from "@/components/form"
import Puzzle from "@/components/puzzle"
import Share from "@/components/share"
import Layout from "@/components/layout"
import { FaBeer, FaGithub, FaInstagram } from 'react-icons/fa';
import Link from "next/link"

export async function getStaticProps() {

  const puzzle = await createPuzzle();
  console.log(puzzle)
  
  return {
    props: {
      d: getDateTime(),
      puzzle: JSON.parse(JSON.stringify(puzzle)),
    },
    revalidate: 60 * 5 * 12 * 12 // every day
  }
}

export default function Home({ d, puzzle }) {

  console.log(puzzle)
  const { year, month, date, day, hour, minutes } = d;

  return (
    <Layout>
      {/* Header */}
      <header className="pt-4 px-2">
        <h1 className={`my-4 text-2xl font-semibold`}>
          {month + 1}월 {date}일 {day}요일 퀴즈 🤓
        </h1>
        <p className="mt-2">
          {hour}:{minutes}
        </p>
      </header>

      {/* Share button */}
      <div className="px-2">
        <Share />
      </div>

      {/* Puzzle */}
      <div className="mt-4 px-2">
        <Puzzle puzzle={puzzle} />
      </div>

      <div className="my-8 border-t-2"></div>

      <footer className="pb-12">
        <div className="px-2">
          {/* Subscribe form */}
          <section className="border-b border-gray-400">
            <Form />
          </section>

          {/* About */}
          <section className="mt-4">
            <h3 className="my-4 text-lg font-semibold">
              About
            </h3>
            <div className="flex gap-4">
              <img
                src="/avatar.webp"
                className="w-20 h-20 object-cover rounded-full"
                alt="avatar"
              />
              <div>
                <p className="">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
                <p className="mt-4 flex gap-2">
                  <Link href="" target="_blank">
                    <FaBeer size={24} />
                  </Link>
                  <Link href="https://github.com/tvvmvn" target="_blank">
                    <FaGithub size={24} />
                  </Link>
                  <Link href="" target="_blank">
                    <FaInstagram size={24} />
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </div>
      </footer>
    </Layout>
  )
}