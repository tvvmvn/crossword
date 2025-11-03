import { useState } from "react";

export default function Form() {

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault();

    setError(null)
    setPending(true)

    try {
      const res = await fetch('/api/sub', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email }),
      })
      console.log(await res.json());

      if (res.created) {
        setSubscribed(true)
      } else if (res.ok) {
        setSubscribing(true)
      } else {
        throw res;
      }
  
    } catch (ex) {
      console.error(ex)
      setError(ex);
    }

    setPending(false)
  }

  if (subscribing) {
    return (
      <p className="my-4">
        이미 구독중이시군요!
      </p>
    )
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
          id="email"
          type="email"
          className="grow p-2 border border-gray-200 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="johndoe@example.com"
          required
        />
        <button
          type="submit"
          className="px-2 py-1 bg-gray-200"
        >
          구독하기
        </button>
      </div>
      <small className="text-gray-400">
        이메일 제공에 동의하는 것으로 간주됩니다.
      </small>

      {/* error message */}
      {error && (
        <p className="text-red-400">
          문제가 발생했습니다. 잠시 후 다시 시도해주세요
        </p>
      )}
    </form>
  )
}