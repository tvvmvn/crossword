import { useState } from "react"
import Keyboard from "./keyboard";

// captions
const FILTER_MAP = {
  ACROSS: (caption) => !caption.down,
  DOWN: (caption) => caption.down
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

export default function Puzzle({ puzzle }) {
  
  const [cells, setCells] = useState(puzzle.cells);
  const { captions } = puzzle;
  const [currentCrds, setCurrentCrds] = useState([-1, -1])
  const [group, setGroup] = useState([-1, -1]);
  const [downward, setDownward] = useState(false)
  const [typing, setTyping] = useState(false)
  const [done, setDone] = useState(false);
  const errors = cells.flat()
    .filter(cell => cell.q != cell.value)

  // console.log(group)

  function handleSubmit(e) {
    e.preventDefault();

    setDone(true)
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
    setGroup(cells[r][c].group)
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
      return 'bg-green-100'
    }

    // focused cell
    if (r == currentCrds[0] && c == currentCrds[1]) {
      return 'bg-blue-100'
    }

    // active height
    if (downward && group[1] == _group[1]) {
      return 'bg-gray-100'
    }
    
    // active width
    if (!downward && group[0] == _group[0]) {
      return 'bg-gray-100'
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
              Try later 🥲
            </span>
          ) : (
            <span className="text-blue-400">
              You did it! 🎉
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
                          className="absolute top-0 left-0 px-1 font-semibold z-10"
                        >
                          {col.label}
                        </label>
                      )}
                      <input 
                        id={col.id}
                        type="text" 
                        className={`absolute inset-0 text-center outline-none ${bgColor(r, c, col.q, col.value, col.group)}`}
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
        <p className="my-4">
          <button 
            type="submit"
            className="px-2 py-1 bg-black text-white"
          >
            Submit
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