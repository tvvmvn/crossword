import { SlKey } from "react-icons/sl";
import { TfiKey } from "react-icons/tfi";
import { RiKey2Line } from "react-icons/ri";

// captions
const FILTER_MAP = {
  가로: 'across',
  세로: 'down',
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

export default function Verbose({ captions }) {
  return (
    <div className="mt-12 px-2 bg-gray-100">
      {FILTER_NAMES.map(name => {
        return (
          <section key={name} className="py-4">
            <h3 className="my-4 text-xl text-center">
              {name} 정답
            </h3>
            <ul className=""> 
              {captions[FILTER_MAP[name]].map(caption => (
                <li 
                  key={caption.label}
                  className="mt-4"
                >
                  <h3 className="my-2">
                    <span className="font-semibold">
                      {caption.label}
                    </span>
                    <span className="ml-2">
                      {caption.content}
                    </span>
                  </h3>

                  <p className="p-2 border-b">
                    {caption.about}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}