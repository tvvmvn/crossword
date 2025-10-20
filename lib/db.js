// db.js
import postgres from 'postgres'

let url = process.env.DATABASE_URL;

const sql = postgres(url) 

export default sql;