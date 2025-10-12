import { useState } from "react"

// captions
const FILTER_MAP = {
  ACROSS: (caption) => !caption.down,
  DOWN: (caption) => caption.down
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

export default function Puzzle({ puzzle }) {
  
  const [board, setBoard] = useState(puzzle.board);
  const { captions } = puzzle;
  const [currentCrds, setCurrentCrds] = useState([-1, -1])
  const [downward, setDownward] = useState(false)
  const [done, setDone] = useState(false);
  const errors = board.flat().filter(cell => cell.q != cell.value)

  function handleSubmit(e) {
    e.preventDefault();
    setDone(true)
  }

  function handleClick(e, newCrds) {
    // cursor at last
    e.target.setSelectionRange(1, 1)

    const [r, c] = newCrds;

    // set direction to move
    const { top, bottom, left, right } = board[r][c].around;
    
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
  }
  
  // update q
  function handleChange(value) {
    let [r, c] = currentCrds;

    const updatedBoard = board.map((row, _r) => row.map((col, _c) => {
      if (_r == r && _c == c) {
        return { ...col, q: value[1] || value }
      }
      return col;
    }))
  
    setBoard(updatedBoard)
  }

  // move
  function handleKeyUp(value) {
    const del = value == ''
    const [r, c] = currentCrds;
    const { top, bottom, left, right } = board[r][c].around;

    const west = !downward && del && left;
    const east = !downward && !del && right;
    const north = downward && del && top;
    const south = downward && !del && bottom;
    
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

  function handleFocus(input, inputCrds) {
    let [r, c] = currentCrds;

    if (inputCrds[0] == r && inputCrds[1] == c) {
      input?.focus()
    }
  }

  function bgColor(q, value) {
    if (done) {
      if (q != value) {
        return 'bg-red-100'
      }
      return 'bg-green-100'
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

      {/* board */}
      <table className="w-full table-fixed">
        <tbody className="border divide-y">
          {board.map((row, r) => (
            <tr key={r} className="divide-x grid grid-cols-6">
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
                        className={`absolute inset-0 text-center outline-none ${downward ? 'focus:bg-yellow-100' : 'focus:bg-blue-100'} ${bgColor(col.q, col.value)}`}
                        value={done ? col.value : col.q}
                        onClick={(e) => handleClick(e, [r, c])}
                        onChange={(e) => handleChange(e.target.value)}
                        onKeyUp={(e) => handleKeyUp(e.target.value)}
                        ref={(input) => handleFocus(input, [r, c])}
                        autoComplete="off"
                        disabled={done}
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
                {caption.label}. {caption.meaning}
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
    </form>
  )
}