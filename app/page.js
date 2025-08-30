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
          <h3 className="my-4 text-xl font-semibold">
            Learning Korean 🇰🇷 <br /> 
            with Crossword Puzzle <br />
            is FUN!
          </h3>
        </header>

        {/* <div className="mt-4">
          <blockquote className="px-4 py-2 bg-red-400">
            <p className="text-white font-semibold">
              🗓️ Puzzle is updated on every saturday!
            </p>
          </blockquote>
        </div> */}


        <div className="px-4">
          <ul className="list-disc mt-8 px-4">
            {posts
              .map(post => (
              <li key={post.id} className="my-2">
                <Link 
                  href={"/posts/" + post.id}
                  className="underline"
                >
                  Puzzle at {post.id}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </>
  )
}