import sql from "./db";

export async function getWords() {

  const trans = async (sql) => {
    let d = await sql`SELECT * FROM pin`;
    
    if (!d.length) {
      // set pin to 0
      await sql`INSERT INTO pin (id, val) VALUES (1, 0)`;

      // add team to words
      let countPerGroup = 10;
      let totalCount = 1000;
      let groupCount = totalCount / countPerGroup; // 100
    
      for (let i = 1; i <= groupCount; i++) {
        let words = await sql`SELECT * FROM words WHERE team = 0 ORDER BY random() LIMIT ${countPerGroup}`;
    
        for (let j = 0; j < words.length; j++) {
          await sql`UPDATE words SET team = ${i} WHERE id = ${words[j].id}`;
        }
      }
    }
  
    let pins = await sql`SELECT * FROM pin`;
    let team = pins[0].val + 1;
    
    if (team > 1000) team = 1;

    await sql`UPDATE pin SET val = ${team};`
    
    return await sql`SELECT * FROM words WHERE team = ${team}`;
  }
  
  return await sql.begin(trans);
}