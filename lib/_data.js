import Database from 'better-sqlite3';

const db = new Database('crossword_db.db', { verbose: console.log });
db.pragma('journal_mode = WAL');

export async function getWord(condition) {
  
  let length = condition.length;
  let char = condition.trim();
  let index = condition.indexOf(char) + 1;

  let q = `
    SELECT * FROM words WHERE length = ${length} 
    AND INSTR(name, '${char}') = ${index}
    ORDER BY random()`; 

  const stmt = db.prepare(q);

  return stmt.get();
}

