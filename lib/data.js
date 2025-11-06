import sql from "./db";

export async function getWords() {
  return await sql`SELECT * FROM words ORDER BY random() LIMIT 10`;
}