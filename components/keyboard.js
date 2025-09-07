import { ChevronLeft } from "@deemlol/next-icons";

export default function Keyboard({ 
  keys,
  typing,
  keyClicked,
  modalClosed,
}) {

  function handleClick(e) {
    if (e.target == e.currentTarget) {
      modalClosed()
    }
  }
  
  return (
    <div 
      className={`fixed w-full h-[35vh] left-0 ${typing ? 'bottom-0' : '-bottom-[40vh]'} bg-gray-200 transition-all z-20`}
      onClick={handleClick}
    >
      {/* Keyboard and background */}
      <div className="h-[28vh] flex justify-center bg-white">
        <table className="w-xl table-fixed">
          <tbody className="divide-y divide-gray-200">
            {keys.map((row, r) => (
              <tr key={r} className="h-1/4">
                {row.map((col, c) => (
                  <td 
                    key={c} 
                    className="relative"
                    onClick={col ? () => keyClicked(col) : null}
                  >
                    <span className="absolute inset-0 flex justify-center items-center font-semibold">
                      {col == 'del' ? (
                        <ChevronLeft />
                      ) : col}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}