import Link from "next/link";
import { getAllPosts, getPost } from "@/lib/data";
import Puzzle from "@/components/puzzle";

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
      <p className="my-4">
        <Link href="/" className="px-4">
          ← Back
        </Link>
      </p>
      
      <Puzzle 
        id={post.id}
        initialCells={post.cells} 
        captions={post.captions}
      />
    </>
  )
}
