import { useState } from "react";
import { isValidEmail } from "@/lib/client/validate";

export default function Form() {

  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault();

    setError(null)
    setPending(true)
    
    try {
      if (!isValidEmail(email)) {
        throw new Error('올바른 이메일을 입력하세요');
      }

      const res = await fetch('/api/sub', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email }),
      })
      
      if (!res.ok) {
        if (res.status == 409) {
          throw new Error('이미 구독중이시군요!')
        }
        throw new Error('문제가 발생했습니다. 나중에 다시 시도해주세요')
      }

      console.log(await res.json());
      setDone(true)
  
    } catch (ex) {
      console.error(ex)
      setError(ex);
    }

    setPending(false)
  }

  if (done) {
    return (
      <p className="my-4">
        구독해주셔서 감사합니다! 🤩
      </p>
    )
  }

  if (pending) {
    return <p>처리중입니다..</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-4">
        <input
          id="email"
          type="text"
          className="grow px-4 py-2 border-b outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력하세요.."
        />
        <button
          type="submit"
          className="px-2 py-1 border-2 font-semibold cursor-pointer"
        >
          구독하기
        </button>
      </div>
      <small className="text-gray-400">
        이메일 제공에 동의하는 것으로 간주됩니다.
      </small>

      {/* error message */}
      {error && (
        <p className="my-2 text-red-400">
          {error.message}
        </p>
      )}
    </form>
  )
}