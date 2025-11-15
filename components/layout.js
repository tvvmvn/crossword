import Head from "next/head";
import { Analytics } from '@vercel/analytics/next';

export default function Layout({ children }) {

  return (
    <div className="bg-gray-100">
      <Head>
        <title>
          Crossword Puzzle
        </title>
        <meta 
          name="description" 
          content="crossword puzzle" 
        />
        <meta name="google-adsense-account" content="ca-pub-1123671203924892"></meta>
      </Head>
      <main className="max-w-xl mx-auto bg-white">
        {children}
      </main>

      {/* Analytics by Vercel */}
      <Analytics />
    </div>
  )
}