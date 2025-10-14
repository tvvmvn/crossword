// info
let docId = process.env.G_SHEET
let sheets = [
  { name: 'a1', gid: '0' },
  { name: 'a2', gid: '1101073257' },
  { name: 'b1', gid: '2050331267' },
  { name: 'b2', gid: '185641346' },
  { name: 'b2+', gid: '1563634666' },
  { name: 'c1', gid: '1538155354' }
]

async function f() {
  // fetching
  let url = `https://docs.google.com/spreadsheets/d/e/${docId}/pub?gid=${sheets[0].gid}&single=true&output=csv`;
  let res = await fetch(url);
  let d = await res.text();

  // parsing
  let a = d.split(/\r?\n/);

  for (let i = 0; i < 100; i++) {
    let b = a[i].split(',')
    let name = b[0]
    let meaning = b.slice(1).join(',')

    let word = {
      id: i,
      name,
      meaning,
      length: name.length
    }

    console.log(word)
  }
}