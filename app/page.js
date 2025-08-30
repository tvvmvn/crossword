import { getAllPosts } from "@/lib/data"
import Link from "next/link";

export default function Home() {

  const posts = getAllPosts();

  return (
      <>
        <header className="px-4">
          <h1 className="my-4 text-2xl font-semibold"> 
            Learning Korean with Crossword Puzzle! 📚
          </h1>
        </header>



        <div className="px-4">
          <blockquote className="mt-8 px-4 py-2 bg-red-400 rounded">
            <p className="text-white font-semibold">
              🗓️ Puzzle is updated on every saturday!
            </p>
          </blockquote>
        </div>

        <div className="mt-8">
          <img 
            src="/crossword/main.jpg"
            alt="main-image" 
            className="w-full h-48 object-cover"
          />
        </div>

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