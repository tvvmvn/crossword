export default function Foo() {

  let board = []
  for (let r = 0; r < 20; r++) {
    board[r] = []
    for (let c = 0; c < 20; c++) {
      board[r][c] = '' +  r + c;
    }
  }

  return (
    <>
      <h1 className="my-4 px-2 font-semibold">
        Crossword
      </h1>

      <div className="overflow-auto h-[400px] shadow">
        <div 
          className="divide-y"
          style={{ width: `${board[0].length * 40}px` }}
        >
          {board.map((row, r) => (
            <div 
              key={r} 
              id="tr" 
              className="divide-x flex"
            >
              {row.map((col, c) => (
                <div 
                  id="td" 
                  key={c} 
                  className="w-[40px] h-[40px] text-xs"
                >
                  {col}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}