import { Database } from "@sqlitecloud/drivers";

export async function getWord(minLength, maxLength, targetIndex, targetValue) {
  
  let db;

  let q = `USE DATABASE crossword_db.db;`
  q += `SELECT * FROM words WHERE length BETWEEN ${minLength} AND ${maxLength}`;
  
  if (targetIndex != null) {
    q += ` AND INSTR(name, '${targetValue}') = ${++targetIndex}`;
  }

  q += ` ORDER BY random()`;

  try {
    db  = new Database(process.env.SQLITECLOUD_URL);
    const result = await db.sql(q);

    return result[0];

  } catch (ex) {
    console.error(ex)
  } finally {
    db?.close()
  }
}
