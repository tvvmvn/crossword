import "@/styles/globals.css";

import { Inter, Roboto_Mono, Dongle } from 'next/font/google'
const roboto_mono = Roboto_Mono({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <div className={roboto_mono.className}>
      <Component {...pageProps} />
    </div>
  )
}
