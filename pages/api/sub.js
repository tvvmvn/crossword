import sql from "@/lib/db";
import { z, ZodError } from 'zod';

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

    // save in db
    await sql`INSERT INTO subscribers (email) VALUES (${email})`;
  
    res.status(201).json({ message: 'done' });
  
  } catch (ex) {
    console.error(ex)
    
    if (ex instanceof z.ZodError) {
      res.status(400).end();
    } else {
      res.status(409).end();
    }
  }
}
