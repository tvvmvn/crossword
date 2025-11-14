import { useState } from "react"
import Keyboard from "./keyboard";
import { FaCircleInfo, FaArrowRight, FaKey } from 'react-icons/fa6';

export default function Puzzle({ initialBoard, captions }) {
  
  const [board, setBoard] = useState(initialBoard);
  const [currentCrds, setCurrentCrds] = useState([-1, -1])
  const [space, setSpace] = useState([-1, -1]);
  const [downward, setDownward] = useState(false)
  const [typing, setTyping] = useState(false)
  const [done, setDone] = useState(false);
  const errors = board.flat()
    .filter(cell => cell.q != cell.value)

  // console.log(space)

  function handleSubmit(e) {
    e.preventDefault();

    setDone(true)
  }

  function handleClick(newCrds) {
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
    setSpace(board[r][c].space)
    setTyping(true)
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
    
    // move
    const { top, bottom, left, right } = board[r][c].around;
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
        <p className="my-4 px-2">
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

      {/* board */}
      <table className="w-full">
        <tbody className="border border-gray-400 divide-y divide-gray-400 bg-gray-100">
          {board.map((row, r) => (
            <tr 
              key={r}
              id="tr"
              className="h-1/12 grid grid-cols-12 divide-x divide-gray-400"
            >
              {row.map((col, c) => (
                <td 
                  key={c} 
                  id="td"
                  className="relative pt-[100%]"
                >
                  {!!col.active && (
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

      {/* Caption */}
      <div className="my-4 px-2">
        <div className="bg-gray-100 p-2">
          <p className="">
            {captions.map(caption => {
              if (downward) {
                if (caption.label == space[1] && caption.down) {
                  return caption.content
                }
              } else { 
                if (caption.label == space[0] && !caption.down) {
                  return caption.content
                }
              }
            })}
          </p>
        </div>
      </div>

      {/* virtual keyboard */}
      <Keyboard
        keyClicked={keyClicked}
      />

      {/* TIP */}
      <div className="mt-8 px-2">
        <blockquote className="p-2 border-l-6 border-red-300 bg-red-100 font-semibold">
          <span className="flex gap-2 items-center text-red-400 font-bold">
            <FaCircleInfo /> 팁
          </span>
          <p className="text-red-400">
            모르는 단어가 나와도 쉽게 포기하지 마세요!
            사전을 찾아가면서 퍼즐을 완성해나가다 보면 단어들도 내 것이 됩답니다!
          </p>
        </blockquote>
      </div>

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
    </form>
  )
}