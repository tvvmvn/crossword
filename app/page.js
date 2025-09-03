import Link from "next/link";
import { getAllPosts } from "@/lib/data"
import About from "@/components/about";

export default function Home() {

  const posts = getAllPosts();

  return (
      <>
        <header className="px-4">
          <About />
          <h1 className="my-8 text-8xl font-semibold"> 
            Cross <br/> 
            Word+
          </h1>
        </header>

        {/* <div className="mt-4">
          <blockquote className="px-4 py-2 bg-red-400">
            <p className="text-white font-semibold">
              🗓️ Puzzle is updated on every saturday!
            </p>
          </blockquote>
        </div> */}


        <section className="px-4">
          <h3 className="my-4 text-lg font-semibold">
            Korean
          </h3>

          <ul className="list-disc mt-4 px-4">
            {posts
              .filter(post => post.lang == 'Korean')
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
            English
          </h3>

          <ul className="list-disc mt-4 px-4">
            {posts
              .filter(post => post.lang == 'English')
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