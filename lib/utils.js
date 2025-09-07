export function updateDownward(cells, newCrds, currentCrds, downward) {

  const [r, c] = newCrds;
  const { top, bottom, left, right } = getAround(cells, newCrds);

  // both
  if (top && right || right && bottom || bottom && left || left && top) {
    // same cell clicked
    if (currentCrds[0] == r && currentCrds[1] == c) {
      return !downward;
    }
    // across by default if both 
    return false; 
  }
  if (top || bottom) {
    return true;
  }
  if (left || right) {
    return false;
  }
}

export function updateCurrentCrds(cells, currentCrds, downward, delClicked) {

  const [r, c] = currentCrds;
  const { top, bottom, left, right } = getAround(cells, currentCrds);

  // create new crds
  if (downward && top && delClicked) {
    return [r - 1, c] // to north
  }
  if (downward && bottom && !delClicked) {
    return [r + 1, c] // to south
  }
  if (!downward && left && delClicked) {
    return [r, c - 1] // to west
  }
  if (!downward && right && !delClicked) {
    return [r, c + 1] // to east
  }
  return [r, c] // stay
}

export function generateKeys(cells) {

  let k = cells.flat()
    .filter(cell => cell.active)
    .map(cell => cell.value)
    .filter((val, i, arr) => arr.indexOf(val) == i)
    .sort()

  let keys = []
  let i = 0;

  for (let r = 0; r < 4; r++) {
    keys[r] = []
    for (let c = 0; c < 7; c++) {
      if (i < k.length) {
        keys[r][c] = k[i];
      } else if (i == k.length) {
        keys[r][c] = 'del'
      } else {
        keys[r][c] = ''
      }
      i++;
    }
  }

  return keys;
}

function getAround(cells, crds) {
  const [r, c] = crds;
  
  return { 
    top: r > 0 && cells[r - 1][c].active,
    bottom: r < cells.length - 1 && cells[r + 1][c].active,
    left: c > 0 && cells[r][c - 1].active,
    right: c < cells[r].length - 1 && cells[r][c + 1].active
  };
}