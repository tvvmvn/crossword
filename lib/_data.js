import sql from "./db";

export async function getWord(clue) {

  let length = clue.length;
  const c = clue.trim();

  const filteringChar = (c, i) => sql`and POSITION(${c} IN name) = ${i}`;

  const sub = await sql`SELECT MIN(count) from words 
    WHERE length = ${length} 
    ${c ? filteringChar(c, clue.indexOf(c) + 1) : sql``}`;

  const [{ min }] =  sub;
  // console.log(min);

  const q = await sql`SELECT * FROM words 
    WHERE length = ${length}
    ${c ? filteringChar(c, clue.indexOf(c) + 1) : sql``}
    AND count = ${min}
    ORDER BY random()
    LIMIT 1`;

  if (!q.length) {
    throw 'no word';
  }

  let [word] = q;
  return word;
}

export async function addCount(ids) {

  let tran = (sql) => {
    return ids.map(id => sql`UPDATE words SET count = count + 1 WHERE id = ${id}`);
  }

  await sql.begin(tran);
}