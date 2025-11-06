import { getWords } from "@/lib/data"
import createPuzzle from "@/lib/service/main";
import Layout from "@/components/layout";
import Puzzle from "@/components/puzzle";

export async function getStaticProps({ params }) {

  const data = await getWords(params.id);
  const puzzle = createPuzzle(data);

  return {
    props: {
      puzzle: JSON.parse(JSON.stringify(puzzle))
    }
  }
}

export async function getStaticPaths() {
  
  const paths = [
    {
      params: {
        id: '1'
      }
    },
    {
      params: {
        id: '2'
      }
    }
  ]

  return {
    paths,
    fallback: false
  }
}


export default function Post({ puzzle }) {

  return (
    <Layout>
      {/* Puzzle */}
      <div className="mt-2">
        <Puzzle puzzle={puzzle} />
      </div>
    </Layout>
  )
}