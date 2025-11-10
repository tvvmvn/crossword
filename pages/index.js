import Link from "next/link"
import createPuzzle from "@/lib/service/main"
import { getDateTime } from "@/lib/time"
import Form from "@/components/form"
import Puzzle from "@/components/puzzle"
import Share from "@/components/share"
import Layout from "@/components/layout"
import Avatar from "@/components/avatar"
import { FaRegEnvelope, FaGithub, FaInstagram } from 'react-icons/fa';

export async function getStaticProps() {
  try {
    const puzzle = await createPuzzle();
    // console.log(puzzle);
    
    return {
      props: {
        d: getDateTime(),
        puzzle
      }
    }
  } catch (ex) {
    console.error(ex)
    return { notFound: true } 
  }
}

export default function Home({ d, puzzle }) {

  const { board, captions } = puzzle;
  const { year, month, date, day, hour, minutes } = d;

  return (
    <Layout>
      {/* Header */}
      <header className="pt-4 px-2">
        <p className="my-2 font-semibold">
          CrossDays [{hour}:{minutes}]
        </p>
        <h1 className="my-4 text-2xl font-semibold">
          {month}월 {date}일 {day}요일 퀴즈 🤓
        </h1>
        <blockquote className="p-2 border-l-6 border-red-300 bg-red-100">
          <p className="">
            🗓️ 매일 업데이트됩니다. 
          </p>
        </blockquote>
      </header>

      {/* Share button */}
      <div className="mt-8 px-2">
        <Share />
      </div>

      {/* Puzzle */}
      <div className="mt-2">
        <Puzzle 
          initialBoard={board}
          captions={captions}
        />
      </div>

      <footer className="mt-8 pt-8 px-2 pb-12">
        <h2 className="my-8 text-2xl font-semibold">
          더 읽기
        </h2>
        {/* About */}
        <section className="">
          <h3 className="my-4 text-lg font-semibold">
            퍼즐에 대해서
          </h3>
          <Link href="/more">
            <p className="my-4 italic">
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
            개발자의 새로운 소식을 가장 먼저 받아보세요!
          </p>
          <Form />
        </section>

        {/* About */}
        <section className="mt-8">
          <h3 className="my-4 text-lg font-semibold">
            안녕하세요!
          </h3>
          <div className="flex">
            <div className="w-20 h-20 shrink-0">
              <Avatar 
                d={d} 
                board={board} 
              />
            </div>
            <div className="ml-4">
              <p className="">
                개발자 Taemin입니다.
                많은 분들이 매일 가볍게 즐기는 상상을 하며 만들었어요.
                오늘도 화이팅!
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Link href="mailto:tvvmvn@gmail.com" target="_blank">
                  <FaRegEnvelope size={26} />
                </Link>
                <Link href="https://github.com/tvvmvn" target="_blank">
                  <FaGithub size={24} />
                </Link>
                <Link href="" target="_blank">
                  <FaInstagram size={24} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </Layout>
  )
}