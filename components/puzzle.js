import { useEffect, useState } from "react"
import Keyboard from "./keyboard";
import { FaCircleInfo, FaArrowRight, FaKey } from 'react-icons/fa6';
import Answer from "./answer";

export default function Puzzle({ puzzle }) {
  
  const [board, setBoard] = useState(puzzle.board);
  const [currentCrds, setCurrentCrds] = useState([-1, -1])
  const [downward, setDownward] = useState(false)
  const [done, setDone] = useState(false);

  useEffect(() => {
    location.href = '#message';
  }, [done])

  function handleSubmit(e) {
    e.preventDefault();

    setDone(true)
  }

  function handleClick(newCrds) {
    const [r, c] = newCrds;
    const [acrossId, downId] = board[r][c].wordId;

    if (acrossId > 0 && downId > 0) {
      // same clicked
      if (r == currentCrds[0] && c == currentCrds[1]) {
        setDownward(!downward)
      } else {
        setDownward(false)
      }
    } else if (acrossId > 0) {
      setDownward(false)
    } else if (downId > 0) {
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

    let [r, c] = cellCrds;

    // result marks
    if (done) {
      if (q != value) {
        return 'bg-red-100'
      }
      return 'bg-blue-100'
    }
    
    // before beginning
    if (currentCrds[0] + currentCrds[1] < 0) {
      return 'bg-gray-100';
    }

    // focused cell
    if (r == currentCrds[0] && c == currentCrds[1]) {
      return 'bg-yellow-300'
    } 
    
    // across or down cells
    if (!downward) {
      if (board[currentCrds[0]][currentCrds[1]].wordId[0] == wordId[0]) {
        return 'bg-yellow-100'
      }
    } else {
      if (board[currentCrds[0]][currentCrds[1]].wordId[1] == wordId[1]) {
        return 'bg-yellow-100'
      }
    }

    return 'bg-gray-100';
  }

  const caption = puzzle.captions[downward ? 'down' : 'across']
    .find(caption => {
      let [r, c] = currentCrds;
      if (r + c < 0) return;

      let [acrossId, downId] = board[r][c].wordId;
      let wordId = downward ? downId : acrossId;

      return wordId == caption.wordId;
    })

  const hasError = board.flat()
    .filter(cell => cell.q != cell.value)
    .length > 0

  return (
    <form onSubmit={handleSubmit}>
      {/* result messages */}
      {done && (
        <div id="message" className="px-2 py-4">
          {hasError ? (
            <p className="text-lg font-semibold text-red-400">
              내일 다시 만나요 🥲
            </p>
          ) : (
            <p className="text-lg font-semibold text-blue-400">
              축하합니다! 🎉
            </p>
          )}
        </div>
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

      {done ? (
        <Answer captions={puzzle.captions} />
      ) : (
        <>
          {/* Captions */}
          <div className="my-4 px-2">
            <div className="p-2 bg-stone-100 text-center">
              <p className="">
                {caption ? caption.content : '의미가 여기에 나타나요'}
              </p>
            </div>
          </div>
          
          {/* Keyboard */}
          <Keyboard
            keyClicked={keyClicked}
          />

          {/* TIP */}
          <div className="mt-12 px-2">
            <blockquote className="px-4 py-2 border-l-6 border-red-300 bg-red-100">
              <p className="my-2 text-sm text-red-400">
                모르는 단어가 나와도 쉽게 포기하지 마세요!
                사전을 찾아가면서 퍼즐을 완성해나가다 보면 단어들도 내 것이 된답니다!
              </p>
            </blockquote>
          </div>

          {/* Submit button */}
          <div className="px-2 mt-4">
            <button
              type="submit"
              className="px-4 py-2 border-2 font-semibold rounded-lg cursor-pointer"
            >
              정답 확인하기
            </button>
          </div>
        </>
      )}
    </form>
  )
}