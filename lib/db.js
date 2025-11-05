// db.js
import postgres from 'postgres'

let url = 'postgresql://localhost:5432/postgres'

const sql = postgres(url);

export default sql;