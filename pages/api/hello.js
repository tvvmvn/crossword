// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import sql from "@/lib/db";

export default async function handler(req, res) {
  
  const { email } = req.body

  try {
    await sql`INSERT INTO followers (email) VALUES (${email})`;
  
    res.status(200).json({ message: 'done' });
  } catch (ex) {
    res.status(400).json({ message: 'broken' });
    console.error(ex)
  }
}
