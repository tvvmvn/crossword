import { useState } from "react";

export default function Share() {

  const [message, setMessage] = useState('');

  function f() {
    if (message) return;

    navigator.clipboard.writeText(location.href)
      .then(() => {
        setMessage('Copied! 😘')
      })
      .catch(err => {
        setMessage('Try later')
      });

    setTimeout(() => {
      setMessage('')
    }, 1000)
  }

  return (
    <div className="mt-4 flex justify-end">
      <div 
        id="drop-container"
        className="relative"
      >
        <button
          id="drop-btn"
          className="px-2 py-1 font-semibold cursor-pointer"
          onClick={f}
        >
          Share with friends
        </button>
        {message && (
          <p 
            id="drop-content"
            className="absolute right-0 px-2 py-1 z-20 bg-black/[0.8] text-white"
          >
            {message}
          </p>
        )}
      </div>
    </div>
  )
}