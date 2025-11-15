import "@/styles/globals.css";
import Script from "next/script";
import { Inter, Roboto_Mono, Dongle } from 'next/font/google'
const roboto_mono = Roboto_Mono({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <div className={roboto_mono.className}>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1123671203924892"
        crossOrigin="anonymous"
      />
      <Component {...pageProps} foo="bar" />
    </div>
  )
}
