// db.js
import postgres from 'postgres'

let url = 'postgresql://localhost:5432/postgres';

if (process.env.NODE_ENV == 'production') {
  url = process.env.DATABASE_URL;
}

const sql = postgres(url) 

export default sql;