'use client'

import { useEffect, useState } from "react";
import { updateDownward, updateCurrentCrds, generateKeys } from "@/lib/utils";
import CaptionGroup from "./captionGroup";
import Keyboard from "./keyboard";
import Row from "./row";

const FILTER_MAP = {
  ACROSS: caption => caption.across,
  DOWN: caption => caption.down
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function Puzzle({ 
  id,
  initialCells,
  captions
}) {

  const [cells, setCells] = useState(initialCells)
  const [currentCrds, setCurrentCrds] = useState([-1, -1]);
  const [downward, setDownward] = useState(true)
  const [typing, setTyping] = useState(false)
  const [done, setDone] = useState(false)

  // console.log(cells)

  function handleSubmit(e) {
    e.preventDefault();
    setCurrentCrds([-1, -1])
    setDone(true)
  }

  function inputClicked(newCrds) {
    // update current crds
    setCurrentCrds(newCrds);
    
    // set direction
    const updatedDownward = updateDownward(cells, newCrds, currentCrds, downward)
    setDownward(updatedDownward);
    
    // keyboard boom
    setTyping(true);
  }

  function keyClicked(clickedKey) {

    const delClicked = clickedKey == 'del';

    // update value
    const updatedCells = cells.map((row, r) => row.map((col, c) => {
      if (r == currentCrds[0] && c == currentCrds[1]) {
        return { 
          ...col, 
          q: delClicked ? '' : clickedKey 
        };
      }
      return col;
    }))

    setCells(updatedCells)

    // update current crds
    const newCrds = updateCurrentCrds(cells, currentCrds, downward, delClicked)
    setCurrentCrds(newCrds); 
  }

  function modalClosed() {
    setCurrentCrds([-1, -1])
    setDownward(true)
    setTyping(false)
  }

  const captionGroups = FILTER_NAMES.map(name => (
    <CaptionGroup 
      key={name}
      name={name}
      captions={captions.filter(FILTER_MAP[name])}
    />
  ))

  const rows = cells.map((row, r) => (
    <Row
      key={r}
      row={row} r={r}
      length={cells[r].length}
      currentCrds={currentCrds}
      downward={downward}
      inputClicked={inputClicked}
      done={done}
    />
  ))

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="px-4">
          <h1 className="my-4 text-2xl font-semibold">
            {id} ✏️
          </h1>
        </div>

        {/* Result message */}
        {done && (
          <div className="px-4">
            {cells.flat()
              .filter(item => item.active)
              .filter(item => item.value != item.q).length ? (
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
        <table className="w-full">
          <tbody className="border-t-4 border-b-4 divide-y-4">
            {rows}
          </tbody>
        </table>

        {/* Captions */}
        <section className="mt-8 px-4">
          {captionGroups}
        </section>

        {/* Done button */}
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
        keys={generateKeys(cells)}
        typing={typing}
        keyClicked={keyClicked}
        modalClosed={modalClosed}
      />
    </>
  )
}