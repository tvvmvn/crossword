import Link from "next/link"
import Puzzleg from "@/lib/Puzzle"
import getWords from "@/lib/data"
import { getDateTime } from "@/lib/time"
// components
import Form from "@/components/form"
import Puzzle from "@/components/puzzle"
import Share from "@/components/share"
import Layout from "@/components/layout"
import Avatar from "@/components/avatar"
import HeaderAd from "@/components/header-ad"
import FooterAd from "@/components/footer-ad"
// icons
import { FaRegEnvelope, FaGithub, FaInstagram } from 'react-icons/fa';
import { FaRegCalendarCheck } from "react-icons/fa6";
import { PiMailboxDuotone, PiCheckerboardFill } from "react-icons/pi";
import { AiOutlineBell } from "react-icons/ai";

export async function getStaticProps() {
  try {
    let words = await getWords(30);
    let puzzle = new Puzzleg(12, 12, words);

    return {
      // dto
      props: {
        d: getDateTime(),
        puzzle: { 
          board: puzzle.board,
          captions: puzzle.captions
        }
      }
    }
  } catch (ex) {
    console.error(ex)
    return { notFound: true } 
  }
}

export default function Home({ d, puzzle }) {
  
  console.log(puzzle)
  const { year, month, date, day, hour, minutes } = d;

  return (
    <Layout>
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="px-4 py-2 flex justify-between items-center">
          <div id="logo" className="flex items-center">
            <PiCheckerboardFill 
              size={28} 
              className="text-black" 
            />
            <h1 className="ml-2 font-semibold">
              영어단어 십자말풀이
            </h1>
          </div>
          <Share />
        </div>
      </header>

      {/* Title */}
      <div className="mt-8 px-2">
        <h1 className="mt-4 text-2xl font-semibold">
          {month}월 {date}일 {day}요일 🤓
        </h1>
        <div className="mt-4 flex items-center">
          <FaRegCalendarCheck 
            size={20} 
            className="text-red-400" 
          /> 
          <span className="ml-2 text-red-400">
            매일 업데이트됩니다 [{d.hour}:{d.minutes}]
          </span>
        </div>
      </div>

      {/* Top Ads */}
      <HeaderAd />

      {/* Puzzle */}
      <div className="mt-8">
        <Puzzle puzzle={puzzle} />
      </div>

      {/* Bottom Ads */}
      <FooterAd />

      {/* Footer */}
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

        {/* Subscribe */}
        <section className="mt-8">
          <div className="my-4 flex gap-2 items-center">
            <h3 className="text-lg font-semibold">
              구독
            </h3>
            <AiOutlineBell size={24} />
          </div>
          <p className="my-4">
            개발자의 새로운 소식을 가장 먼저 받아보세요!
          </p>
          <Form />
        </section>

        {/* Terms */}
        <section className="mt-8">
          <h3 className="my-4 text-lg font-semibold">
            안녕하세요!
          </h3>
          <div className="flex">
            <div className="w-16 h-16 shrink-0">
              <Avatar 
                d={d} 
                puzzle={puzzle} 
              />
            </div>
            <div className="ml-4">
              <p className="my-2 text-sm">
                개발자 Taemin입니다.
                매일 하루 10분씩 가볍게 즐겨보세요.
                어느 순간 영어단어의 달인이 되어 있을 것입니다!
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Link href="mailto:tvvmvn@gmail.com" target="_blank">
                  <PiMailboxDuotone size={28} />
                </Link>
                <Link href="https://github.com/tvvmvn" target="_blank">
                  <FaGithub size={24} />
                </Link>
                <Link href="https://instagram.com/tvvmvn" target="_blank">
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