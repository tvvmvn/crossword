import { useState } from "react";
import { FaLink, FaShareNodes } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";

export default function Share() {

  const [message, setMessage] = useState('');

  function copy() {
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
    <div
      id="drop-container"
      className="relative"
    >
      <button
        id="drop-btn"
        className="cursor-pointer text-blue-400"
        onClick={copy}
      >
        <FiShare2 size={20} />
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
  )
}