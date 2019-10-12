import MathUtil from '../MathUtil'
class Edge {

  constructor(a, b, length) {
    this.a = a
    this.b = b

    this.length = length ? length : MathUtil.distance(a.position, b.position)
  }

  update () {
    const distance = MathUtil.distance(this.a, this.b)
    const diff = this.length - distance
    const percent = (diff / distance) / 2

    const offsetX = (this.b.x - this.a.x) * percent
    const offsetY = (this.b.y - this.a.y) * percent

    this.a.prev.x -= offsetX
    this.a.prev.y -= offsetX

    this.b.prev.x -= offsetY
    this.b.prev.y -= offsetY

  }

}
  
export default Edge