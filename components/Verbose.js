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
    <div className="mt-12 px-2 py-8 bg-slate-100">
      <section className="grid grid-cols-2 gap-4">
        {FILTER_NAMES.map(name => {
          return (
            <section key={name} className="">
              <div className="flex justify-center items-center">
                <h3 className="text-xl">
                  {name} 
                </h3>
                <RiKey2Line className="ml-2" />
              </div>
              <ul className="mt-8"> 
                {captions[FILTER_MAP[name]].map(caption => (
                  <li 
                    key={caption.label}
                    className="my-4 text-sm"
                  >
                    <span className="font-semibold">
                      {caption.label}
                    </span>
                    <span className="ml-2">
                      {caption.content}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </section>
    </div>
  )
}