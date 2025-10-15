import Head from "next/head";

export default function Layout({ children }) {

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Crossword Puzzle</title>
        <meta name="description" content="crossword puzzle" />
      </Head>

      <main className="max-w-xl mx-auto bg-white">
        {children}
      </main>
    </div>
  )
}