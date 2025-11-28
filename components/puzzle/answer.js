import { SlKey } from "react-icons/sl";
import { TfiKey } from "react-icons/tfi";
import { RiKey2Line } from "react-icons/ri";
import { useState } from "react";

// captions
const FILTER_MAP = {
  가로: 'across',
  세로: 'down',
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

export default function Verbose({ captions }) {

  const [active, setActive] = useState('가로')

  return (
    <div className="mt-8 px-2">
      <div className="bg-gray-100">
        <div className="grid grid-cols-2 bg-gray-200">
          {FILTER_NAMES.map(name => (
            <button 
              key={name}
              className={`p-1 ${active == name ? 'bg-gray-100' : 'bg-gray-200'} font-semibold`}
              onClick={() => setActive(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <ul className="mt-8 px-2 pb-4">
          {captions[FILTER_MAP[active]].map(caption => (
            <li
              key={caption.label}
              className="mt-4"
            >
              <h3 className="my-2 font-semibold">
                {caption.label} {caption.content}
              </h3>
              <p className="my-2">
                {caption.about}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}