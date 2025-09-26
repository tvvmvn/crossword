import { Database } from "@sqlitecloud/drivers";
import { unstable_noStore as noStore } from "next/cache";

export async function getStaticProps() {
  
  let db;
  let result;
  let d = new Date();

  try {
    // noStore(); // Prevents Next.js from caching the database request
    
    db = new Database(process.env.SQLITECLOUD_URL);

    const id = d.getDay() || 7
    console.log(d.getDay())
    
    result = await db.sql(`
      USE DATABASE crossword_db.db;
      SELECT * FROM words WHERE id=${id}
    `);

    console.log(result)
  } catch (ex) {
    console.error(ex)
  } finally {
    db?.close()
  }

  return {
    props: {
      word: JSON.parse(JSON.stringify(result[0])),
      clock: new Date().toUTCString(),
    },
    revalidate: 60 * 5 * 12 * 24, // every day
  }
}

export default function Home({ word, clock }) {
  console.log(word)

  return (
    <div className="px-4">
      <h1 className="my-4 font-semibold">
        {clock} (Server time)
      </h1>

      <p className="my-4">
        <b>{word.id}</b> {word.name} {word.meaning}
      </p>
    </div>
  )
}