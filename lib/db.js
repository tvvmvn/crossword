// db.js
import postgres from 'postgres'

let url;

if (process.env.NODE_ENV === 'production') {
  url = process.env.DATABASE_URL
} else {
  url = 'postgresql://localhost:5432/postgres';
}

const sql = postgres(url) 

export default sql;