import sql from "./db";

export async function getWords() {

  const words = await sql`SELECT * FROM words ORDER BY random() LIMIT 10`;

  return words;
}