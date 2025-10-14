import { parse } from 'csv-parse';

const csv = 'type,part\nunicorn,horn\nrainbow,"pink, purple"';

let opt = {
  columns: true, // Use the first row as column headers
  skip_empty_lines: true
}

export function f() {
  return new Promise((res, rej) => {
    parse(csv, opt, (err, records) => {
      if (err) {
        rej(err)
      }
      res(records)
    });
  })
}