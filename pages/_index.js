import Layout from "@/components/layout"
import Link from "next/link"

export default function Home() {

  return (
    <Layout>
      <h1 className="my-4 font-semibold">
        Puzzle List
      </h1>
      <ul>
        <li>
          <Link href="/posts/1">
            Puzzle 1
          </Link>
        </li>
        <li>
          <Link href="/posts/2">
            Puzzle 2
          </Link>
        </li>
      </ul>
    </Layout>
  )
}