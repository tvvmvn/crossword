const keys = [
  ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  ['h', 'i', 'j', 'k', 'l', 'm', 'n'],
  ['o', 'p', 'q', 'r', 's', 't', 'u'],
  ['v', 'w', 'x', 'y', 'z', '', 'del'],
]

export default function Keyboard({
  typing,
  setTyping,
  keyClicked,
  f
}) {

  function handleClick(e) {
    if (e.target == e.currentTarget) {
      f()
      setTyping(false)
    }
  }

  return (
    <div className={`fixed left-0 w-full h-[240px] ${typing ? 'bottom-0' : '-bottom-[240px]'} px-4 transition-all z-90`}>
      <div className="max-w-sm mx-auto shadow">
        <div className="bg-gray-100 flex justify-end">
          <span 
            className="text-2xl px-2"
            onClick={handleClick}
          >
            &times;
          </span>
        </div>
        <div className="bg-white h-[180px] divide-y divide-gray-200">
          {keys.map((row, r) => (
            <div key={r} className="h-1/4 grid grid-cols-7">
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