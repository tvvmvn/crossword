import { useState } from "react";

export default function Form() {

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null)
    setPending(true)

    try {
      if (!email.includes('@')) {
        throw 1;
      }

      const res = await fetch('/api/hello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        throw res;
      }
  
      console.log(await res.json())
      setSubscribed(true)
    } catch (ex) {
      setError(ex);
      console.error(ex)
    }

    setPending(false)
  }

  if (subscribed) {
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
      <div className="flex gap-2">
        <input
          type="text"
          className="grow p-2 border border-gray-200 outline-none"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="johndoe@example.com"
        />
        <button
          type="submit"
          className="px-2 py-1 bg-gray-200"
        >
          구독하기
        </button>
      </div>
      {error && (
        <p className="text-red-400">
          문제가 발생했습니다. 잠시 후 다시 시도해주세요
        </p>
      )}
    </form>
  )
}