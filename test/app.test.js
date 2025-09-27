import { getWord } from "@/lib/data";

test('', async () => {
  const word = await getWord(2, 3, null, null)

  console.log(word)
})