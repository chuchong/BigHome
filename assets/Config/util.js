function randomRangeInt (n, m) {
  var c = m - n + 1
  return Math.floor(Math.random() * c + n)
}

module.exports = {
  randomRangeInt: randomRangeInt
}
