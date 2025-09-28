import Database from 'better-sqlite3';
import { Database as CloudSqlite } from "@sqlitecloud/drivers";

let db;
if (process.env.NODE_ENV == 'development') {
  db = new Database('crossword_db.db', { verbose: console.log });
  db.pragma('journal_mode = WAL');
}

async function fetchFromLocalDb(minLength, maxLength, targetIndex, targetValue) {
  
  let q = `SELECT * FROM words WHERE length BETWEEN ${minLength} AND ${maxLength}`;
  
  if (targetIndex != null) {
    q += ` AND INSTR(name, '${targetValue}') = ${++targetIndex}`;
  }

  q += ` ORDER BY random()`;

  const stmt = db.prepare(q);

  return stmt.get();
}

async function fetchfromCloud(minLength, maxLength, targetIndex, targetValue) {
  
  let db;

  let q = `USE DATABASE crossword_db.db;`
  q += `SELECT * FROM words WHERE length BETWEEN ${minLength} AND ${maxLength}`;
  
  if (targetIndex != null) {
    q += ` AND INSTR(name, '${targetValue}') = ${++targetIndex}`;
  }

  q += ` ORDER BY random()`;

  try {
    db  = new CloudSqlite(process.env.SQLITECLOUD_URL);
    const result = await db.sql(q);

    return result[0];

  } catch (ex) {
    console.error(ex)
  } finally {
    db?.close()
  }
}

const getWord = process.env.NODE_ENV == 'production' ? fetchfromCloud : fetchFromLocalDb;

export default getWord;
