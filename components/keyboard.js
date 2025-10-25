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
    <div 
      className={`fixed left-0 w-full h-[250px] ${typing ? 'bottom-0' : '-bottom-[240px]'} bg-white transition-all z-90`}
      style={{ boxShadow: '0 0 4px 1px #ddd' }}
    >
      <div className="max-w-xl mx-auto">
        {/* Keyboard */}
        <div className="h-[200px]">
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
        {/* Bar with button */}
        <div className="h-[50px] flex justify-end">
          <button 
            type="button"
            className="w-24 flex justify-center items-center"
            onClick={handleClick}
          >
            <span className="w-2 h-2 bg-red-400 rounded-full">            
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}