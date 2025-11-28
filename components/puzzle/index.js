import { useEffect, useRef, useState } from "react"
import Keyboard from "./keyboard";
import Answer from "./answer";
import Board from "./board";
import { FaCircleInfo, FaArrowRight, FaKey } from 'react-icons/fa6';

export default function Puzzle({ puzzle }) {
  
  const [board, setBoard] = useState(puzzle.board);
  const [currentCrds, setCurrentCrds] = useState([-1, -1])
  const [downward, setDownward] = useState(false)
  const [done, setDone] = useState(false);
  const messageRef = useRef(null);

  useEffect(() => {
    if (done) {
      window.scrollTo({
        top: messageRef.current.offsetTop,
        behavior: "smooth"
      });
    }
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
        <div className="px-2 py-4" ref={messageRef}>
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
        <Board 
          board={board} 
          currentCrds={currentCrds}
          downward={downward}
          handleClick={handleClick} 
          done={done} 
        />
      </div>

      {done ? (
        <Answer captions={puzzle.captions} />
      ) : (
        <>
          {/* Captions */}
          <div className="mt-4 px-2">
            <p className="text-center border-b border-gray-300 pb-1">
              {caption ? caption.content : '의미가 여기에 나타나요'}
            </p>
          </div>
          
          {/* Keyboard */}
          <div className="mt-4">
            <Keyboard
              keyClicked={keyClicked}
            />
          </div>

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