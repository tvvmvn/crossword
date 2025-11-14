import { useEffect, useState } from "react"

// captions
const FILTER_MAP = {
  가로: (caption) => !caption.down,
  세로: (caption) => caption.down
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

export default function Avatar({ d, board, captions }) {

  const [count, setCount] = useState(0)
  const [active, setActive] = useState(false)
  const { month, date } = d;

  useEffect(() => {
    if (count > 2) {
      setActive(true)
    }
  }, [count])

  function handleClick(e) {
    setCount(count + 1)
  }

  function handleClose() {
    setActive(false)
    setCount(0)
  }

  const hidden = (
    <div 
      className="fixed inset-0 bg-white px-2 overflow-auto z-90"
      onClick={handleClose}
    >
      <h1 className="my-8 text-2xl font-semibold text-center">
        {month}월 {date}일 일요일 
        <br />
        영어단어 퀴즈 🇰🇷🇺🇸
      </h1>
      <table className="w-full">
        <tbody className="divide-y divide-gray-700 border bg-black">
          {board.map((row, r) => (
            <tr
              key={r}
              className="divide-x divide-gray-700 grid"
              style={{ gridTemplateColumns: `repeat(${board[r].length}, minmax(0, 1fr))` }}
            >
              {row.map((col, c) => (
                <td key={c} className="pt-[100%] relative">
                  {!!col.label && (
                    <label 
                      htmlFor={col.id}
                      className="absolute top-0 left-0 px-px text-xs z-[999]"
                    >
                      {col.label}
                    </label>
                  )}
                  {col.active && (
                    <input
                      id={col.id}
                      type="text" 
                      className="absolute inset-0 bg-white"
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* captions */}
      <div className="">
        {FILTER_NAMES.map(name => (
          <section key={name}>
            <h3 className="my-4 font-semibold flex gap-2 items-center">
              {name} 힌트
            </h3>

            <ul>
              {captions.filter(FILTER_MAP[name]).map(caption => (
                <li key={caption.id}>
                  {caption.label}. {caption.content}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )

  return (
    <>
      {active && hidden}

      <img
        src="/pongo.webp"
        className="w-full h-full object-cover rounded-full"
        alt="avatar"
        onClick={handleClick}
      />
    </>
  )
}