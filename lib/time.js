export function getDateTime() {
  
  let d = new Date();
  d.setUTCHours(d.getUTCHours() + 9);

  let year = d.getUTCFullYear()
  let month = d.getUTCMonth() + 1
  let date = d.getUTCDate()
  let day = d.getUTCDay()
  let hour = d.getUTCHours()
  let minutes = d.getUTCMinutes()

  return { 
    year, 
    month, 
    date, 
    day: parseDay(day), 
    hour, 
    minutes 
  }
}

export function parseDay(n) {
  switch (n) {
    case 0:
      return '일';
    case 1:
      return '월';
    case 2:
      return '화';
    case 3:
      return '수';
    case 4:
      return '목';
    case 5:
      return '금';
    case 6:
      return '토';
    default:
      return null;
  }
}