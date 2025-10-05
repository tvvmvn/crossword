// words
let words = [
  ...generateRandomWords(2, 26),
  ...generateRandomWords(3, 26),
  ...generateRandomWords(4, 26),
  ...generateRandomWords(5, 26),
]

export function getWord(condition) {

  let candidates = words
    .filter(word => {
      let a = word.length == condition.length
      if (a) {
        let b = true;
        for (let i = 0; i < word.length; i++) {
          if (condition[i] != ' ' && (word[i] != condition[i])) {
            b = false;
          }
        }

        if (b) {
          return word;
        }
      }
    })
  
  if (!candidates.length) {
    return null;
  }

  let i = Math.floor(Math.random() * candidates.length);
  return candidates[i];
}

export function generateRandomWords(length, count) {
  let words = []

  for (let i = 0; i < count; i++) {
    let word = ''

    for (let j = 0; j < length; j++) {
      let x = Math.floor(Math.random() * 26);
      word += '' + String.fromCharCode(97 + x);
    }

    words.push(word)
  }

  return words;
}
