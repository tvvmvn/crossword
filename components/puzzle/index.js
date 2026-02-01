import { useEffect, useRef, useState } from "react"
import Keyboard from "./keyboard";
import Answer from "./answer";
import Board from "./board";
import { ACROSS, DOWN } from "@/lib/client/contants";
import o from "@/lib/client/contants";
console.log(o) // { foo: 'bar' }

export default function Puzzle({ puzzle }) {
  
  const [board, setBoard] = useState(puzzle.board);
  const [currentCrds, setCurrentCrds] = useState([-1, -1])
  const [orientation, setOrientation] = useState(ACROSS)
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
    const [r1, c1] = currentCrds;
    const [r2, c2] = newCrds;

    const [acrossId, downId] = board[r2][c2].wordId;

    if (acrossId > 0 && downId > 0) {
      // same clicked
      if (r2 == r1 && c2 == c1) {
        setOrientation(orientation == ACROSS ? DOWN : ACROSS)
      } else {
        setOrientation(ACROSS)
      }
    } else if (acrossId > 0) {
      setOrientation(ACROSS)
    } else if (downId > 0) {
      setOrientation(DOWN)
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
    const west = orientation == ACROSS && key == 'del' && left;
    const east = orientation == ACROSS && key != 'del' && right;
    const north = orientation == DOWN && key == 'del' && top;
    const south = orientation == DOWN && key != 'del' && bottom;
    
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

  function getCaption() {
    let [r, c] = currentCrds;

    if (r + c < 0) {
      return '의미가 여기에 나타나요';
    }
    
    let [acrossId, downId] = board[r][c].wordId;
    let activeWordId = orientation == ACROSS ? acrossId : downId;

    const caption = puzzle.captions
      .find(caption => {
        let a = caption.ot == orientation;
        let b = activeWordId == caption.wordId
        
        if (a && b) {
          return caption;
        }
      });

    return caption.content;
  }

  function hasError() {
    return board.flat()
      .filter(cell => cell.q != cell.value)
      .length > 0
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* result messages */}
      {done && (
        <div className="px-2 py-4" ref={messageRef}>
          {hasError() ? (
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
          orientation={orientation}
          handleClick={handleClick} 
          done={done} 
        />
      </div>

      {done ? (
        <Answer captions={puzzle.captions} />
      ) : (
        <>
          {/* Captions */}
          <p className="my-4 text-center">
            {getCaption()}
          </p>
          
          {/* Keyboard */}
          <div className="mt-4">
            <Keyboard
              keyClicked={keyClicked}
            />
          </div>

          {/* TIP */}
          <blockquote className="mt-8 px-4 py-2 bg-yellow-100">
            <p className="my-4 text-sm text-yellow-700">
              모르는 단어가 나와도 쉽게 포기하지 마세요!
              사전을 찾아가면서 퍼즐을 완성해나가다 보면 단어들도 내 것이 된답니다!
            </p>
          </blockquote>

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