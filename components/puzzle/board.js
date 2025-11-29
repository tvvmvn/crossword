export default function Board({ 
  board, 
  cell,
  activeCell,
  orientation, 
  handleClick, 
  done }) {

  function bgColor(id, correct, wordId) {

    // result marks
    if (done) {
      if (correct) {
        return 'bg-blue-100'
      } else {
        return 'bg-red-100'
      }
    }
    
    if (activeCell) {
      // focused cell
      if (id == activeCell) {
        return 'bg-yellow-300'
      } 

      // across
      if (orientation == 'across') {
        if (cell.wordId[0] == wordId[0]) {
          return 'bg-yellow-100'
        }
      // down
      } else {
        if (cell.wordId[1] == wordId[1]) {
          return 'bg-yellow-100'
        }
      }
    }

    return 'bg-gray-100';
  }
  
  return (
    <table className="w-full">
      <tbody className="border-2 border-gray-300 divide-y-2 divide-gray-300">
        {board.map((row, r) => (
          <tr
            key={r}
            className="h-1/12 grid grid-cols-12 divide-x-2 divide-gray-300"
          >
            {row.map((col, c) => (
              <td
                key={c}
                className="relative pt-[100%]"
              >
                {col.value && (
                  <>
                    {!!col.label && (
                      <label
                        htmlFor={col.id}
                        className="absolute top-0 left-px z-10 text-xs"
                      >
                        {col.label}
                      </label>
                    )}
                    <input
                      id={col.id}
                      type="text"
                      className={`absolute inset-0 text-center outline-none font-bold ${bgColor(col.id, col.q == col.value, col.wordId)}`}
                      value={done ? col.value : col.q}
                      onClick={done ? null : (e) => handleClick(col.id)}
                      readOnly
                    />
                  </>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}