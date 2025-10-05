const keys = [
  ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  ['h', 'i', 'j', 'k', 'l', 'm', 'n'],
  ['o', 'p', 'q', 'r', 's', 't', 'u'],
  ['v', 'w', 'x', 'y', 'z', '', 'del'],
]

export default function Keyboard({
  typing,
  setTyping,
  keyClicked
}) {

  function handleClick(e) {
    if (e.target == e.currentTarget) {
      setTyping(false)
    }
  }

  return (
    <div
      className={`fixed left-0 w-full h-[30vh] ${typing ? 'bottom-0' : '-bottom-[30vh]'} bg-gray-100 transition-all z-90`}
      style={{ boxShadow: '0 0 5px 2px #ddd' }}
      onClick={handleClick}
    >
      <div className="bg-white">
        <div className="max-w-sm mx-auto divide-y divide-gray-200">
          {keys.map((row, r) => (
            <div key={r} className="grid grid-cols-7 h-[6vh]">
              {row.map((col, c) => (
                <button
                  type="button"
                  key={c}
                  className="text-center"
                  onClick={col ? () => keyClicked(col) : null}
                >
                  {col == 'del' ? '⌫' : col}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}