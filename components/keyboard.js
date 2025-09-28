
function generateKeyboard(values) {
  let keyboard = []
  for (let r = 0; r < 4; r++) {
    keyboard[r] = []
    for (let c = 0; c < 7; c++) {
      let x = (r * 7) + c;

      if (x < values.length) {
        keyboard[r][c] = values[x]
      } else {
        keyboard[r][c] = ''
      }
    }
  }
  return keyboard;
}

export default function Keyboard({
  values,
  typing,
  setTyping,
  keyClicked
}) {

  console.log(values)
  console.log(generateKeyboard(values))

  function handleClick(e) {
    if (e.target == e.currentTarget) {
      setTyping(false)
    }
  }

  return (
    <div
      className={`fixed left-0 w-full h-[30vh] ${typing ? 'bottom-0' : '-bottom-[30vh]'} bg-black transition-all`}
      style={{ boxShadow: '0 0 5px 2px #ddd' }}
      onClick={handleClick}
    >
      <div className="bg-white">
        <div className="max-w-sm mx-auto divide-y divide-gray-200">
          {generateKeyboard(values).map((row, r) => (
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