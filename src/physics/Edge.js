import MathUtil from '../MathUtil'
import { throws } from 'assert'
class Edge {

  constructor(a, b, length) {
    this.a = a
    this.b = b

    this.length = length ? length : MathUtil.distance(a.position, b.position)
    this.length;
  }

  update () {
    const distance = MathUtil.distance(this.a.position, this.b.position)

    const diff = this.length - distance

    const percent = (diff / distance) / 2

    const offsetX = (this.b.position.x - this.a.position.x) * percent
    const offsetY = (this.b.position.y - this.a.position.y) * percent

    this.a.position.x -= offsetX
    this.a.position.y -= offsetY

    this.b.position.x += offsetX
    this.b.position.y += offsetY
  }

}
  
export default Edge