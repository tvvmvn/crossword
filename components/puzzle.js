'use client'

import { useState } from "react";
import Keyboard from "./keyboard";
import Cell from "./cell";

export default function Puzzle({ 
  id,
  initialCells,
  captions
}) {

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
    <>
      <form onSubmit={handleSubmit}>

        <div className="px-4">
          <h1 className="my-4 text-2xl font-semibold">
            Puzzle at {id} ✏️
          </h1>
        </div>
        
        {/* Result message */}
        {done && (
          <div className="px-4">
            {cells.flat()
              .filter(item => item.value != item.q).length > 0 ? (
                <p className="my-4 text-red-400">
                  Oops! Try later 🥲
                </p>
              ) : (
                <p className="my-4 text-blue-400">
                  You did it! 🎉
                </p>
              )}
          </div>
        )}
        
        {/* Board */}
        <section className="px-4 flex justify-center">
          <table style={{ width: `${cells[0].length * 3}rem` }}>
            <tbody className="bg-black border-2 divide-y-2">
              {cells.map((row, r) => (
                <tr 
                  key={r} 
                  className="grid divide-x-2"
                  style={{ gridTemplateColumns: `repeat(${cells[r].length}, minmax(0, 1fr))` }}
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
        </section>

      <section className="mt-4 px-4">
        <h3 className="my-4 text-xl font-semibold">
          Across
        </h3>
        <ul>
          {captions.filter(caption => caption.across)
            .map(caption => (
              <li key={caption.id}>
                <span className="mr-2 font-semibold">
                  {caption.label}
                </span>
                 {caption.acrossValue}
              </li>
            ))}
        </ul>

        <h3 className="my-4 text-xl font-semibold">
          Down
        </h3>
        <ul>
          {captions.filter(caption => caption.down)
            .map(caption => (
              <li key={caption.id}>
                <span className="mr-2 font-semibold">
                  {caption.label}
                </span>
                {caption.downValue}
              </li>
            ))}
        </ul>
      </section>

      {!done && (
        <div className="mt-8 px-4">
          <button className="px-2 py-1 bg-black text-white font-semibold rounded">
            I'm Done
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
    </>
  )
}