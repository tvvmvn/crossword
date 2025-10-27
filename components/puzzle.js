import { useState } from "react"
import Keyboard from "./keyboard";
import { FaCircleInfo, FaArrowRight } from 'react-icons/fa6';

// captions
const FILTER_MAP = {
  가로: (caption) => !caption.down,
  세로: (caption) => caption.down
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

export default function Puzzle({ puzzle }) {
  
  const [cells, setCells] = useState(puzzle.cells);
  const { captions } = puzzle;
  const [currentCrds, setCurrentCrds] = useState([-1, -1])
  const [space, setGroup] = useState([-1, -1]);
  const [downward, setDownward] = useState(false)
  const [typing, setTyping] = useState(false)
  const [done, setDone] = useState(false);
  const errors = cells.flat()
    .filter(cell => cell.q != cell.value)

  // console.log(space)

  function handleSubmit(e) {
    e.preventDefault();

    const r = confirm('확인할까요?');

    if (r) {
      setDone(true)
    }
  }

  function handleClick(newCrds) {
    const [r, c] = newCrds;

    // set direction to move
    const { top, bottom, left, right } = cells[r][c].around;
    
    const across = left || right
    const down = top || bottom

    if (across && down) {
      // same clicked
      if (r == currentCrds[0] && c == currentCrds[1]) {
        setDownward(!downward)
      } else {
        setDownward(false)
      }
    } else if (across) {
      setDownward(false)
    } else if (down) {
      setDownward(true)
    }
    
    setCurrentCrds(newCrds)
    setGroup(cells[r][c].space)
    setTyping(true)
  }

  function keyClicked(key) {
    const [r, c] = currentCrds;

    // update q
    const updatedBoard = cells.map((row, _r) => row.map((col, _c) => {
      if (_r == r && _c == c) {
        return { ...col, q: key == 'del' ? '': key }
      }
      return col;
    }))

    setCells(updatedBoard)
    
    // move
    const { top, bottom, left, right } = cells[r][c].around;
    const backspace = key == 'del';
    
    const west = !downward && backspace && left;
    const east = !downward && !backspace && right;
    const north = downward && backspace && top;
    const south = downward && !backspace && bottom;
    
    if (west) {
      setCurrentCrds([r, c - 1])
    } else if (east) {
      setCurrentCrds([r, c + 1])
    } else if (north) {
      setCurrentCrds([r - 1, c])
    } else if (south) {
      setCurrentCrds([r + 1, c])
    }
  }

  function bgColor(r, c, q, value, _group) {
    if (done) {
      if (q != value) {
        return 'bg-red-100'
      }
      return 'bg-blue-100'
    }

    // focused cell
    if (r == currentCrds[0] && c == currentCrds[1]) {
      return 'bg-yellow-300'
    }

    // active height
    if (downward && space[1] == _group[1]) {
      return 'bg-yellow-100'
    }
    
    // active width
    if (!downward && space[0] == _group[0]) {
      return 'bg-yellow-100'
    }

    return 'bg-white'
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* result messages */}
      {done && (
        <p className="my-4">
          {errors.length ? (
            <span className="text-red-400">
              내일 다시 만나요 🥲
            </span>
          ) : (
            <span className="text-blue-400">
              축하합니다! 🎉
            </span>
          )}
        </p>
      )}

      {/* cells */}
      <table className="w-full table-fixed">
        <tbody className="border border-gray-700 divide-y divide-gray-700">
          {cells.map((row, r) => (
            <tr key={r} className="divide-x divide-gray-700 grid grid-cols-7">
              {row.map((col, c) => (
                <td key={c} className="relative pt-[100%] bg-black">
                  {!!col.active && (
                    <>
                      {!!col.label && (
                        <label 
                          htmlFor={col.id}
                          className="absolute top-0 left-0 px-1 z-10"
                        >
                          {col.label}
                        </label>
                      )}
                      <input 
                        id={col.id}
                        type="text" 
                        className={`absolute inset-0 text-center outline-none font-bold ${bgColor(r, c, col.q, col.value, col.space)}`}
                        value={done ? col.value : col.q}
                        onClick={done ? null : (e) => handleClick([r, c])}
                        readOnly
                      />
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <span className="flex gap-2 items-center text-red-400 font-bold">
          <FaCircleInfo /> 팁
        </span>
        <p className="text-red-400">
          모르는 단어가 나와도 쉽게 포기하지 마세요! 
          사전을 찾아가면서 퍼즐을 완성해나가다 보면 단어들도 내 것이 됩답니다!
        </p>
      </div>

      {/* captions */}
      {FILTER_NAMES.map(name => (
        <section key={name}>
          <h3 className="my-4 font-semibold">
            {name}
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

      {/* submit button */}
      {!done && (
        <p className="px-2 my-4 flex justify-end">
          <button 
            type="submit"
            className="flex items-center gap-2 cursor-pointer"
          >
            정답 확인 <FaArrowRight />
          </button>
        </p>
      )}

      {/* virtual keyboard */}
      <Keyboard
        typing={typing}
        setTyping={setTyping}
        keyClicked={keyClicked}
        f={() => {
          setCurrentCrds([-1, -1])
          setGroup([-1, -1])
        }}
      />
    </form>
  )
}