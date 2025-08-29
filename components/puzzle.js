'use client'

import { useState } from "react";
import Keyboard from "./keyboard";
import Cell from "./cell";

export default function Puzzle({ initialCells }) {

  const [cells, setCells] = useState(initialCells)
  const [currentCrds, setCurrentCrds] = useState([-1, -1]);
  const [vertical, setVertical] = useState(true)
  const [typing, setTyping] = useState(false)
  const [done, setDone] = useState(false)

  console.log(cells)

  function handleSubmit(e) {
    e.preventDefault();
    setCurrentCrds([-1, -1])
    setDone(true)
  }

  function inputClicked(r, c) {
    // set direction to move
    let bottom = r < cells.length - 1 && cells[r + 1][c].value;
    let right = c < cells[r].length - 1 && cells[r][c + 1].value;

    if (right && bottom) {
      if (r == currentCrds[0] && c == currentCrds[1]) {
        setVertical(!vertical)
      } else {
        setVertical(false)
      }
    } else if (bottom) {
      setVertical(true)
    } else {
      setVertical(false)
    }

    // set starting point
    setCurrentCrds([r, c]);
    // keyboard boom 
    setTyping(true);
  }

  function keyClicked(key) {
    // update value
    const updatedCells = cells.map((row, r) => row.map((col, c) => {
      if (r == currentCrds[0] && c == currentCrds[1]) {
        return { 
          ...col, 
          q: (key == 'del') ? '' : key 
        };
      }
      return col;
    }))
    setCells(updatedCells)
    
    // move focus
    let [r, c] = currentCrds;
    let top = r > 0 && cells[r - 1][c].value
    let bottom = r < cells.length - 1 && cells[r + 1][c].value;
    let left =  c > 0 && cells[r][c - 1].value;
    let right = c < cells[r].length - 1 && cells[r][c + 1].value;

    if (vertical) {
      if (key == 'del') {
        if (top) setCurrentCrds([r - 1, c])
      } else {
        if (bottom) setCurrentCrds([r + 1, c])
      }
    } else {
      if (key == 'del') {
        if (left) setCurrentCrds([r, c - 1])
      } else {
        if (right) setCurrentCrds([r, c + 1])
      }
    }
  }

  function modalClosed() {
    setCurrentCrds([-1, -1])
    setVertical(true)
    setTyping(false)
  }

  return (
    <div className="mt-8 px-4">
      <form onSubmit={handleSubmit}>
        
        {/* Result message */}
        {done && (
          <div className="my-4">
            {cells.flat()
              .filter(item => item.value != item.q).length > 0 ? (
                <p className="text-red-400">
                  Oops! Try later 🥲
                </p>
              ) : (
                <p className="text-blue-400">
                  You did it! 🎉
                </p>
              )}
          </div>
        )}
        
        {/* Board */}
        <table className="w-full">
          <tbody className="bg-gray-100 border-2 border-gray-200 divide-y-2 divide-gray-200">
            {cells.map((row, r) => (
              <tr 
                key={r} 
                className="grid divide-x-2 divide-gray-200"
                style={{ gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))` }}
              >
                {row.map((col, c) => (
                  <Cell
                    key={c}
                    id={col.id}
                    available={col.value}
                    label={col.label}
                    value={done ? col.value : col.q}
                    acrossActive={!vertical && (r == currentCrds[0] && c == currentCrds[1])}
                    downActive={vertical && (r == currentCrds[0] && c == currentCrds[1])}
                    error={done && (col.value != col.q)}
                    disabled={done}
                    handleClick={() => inputClicked(r, c)}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>

      {!done && (
        <div className="mt-8">
          <button className="px-2 py-1 bg-black text-white font-semibold rounded">
            Done
          </button>
        </div>
      )}
      </form>

      {/* Keyboard */}
      <Keyboard 
        values={cells.flat().map(cell => cell.value)}
        typing={typing}
        keyClicked={keyClicked}
        modalClosed={modalClosed} 
      />
    </div>
  )
}