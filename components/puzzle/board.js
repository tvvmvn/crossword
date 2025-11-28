export default function Board({ 
  board, 
  currentCrds, 
  downward, 
  handleClick, 
  done }) {

  function bgColor(cellCrds, q, value, wordId) {

    let [r, c] = cellCrds;

    // result marks
    if (done) {
      if (q != value) {
        return 'bg-red-100'
      }
      return 'bg-blue-100'
    }
    
    // before beginning
    if (currentCrds[0] + currentCrds[1] < 0) {
      return 'bg-gray-100';
    }

    // focused cell
    if (r == currentCrds[0] && c == currentCrds[1]) {
      return 'bg-yellow-300'
    } 
    
    // across or down cells
    if (!downward) {
      if (board[currentCrds[0]][currentCrds[1]].wordId[0] == wordId[0]) {
        return 'bg-yellow-100'
      }
    } else {
      if (board[currentCrds[0]][currentCrds[1]].wordId[1] == wordId[1]) {
        return 'bg-yellow-100'
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
                      className={`absolute inset-0 text-center outline-none font-bold ${bgColor([r, c], col.q, col.value, col.wordId)}`}
                      value={done ? col.value : col.q}
                      onClick={done ? null : (e) => handleClick([r, c])}
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