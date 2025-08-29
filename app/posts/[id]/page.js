import { getPost } from "@/lib/data";
import Link from "next/link";
import Puzzle from "@/components/puzzle";
import { getAllPosts } from "@/lib/data";

export function generateStaticParams() {
  const posts = getAllPosts();
 
  return posts.map((post) => ({
    id: post.id,
  }))
}

export default async function Page({ params }) {

  const { id } = await params;
  const post = getPost(id);

  console.log(post)

  return (
    <>
      <div className="px-4">
        <h1 className="my-4 text-2xl font-semibold">
          Puzzle at {post.id} ✏️
        </h1>

        <p className="my-4">
          <Link href="/" className="">
            ← Back
          </Link>
        </p>
      </div>

      <Puzzle initialCells={post.cells} />

      <section className="mt-8 px-4">
        <h3 className="my-4 font-semibold">
          Across
        </h3>
        <ul>
          {post.captions.filter(caption => caption.across)
            .map(caption => (
              <li key={caption.id}>
                {caption.label}. {caption.acrossValue}
              </li>
            ))}
        </ul>

        <h3 className="my-4 font-semibold">
          Down
        </h3>
        <ul>
          {post.captions.filter(caption => caption.down)
            .map(caption => (
              <li key={caption.id}>
                {caption.label}. {caption.downValue}
              </li>
            ))}
        </ul>
      </section>
    </>
  )
}
