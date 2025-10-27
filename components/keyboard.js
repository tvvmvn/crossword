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
    f()
    setTyping(false)
  }

  return (
    <div className={`fixed left-0 w-full h-[240px] ${typing ? 'bottom-0' : '-bottom-[240px]'} border-t border-gray-200 bg-white transition-all z-90`}>
      <div className="max-w-xl mx-auto relative">
        <span 
          className="absolute w-6 h-8 bg-red-400 -top-8 right-12"
          onClick={handleClick}
        >
          </span>
        {/* Keyboard */}
        <div className="h-[200px] p-2">
          {keys.map((row, r) => (
            <div key={r} className="h-1/4 grid grid-cols-7">
              {row.map((col, c) => (
                <button
                  type="button"
                  key={c}
                  className="text-center font-bold"
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