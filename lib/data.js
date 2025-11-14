import sql from "./db";

export async function getWords() {
  return await sql`SELECT * FROM words WHERE length < 12 ORDER BY random() LIMIT 10`;
}