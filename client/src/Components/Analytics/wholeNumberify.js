function wholeNumberify (top, bottom) {

  // case where user just started...
  if (bottom === 0) return top;

  const divide = top/bottom;

  // not a clean divide
  if (divide % 1 !== 0) {

    const percent = `${((top)/(bottom)).toFixed(2)}`;
    const index = `${divide}`.split('').reverse().some((char, idx) => {
      if (char === '0') return idx;
    }) || -1;
    if (index === -1) return Number.parseFloat(percent);
    else {
      return Number.parseFloat(`${percent}`.substring(0,percent.length - index));
    }

  } else {
    // ship it!
    return divide;
  }
}

module.exports = wholeNumberify
