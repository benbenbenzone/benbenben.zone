import MathUtil from '../MathUtil'
class Spring {

    constructor(a, b, k, d, l) {
      this.constant = k
      this.damping = d
      this.length = l
      this.a = a
      this.b = b
      this.on = true
    }

    currentLength () {
      return MathUtil.distance(this.a, this.b)
    }
  
    update () {
      if (!(this.on && (!this.a.fixed || !this.b.fixed))) return

      let a2b = {
        x: this.a.position.x - this.b.position.x,
        y: this.a.position.y - this.b.position.y
      }

      const d = MathUtil.vectorLength(a2b)

      if (d === 0) {
        a2b = {
          x : 0,
          y: 0
        }
      } else {
        a2b.x /= d
        a2b.y /= d
      }

      const fspring = -1 * (d - this.length) * this.constant  
      const va2b = {
        x : this.a.velocity.x - this.b.velocity.x, 
        y : this.a.velocity.y - this.b.velocity.y
      }

      const fdamping = -1 * this.damping *  MathUtil.dotProduct( va2b, a2b );
      const fr = fspring + fdamping

      a2b.x *= fr
      a2b.y *= fr

      if (!this.a.fixed) {
        this.a.velocity.x  += a2b.x
        this.a.velocity.y  += a2b.y
      }

      if (!this.b.fixed) {
        this.b.velocity.x  -= a2b.x
        this.b.velocity.y  -= a2b.y
      }
      return
    }
}
  
export default Spring