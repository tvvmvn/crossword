import { useState } from "react";
import { ChevronLeft } from "@deemlol/next-icons";

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
  modalClosed,
}) {
  
  const [keys, setKeys] = useState(initKeyboard(values));
  
  return (
    <div className={`fixed w-full h-[35vh] left-0 ${typing ? 'bottom-0' : '-bottom-[40vh]'} transition-all z-20`}>
      
      {/* Keyboard and background */}
      <div className="flex justify-center bg-gray-100">
        <div className="w-xl grid grid-cols-6 gap-2 px-4 py-8">
          {keys.map(key => (
            <button
              key={key}
              className={`p-2 flex justify-center items-center ${key == 'del' ? 'bg-red-300' : 'bg-white'} rounded font-semibold`}
              onClick={() => keyClicked(key)}
            >
              {key == 'del' ? <ChevronLeft size={20} color="#fff" /> : key} 
            </button>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full h-full flex justify-center backdrop-blur-md"> 
        <div 
          className="w-xl flex justify-end px-12"
          onClick={modalClosed}
        >
          {/* <span className="mt-4 w-16 h-1 bg-black"></span> */}
        </div>
      </div>
    </div>
  )
}