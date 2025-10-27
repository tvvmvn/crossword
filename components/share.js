import { useState } from "react";
import { FaLink, FaShareNodes } from "react-icons/fa6";

export default function Share() {

  const [message, setMessage] = useState('');

  function f() {
    if (message) return;

    navigator.clipboard.writeText(location.href)
      .then(() => {
        setMessage('링크가 복사되었어요! 😘')
      })
      .catch(err => {
        setMessage('Try later')
      });

    setTimeout(() => {
      setMessage('')
    }, 1500)
  }

  return (
    <div className="mt-4 flex justify-end">
      <div 
        id="drop-container"
        className="relative"
      >
        <button
          id="drop-btn"
          className="px-2 py-1 text-blue-400 font-semibold flex items-center gap-1 cursor-pointer"
          onClick={f}
        >
          <FaLink /> 공유하기
        </button>
        {message && (
          <p 
            id="drop-content"
            className="absolute right-0 w-40 px-2 py-1 z-20 bg-white shadow rounded-md"
          >
            {message}
          </p>
        )}
      </div>
    </div>
  )
}