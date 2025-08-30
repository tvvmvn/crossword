'use client'

import { useState } from "react"

export default function About() {

  const [active, setActive] = useState(false)

  return (
    <div className="flex justify-end">
      <div id="drop-container" className="relative">
        <button
          className="p-1 text-gray-400 font-semibold cursor-pointer"
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
            Hi there! Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </div>
        )}
      </div>
    </div>
  )
}