'use client'

import { useState } from "react"

export default function About() {

  const [active, setActive] = useState(false)

  return (
    <div className="flex justify-end">
      <div id="drop-container" className="relative">
        <button
          className="px-2 py-1 text-gray-400 font-semibold cursor-pointer"
          onClick={() => setActive(!active)}
        >
          About
        </button>
        {active && (
          <div id="drop-content" className="w-64 absolute right-0 p-4 rounded-xl bg-white border border-gray-200">
            <img
              className="w-20 h-20 object-cover rounded-full"
              src="/crossword/avatar.webp"
              alt="avatar"
            />
            <p className="my-2 text-blue-400">tvvmvn@gmail.com</p>
            Hi there! My name is Taemin and I'm dev from Korea.
            I made this Website to help those who are learning Korean language.
            I tried to put ordinary words in puzzle to make this helpful.
            Thank you for loving Korean culture!
          </div>
        )}
      </div>
    </div>
  )
}