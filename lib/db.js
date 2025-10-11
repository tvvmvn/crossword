// db.js
import postgres from 'postgres'

// will use psql environment variables
const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' }) 

export default sql;