import Link from "next/link";
import { getAllPosts } from "@/lib/data"

export default function Home() {

  const posts = getAllPosts();

  return (
      <>
        <header className="px-4">
          <h1 className="my-8 text-8xl font-semibold"> 
            Cross <br/> 
            Word+
          </h1>
        </header>

        <section className="px-4">
          <h3 className="my-4 text-lg font-semibold">
            교양 문제 (한국어)
          </h3>

          <ul className="list-disc mt-4 px-4">
            {posts
              .filter(post => post.lang == 'ko')
              .map(post => (
              <li key={post.id} className="my-2">
                <Link 
                  href={"/posts/" + post.id}
                  className="underline"
                >
                  {post.id}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="my-4 text-lg font-semibold">
            영어단어 문제
          </h3>

          <ul className="list-disc mt-4 px-4">
            {posts
              .filter(post => post.lang == 'en')
              .map(post => (
              <li key={post.id} className="my-2">
                <Link 
                  href={"/posts/" + post.id}
                  className="underline"
                >
                  {post.id}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </>
  )
}