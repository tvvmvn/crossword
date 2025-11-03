import { createPuzzle } from "@/lib/service"
import { getDateTime } from "@/lib/time"
import Form from "@/components/form"
import Puzzle from "@/components/puzzle"
import Share from "@/components/share"
import Layout from "@/components/layout"
import { FaBeer, FaGithub, FaInstagram } from 'react-icons/fa';
import Link from "next/link"

export async function getStaticProps() {

  let fruits = [
    'dragonfruit',
    'strawberry',
    'pineapple',
    'avocado',
    'orange',
    'banana',
    'grape',
    'peach',
    'apple',
    'pear',
  ]

    // mock data
  let data = fruits.map(fruit => {
    return {
      name: fruit,
      meaning: 'a caption for ' + fruit
    }
  })

  const puzzle = createPuzzle(data);
  // console.log(puzzle);
  
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
        <p className="text-red-400">
          매일 업데이트됩니다. 🗓️
        </p>
        <small className="mt-2">
          {hour}:{minutes}
        </small>
      </header>

      {/* Share button */}
      <div className="px-2">
        <Share />
      </div>

      {/* Puzzle */}
      <div className="mt-2">
        <Puzzle puzzle={puzzle} />
      </div>

      <footer className="mt-8 pt-8 pb-12 border-t-2 border-dashed">
        <div className="px-2">
          {/* About */}
          <section className="">
            <h3 className="my-4 text-lg font-semibold">
              더 읽기
            </h3>
            <Link href="/more">
              <p className="my-4">
                단어의 선정 기준, 난이도, 출제 방법 등에 대해 알아보기
              </p>
            </Link>
          </section>

          {/* Subscribe form */}
          <section className="mt-8">
            <h3 className="my-4 text-lg font-semibold">
              구독
            </h3>
            <p className="my-4">
              새로운 소식을 가장 먼저 받아보세요.
              언제든지 구독을 취소할 수 있습니다.
            </p>
            <Form />
          </section>

          {/* About */}
          <section className="mt-8">
            <h3 className="my-4 text-lg font-semibold">
              소개
            </h3>
            <div className="flex gap-4">
              <img
                src="/avatar.webp"
                className="w-20 h-20 object-cover rounded-full"
                alt="avatar"
              />
              <div>
                <p className="">
                  안녕하세요 개발자 Taemin입니다.
                  많은 분들이 매일 가볍게 즐기는 상상을 하며 만들었어요.
                  오늘도 화이팅!
                </p>
                <p className="mt-4 flex gap-2">
                  {/* <Link href="" target="_blank">
                    <FaBeer size={24} />
                  </Link> */}
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