import sql from "./db";

export async function getWord(clue) {

  let length = clue.length;
  const c = clue.trim();

  const filteringChar = (c, i) => sql`and POSITION(${c} IN name) = ${i}`;

  const q = await sql`SELECT * FROM words 
    WHERE length = ${length}
    ${c ? filteringChar(c, clue.indexOf(c) + 1) : sql``}
    ORDER BY random()
    LIMIT 1`;

  if (!q.length) {
    throw 'no word';
  }

  let [word] = q;
  return word;
}

export async function addCount(ids) {

  let trans = (sql) => {
    return ids.map(id => sql`UPDATE words SET count = count + 1 WHERE id = ${id}`);
  }

  await sql.begin(trans);
}