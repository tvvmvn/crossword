import { useState } from "react"

function getAround(currentCrds, board) {
  const [r, c] = currentCrds;

  return {
    top: r > 0 && board[r - 1][c].active,
    bottom: r < board.length - 1 && board[r + 1][c].active,
    left: c > 0 && board[r][c - 1].active,
    right: c < board[r].length - 1 && board[r][c + 1].active
  }
}

const FILTER_MAP = {
  ACROSS: (caption) => !caption.down,
  DOWN: (caption) => caption.down
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

function generateKeys(board) {
  return board.flat()
    .filter(cell => cell.active)
    .map(cell => cell.value)
    .filter((key, i, self) => {
      if (i == self.indexOf(key)) {
        return key;
      }
    })
    .sort()
    .concat('del')
}

export default function Puzzle({ puzzle }) {
  
  const [board, setBoard] = useState(puzzle.board);
  const { captions } = puzzle;
  const [currentCrds, setCurrentCrds] = useState([-1, -1])
  const [downward, setDownward] = useState(false)
  const [typing, setTyping] = useState(false)
  const [done, setDone] = useState(false);
  const klines = Math.ceil(generateKeys(board).length / 7);

  console.log(currentCrds)

  const errors = board.flat()
    .filter(cell => cell.q != cell.value)

  function handleSubmit(e) {
    e.preventDefault();

    setDone(true)
  }

  function handleClick(r, c) {
    // set direction to move
    const { top, bottom, left, right } = getAround([r, c], board);
 
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
    
    setCurrentCrds([r, c])
    setTyping(true)
  }

  function keyClicked(key) {
    // update q
    const updatedBoard = board.map((row, r) => row.map((col, c) => {
      if (r == currentCrds[0] && c == currentCrds[1]) {
        return { ...col, q: key == 'del' ? '': key }
      }
      return col;
    }))

    setBoard(updatedBoard)

    // move 
    const { top, bottom, left, right } = getAround(currentCrds, board)
    const backspace = key == 'del';
    
    const west = !downward && backspace && left;
    const east = !downward && !backspace && right;
    const north = downward && backspace && top;
    const south = downward && !backspace && bottom;
    
    const [r, c] = currentCrds;

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

  function bgColor(r, c, q, value) {
    if (done) {
      if (q != value) {
        return 'bg-red-100'
      }
      return 'bg-emerald-100'
    }

    if (r == currentCrds[0] && c == currentCrds[1]) {
      if (downward) {
        return 'bg-yellow-100'
      }
      return 'bg-blue-100'
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
            <tr key={r} className="divide-x grid grid-cols-8">
              {row.map((col, c) => (
                <td key={c} className="relative pt-[100%] bg-gray-200">
                  {col.active && (
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
                        className={`absolute inset-0 text-center outline-none ${bgColor(r, c, col.q, col.value)}`}
                        value={done ? col.value : col.q}
                        onClick={(e) => handleClick(r, c)}
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

      {/* 
        virtual keyboard 

        height for each key: 8vh
        keyboard height: each key height * line count of keys
        bottom rest: 4vh
      */}
      <div 
        className={`fixed left-0 bottom-0 bg-black/[0.2] w-full px-4 transition-all`}
        style={{ 
          height: (klines * 8) + 4 + 'vh',
          bottom: typing ? '0' : `-${(klines * 10) + 5}vh`
        }}
        onClick={(e) => {
          if (e.target == e.currentTarget) {
            setTyping(false)
          }
        }}
      >
        <ul className="max-w-sm mx-auto grid grid-cols-7 border">
          {generateKeys(board).map(key => (
            <li 
              key={key}
              className={`h-[8vh] bg-white flex justify-center items-center ${key == 'del' && 'text-red-400'}`}
              onClick={() => keyClicked(key)}
            >
              {key}
            </li>
            ))}
        </ul>
        <p></p>
      </div>
    </form>
  )
}