import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "K-Crossword",
  description: "Learning Korean is FUN with Crossword Puzzle!",
  verification: {
    google: "yLKrPSBUo6umY7XBmdKI72TM2LMwY0kmDtvgv6P24e8" 
  }
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-black">
          <div className="max-w-xl mx-auto bg-white">
            
            {/* Ad */}
            <ins
              className="kakao_ad_area"
              style={{ display: "none" }}
              data-ad-unit="DAN-aOZndUWesDghXUKx"
              data-ad-width="320"
              data-ad-height="50"
            >
            </ins>

            {/* Main */}
            <main className="min-h-screen">
              {children}
            </main>

            {/* Ad */}
            <section className="mt-12">
              <ins 
                className="kakao_ad_area" 
                style={{ display: "none" }}
                data-ad-unit="DAN-oNIi2UgP1XBkgYSj"
                data-ad-width="320"
                data-ad-height="100"
              >
              </ins>
            </section>

            <Script
              type="text/javascript"
              src="//t1.daumcdn.net/kas/static/ba.min.js"
              async
            />
          </div>
        </div>
      </body>
    </html>
  )
}