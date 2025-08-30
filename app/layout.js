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
        <div className="bg-gray-100">
          <div className="max-w-xl min-h-screen mx-auto bg-white">
            <header className="pt-2"></header>
            
            <ins
              className="kakao_ad_area"
              style={{ display: "none" }}
              data-ad-unit="DAN-aOZndUWesDghXUKx"
              data-ad-width="320"
              data-ad-height="50"
            ></ins>
            <Script
              type="text/javascript"
              src="//t1.daumcdn.net/kas/static/ba.min.js"
              async
            />

            <main>
              {children}
            </main>

            <footer className="p-8"></footer>
          </div>
        </div>
      </body>
    </html>
  )
}