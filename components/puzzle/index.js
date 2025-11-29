import { useEffect, useRef, useState } from "react"
import Keyboard from "./keyboard";
import Answer from "./answer";
import Board from "./board";

export default function Puzzle({ puzzle }) {
  
  const [board, setBoard] = useState(puzzle.board);
  const [activeCell, setActiveCell] = useState('')
  const [orientation, setOrientation] = useState('across')
  const [done, setDone] = useState(false);
  const messageRef = useRef(null);

  const cell = board.flat().find(cell => cell.id == activeCell)

  // console.log('activeCell', activeCell)

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

  function handleClick(id) {
    const cell = board.flat().find(cell => cell.id == id)
    const [acrossId, downId] = cell.wordId;

    if (acrossId > 0 && downId > 0) {
      // same clicked
      if (activeCell == id) {
        setOrientation(orientation == 'across' ? 'down' : 'across')
      } else {
        setOrientation('across')
      }
    } else if (acrossId > 0) {
      setOrientation('across')
    } else if (downId > 0) {
      setOrientation('down')
    }
    
    setActiveCell(id)
  }

  function keyClicked(key) {
    // update q
    const updatedBoard = board.map(row => row.map(col => {
      if (activeCell == col.id) {
        return { ...col, q: key == 'del' ? '': key }
      }
      return col;
    }))

    setBoard(updatedBoard)

    let [r, c] = cell.crds;

    // check if movable
    let top = r > 0 && board[r - 1][c].value
    let bottom = r < board.length - 1 && board[r + 1][c].value
    let left = c > 0 && board[r][c - 1].value
    let right = c < board[r].length - 1 && board[r][c + 1].value

    // direction to move
    const west = orientation == 'across' && key == 'del' && left;
    const east = orientation == 'across' && key != 'del' && right;
    const north = orientation == 'down' && key == 'del' && top;
    const south = orientation == 'down' && key != 'del' && bottom;
    
    if (west) {
      setActiveCell(board[r][c - 1].id)
    } else if (east) {
      setActiveCell(board[r][c + 1].id)
    } else if (north) {
      setActiveCell(board[r - 1][c].id)
    } else if (south) {
      setActiveCell(board[r + 1][c].id)
    }
  }

  const caption = puzzle.captions[orientation]
    .find(caption => {
      if (activeCell) {
        let [acrossId, downId] = cell.wordId;
        let wordId = orientation == 'across' ? acrossId : downId;
  
        return wordId == caption.wordId;
      }
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
          cell={cell}
          activeCell={activeCell}
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