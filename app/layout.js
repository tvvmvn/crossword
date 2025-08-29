import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "K-Crossword",
  description: "Learning Korean is FUN with Crossword Puzzle!",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-gray-100">
          <div className="max-w-xl min-h-screen mx-auto bg-white">
            <header className="pt-2"></header>
            
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