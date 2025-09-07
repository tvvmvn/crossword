export default function Row({
  row, r,
  length,
  currentCrds,
  downward,
  inputClicked,
  done,
}) {

  const bgColor = (r, c, value, q) => {
    
    const error = done && (value != q)
    const acrossActive = !downward && (r == currentCrds[0] && c == currentCrds[1])
    const downActive = downward && (r == currentCrds[0] && c == currentCrds[1])
    
    if (error) {
      return "bg-red-200"
    } else if (acrossActive) {
      return "bg-blue-200"
    } else if (downActive) {
      return "bg-yellow-200"
    }
    return "bg-white"
  }

  const cols = row.map(({ id, label, value, q, active }, c) => (
    <td key={c} className="relative pt-[100%] bg-gray-400">
      {active && (
        <>
          {label && (
            <label
              htmlFor={id}
              className="absolute top-0 left-0 px-1 font-semibold text-black z-10"
            >
              {label}
            </label>
          )}
          <input
            id={id}
            type="text"
            className={`absolute inset-0 ${bgColor(r, c, value, q)} text-center outline-none`}
            readOnly={true}
            disabled={done}
            value={done ? value : q}
            onClick={() => inputClicked([r, c])}
          />
        </>
      )}
    </td>
  ))

  return (
    <tr
      className="grid divide-x-4"
      style={{ gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))` }}
    >
      {cols}
    </tr>
  )
}