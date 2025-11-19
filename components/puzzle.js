import { useState } from "react"
import Keyboard from "./keyboard";
import { FaCircleInfo, FaArrowRight, FaKey } from 'react-icons/fa6';
import Verbose from "./Verbose";

export default function Puzzle({ puzzle }) {
  
  const [board, setBoard] = useState(puzzle.board);
  const [currentCrds, setCurrentCrds] = useState([-1, -1])
  const [downward, setDownward] = useState(false)
  const [done, setDone] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    setDone(true)
  }

  function handleClick(newCrds) {
    const [r, c] = newCrds;
    const [a, b] = board[r][c].wordId;

    if (a > 0 && b > 0) {
      // same clicked
      if (r == currentCrds[0] && c == currentCrds[1]) {
        setDownward(!downward)
      } else {
        setDownward(false)
      }
    } else if (a > 0) {
      setDownward(false)
    } else if (b > 0) {
      setDownward(true)
    }
    
    setCurrentCrds(newCrds)
  }

  function keyClicked(key) {
    const [r, c] = currentCrds;

    // update q
    const updatedBoard = board.map((row, _r) => row.map((col, _c) => {
      if (_r == r && _c == c) {
        return { ...col, q: key == 'del' ? '': key }
      }
      return col;
    }))

    setBoard(updatedBoard)
    
    // check if movable
    let top = r > 0 && board[r - 1][c].value
    let bottom = r < board.length - 1 && board[r + 1][c].value
    let left = c > 0 && board[r][c - 1].value
    let right = c < board[r].length - 1 && board[r][c + 1].value

    // direction to move
    const west = !downward && key == 'del' && left;
    const east = !downward && key != 'del' && right;
    const north = downward && key == 'del' && top;
    const south = downward && key != 'del' && bottom;
    
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

  function bgColor(cellCrds, q, value, wordId) {

    let [cr, cc] = currentCrds;
    let [r, c] = cellCrds;

    // give marks
    if (done) {
      if (q != value) {
        return 'bg-red-100'
      }
      return 'bg-blue-100'
    }
    
    if (cr < 0 || cc < 0) {
      return 'bg-gray-100';
    }

    // focused cell
    if (r == cr && c == cc) {
      return 'bg-yellow-300'
    } 
    
    // across or down cells
    if (!downward) {
      if (board[cr][cc].wordId[0] == wordId[0]) {
        return 'bg-yellow-100'
      }
    } else {
      if (board[cr][cc].wordId[1] == wordId[1]) {
        return 'bg-yellow-100'
      }
    }

    return 'bg-gray-100'
  }

  function hasError() {
    return board.flat()
      .filter(cell => cell.q != cell.value)
      .length > 0
  }

  const caption = puzzle.captions[downward ? 'down' : 'across']
    .find(caption => {
      let [r, c] = currentCrds;
      if (r + c < 0) return;

      let [a, b] = board[r][c].wordId;
      let wordId = downward ? b : a;

      return wordId == caption.wordId;
    })

  return (
    <form onSubmit={handleSubmit}>
      {/* result messages */}
      {done && (
        <p className="my-4 px-2">
          {hasError() ? (
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

      {/* board */}
      <div className="px-2">
        <table className="w-full">
          <tbody className="border-2 border-gray-300 divide-y-2 divide-gray-300">
            {board.map((row, r) => (
              <tr 
                key={r}
                className="h-1/12 grid grid-cols-12 divide-x-2 divide-gray-300"
              >
                {row.map((col, c) => (
                  <td 
                    key={c} 
                    className="relative pt-[100%]"
                  >
                    {col.value && (
                      <>
                        {!!col.label && (
                          <label
                            htmlFor={col.id}
                            className="absolute top-0 left-px z-10 text-xs"
                          >
                            {col.label}
                          </label>
                        )}
                        <input
                          id={col.id}
                          type="text"
                          className={`absolute inset-0 text-center outline-none font-bold ${bgColor([r, c], col.q, col.value, col.wordId)}`}
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
      </div>

      {/* Caption */}
      <div className="my-4 px-2">
        <div className="p-2 border border-gray-200 text-center">
          <p className="">
            {caption ? caption.content : '의미가 여기에 나타나요'}
          </p>
        </div>
      </div>

      {/* virtual keyboard */}
      <Keyboard
        keyClicked={keyClicked}
      />

      {/* Verbose to be permitted in ads */}
      <Verbose captions={puzzle.captions} />

      {/* TIP */}
      <div className="mt-8 px-2">
        <blockquote className="p-2 border-l-6 border-red-300 bg-red-100">
          <span className="flex gap-2 items-center text-red-400 font-bold">
            <FaCircleInfo /> 팁
          </span>
          <p className="text-red-400">
            모르는 단어가 나와도 쉽게 포기하지 마세요!
            사전을 찾아가면서 퍼즐을 완성해나가다 보면 단어들도 내 것이 된답니다!
          </p>
        </blockquote>
      </div>

      {/* submit button */}
      {!done && (
        <p className="px-2 mt-8">
          <button 
            type="submit"
            className="px-4 py-2 border-2 font-semibold cursor-pointer"
          >
            정답 확인하기
          </button>
        </p>
      )}
    </form>
  )
}