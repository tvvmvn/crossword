import sql from "./db";

export async function getWords(team) {
  return await sql`SELECT * FROM words WHERE team = ${team}`;
}