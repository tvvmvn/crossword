const keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
]

export default function Keyboard({
  typing,
  keyClicked,
  hide
}) {

  return (
    <div className={`fixed left-0 w-full h-[240px] ${typing ? 'bottom-0' : '-bottom-[240px]'} bg-gray-200 transition-all z-90`}>
      <div className="max-w-xl mx-auto p-2 relative">
        <span 
          className="absolute w-4 h-8 bg-red-400 -top-8 right-4"
          onClick={hide}
        >
          </span>
        {/* Keyboard */}
        <div className="h-[180px] grid grid-cols-20 gap-1">
          {keys.map((row, r) => row.map((col, c) => (
            <button 
              key={col}
              type="button"
              className={`col-span-2 ${col == 'a' && 'col-start-2'} ${col == 'z' && 'col-start-4'} bg-white`}
              onClick={() => keyClicked(col)}
            >
              {col}
            </button>
          )))}
          <button 
            type="button"
            className="col-span-3 bg-gray-300"
            onClick={() => keyClicked('del')}
          >
            ⌫
          </button>
        </div>
      </div>
    </div>
  )
}