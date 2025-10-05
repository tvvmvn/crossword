import Database from 'better-sqlite3';

const db = new Database('crossword_db.db', { verbose: console.log });
db.pragma('journal_mode = WAL');

export default async function getWord(minLength, maxLength, targetIndex, targetValue) {
  
  let q = `SELECT * FROM words WHERE length BETWEEN ${minLength} AND ${maxLength}`;
  
  if (targetIndex != null) {
    q += ` AND INSTR(name, '${targetValue}') = ${++targetIndex}`;
  }

  q += ` ORDER BY random()`;

  const stmt = db.prepare(q);

  return stmt.get();
}

