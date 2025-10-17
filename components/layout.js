import Head from "next/head";
import Script from "next/script";
import { Analytics } from '@vercel/analytics/next';

export default function Layout({ children }) {

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Crossword Puzzle</title>
        <meta name="description" content="crossword puzzle" />
        <Script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1123671203924892" 
          crossOrigin="anonymous"
        />
      </Head>

      <main className="max-w-xl mx-auto bg-white">
        {children}
      </main>

      <Analytics />    
    </div>
  )
}