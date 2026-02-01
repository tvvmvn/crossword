import { ACROSS, DOWN } from "@/lib/client/contants";

export default function Board({ 
  board, 
  currentCrds, 
  orientation, 
  handleClick, 
  done 
}) {

  function bgColor(cellCrds, correct, wordId) {
    let [r1, c1] = currentCrds; 
    let [r2, c2] = cellCrds;

    // result marks
    if (done) {
      if (correct) {
        return 'bg-blue-100'
      } else {
        return 'bg-red-100'
      }
    }
    
    if (r1 + c1 >= 0) {
      // focused cell
      if (r2 == r1 && c2 == c1) {
        return 'bg-yellow-300'
      } 

      // around cell
      let i = orientation == ACROSS ? 0 : 1;
      let aroundId = board[r1][c1].wordId[i];

      if (aroundId == wordId[i]) {
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
                      className={`absolute inset-0 text-center outline-none font-bold ${bgColor([r, c], col.q == col.value, col.wordId)}`}
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