import { useState } from "react"
import Keyboard from "./keyboard";
import { FaCircleInfo, FaArrowRight, FaKey } from 'react-icons/fa6';

// captions
const FILTER_MAP = {
  가로: (caption) => !caption.down,
  세로: (caption) => caption.down
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

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

    return 'bg-slate-200'
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
      <div className="overflow-auto max-h-[400px] p-2">
        <div 
          className="border-2 border-gray-400 divide-y-2 divide-gray-400"
          style={{ width: `${board[0].length * 30}px` }}
        >
          {board.map((row, r) => (
            <div 
              key={r}
              id="tr"
              className="divide-x-2 divide-gray-400 flex w-full"
            >
              {row.map((col, c) => (
                <div 
                  key={c} 
                  id="td"
                  className="relative w-[30px] h-[30px]"
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
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end px-2">
        <small className="text-gray-400">
          퍼즐을 위아래/좌우로 스크롤 할 수 있어요
        </small>
      </div>

      {/* captions */}
      <div className="px-2">
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

      {/* TIP */}
      <div className="mt-8 px-2">
        <span className="flex gap-2 items-center text-red-400 font-bold">
          <FaCircleInfo /> 팁
        </span>
        <p className="text-red-400">
          모르는 단어가 나와도 쉽게 포기하지 마세요! 
          사전을 찾아가면서 퍼즐을 완성해나가다 보면 단어들도 내 것이 됩답니다!
        </p>
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

      {/* virtual keyboard */}
      <Keyboard
        typing={typing}
        keyClicked={keyClicked}
        hide={() => {
          setCurrentCrds([-1, -1])
          setSpace([-1, -1])
          setTyping(false)
        }}
      />
    </form>
  )
}