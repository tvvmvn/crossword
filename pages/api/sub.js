import sql from "@/lib/db";
import { z } from 'zod';

export default async function handler(req, res) {
  
  const { email } = req.body;

  try {
    // valid check
    const emailSchema = z.email();
    emailSchema.parse(email); 

    // duplicate check
    let id = await sql`SELECT * FROM subscribers WHERE email=${email}`;

    if (id.length) {
      throw 'duplicate email';
    }

    // save
    await sql`INSERT INTO subscribers (email) VALUES (${email})`;
  
    res.status(200).json({ message: 'done' });
  
  } catch (ex) {
    res.status(400).json({ message: 'something is wrong' });
    console.error(ex)
  }
}
