import { useState } from "react";

export default function Form() {

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null)

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
  }

  const form = (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <input
          type="text"
          className="grow p-2 bg-white outline-none"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="johndoe@example.com"
        />
        <button
          type="submit"
          className="px-2 py-1 bg-gray-200"
        >
          Submit
        </button>
      </div>
      {error && (
        <p className="text-red-400">
          Something's wrong
        </p>
      )}
    </form>
  )

  const message = (
    <p className="my-4 text-white">
      Thank you for subscribing me!
    </p>
  )

  return (
    <>
      <h3 className="my-4 text-lg font-semibold text-white">
        Subscribe me
      </h3>

      {subscribed ? message : form}

      <p className="my-4 text-gray-400">
        Privacy is based on verbal contact. <br />
        You can unsubscribe at anytime.
      </p>
    </>
  )
}