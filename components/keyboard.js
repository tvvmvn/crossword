const keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
]

export default function Keyboard({
  keyClicked,
}) {

  return (
    <div className="h-[200px] bg-gray-100 px-2 py-4">
      <div className="h-full grid grid-cols-20 gap-1">
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
  )
}