const MathUtil = {
  distance (a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
  },
  vectorLength (v) {
    return Math.sqrt((v.x * v.x) + (v.y * v.y))
  },
  dotProduct (a,b) {
    return ((a.x * b.x) + (a.y * b.y))
  }
}

export default MathUtil
