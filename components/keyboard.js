import { useState } from "react";

function initKeyboard(values) {
  return values
    .filter((val, i, arr) => val && arr.indexOf(val) == i)
    .sort()
    .concat('del')
}

export default function Keyboard({ 
  values,
  typing,
  keyClicked,
  modalClosed
}) {
  
  const [keys, setKeys] = useState(initKeyboard(values));

  function handleClick(e) {
    if (e.target == e.currentTarget) {
      modalClosed()
    }
  }
  
  return (
    <div className={`fixed w-full h-[35vh] left-0 ${typing ? 'bottom-0' : '-bottom-[40vh]'} transition-all z-20`}>
      
      {/* Keyboard and background */}
      <div className="bg-black/[.2] flex justify-center">
        <div className="w-xl grid grid-cols-6 gap-2 px-4 py-8">
          {keys.map(key => (
            <button
              key={key}
              className={`p-2 ${key == 'del' ? 'bg-red-300 text-white' : 'bg-white'} rounded font-semibold`}
              onClick={() => keyClicked(key)}
            >
              {key} 
            </button>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <button 
        className="w-full h-full bg-white" 
        onClick={handleClick}
      >
      </button>
    </div>
  )
}