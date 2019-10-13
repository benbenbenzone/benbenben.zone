import MathUtil from '../MathUtil'
class Vertex {

    constructor(position, fixed) {
      this.originalPosition = JSON.parse(JSON.stringify(position))
      this.position = position
      this.prev = JSON.parse(JSON.stringify(this.position))
      this.fixed = fixed

      this.velocity = {
        x: (this.position.x - this.prev.x),
        y: (this.position.y - this.prev.y)
      }
    }
  
    update (pos) {
      if (!this.fixed) {
        const next = {
          x : this.position.x + this.velocity.x,
          y : this.position.y + this.velocity.y,
        }

        this.prev = this.position
        this.position = next
        this.velocity = {
          x: (this.position.x - this.prev.x),
          y: (this.position.y - this.prev.y)
        }

      } else {
        if (pos.x !== undefined) {
          console.log(pos)
          this.position.x = this.originalPosition.x + Math.cos((Date.now()/10) * Math.PI) *500 * (pos.x*pos.y)/2
          // this.position.y = this.originalPosition.x + Math.sin((Date.now()/10) * Math.PI) *500 * (pos.y/1000)

        }
      }
 
    }

    constrain () {
      if (this.position.x  > window.innerWidth) {
        this.position.x = window.innerWidth
        this.prev.x = this.position.x + this.velocity.x
      } else if (this.position.x < 0) {
        this.position.x = 0
        this.prev.x = this.position.x + this.velocity.x
      } else if (this.position.y > window.innerHeight) {
        this.position.y = window.innerHeight
        this.prev.y = this.position.y + this.velocity.y
      } else if (this.position.y < 0) {
        this.position.y = 0
        this.prev.y = this.position.y + this.velocity.y
      }
    }

    resting () {
      if (!this.fixed) {
        // console.log(this.velocity)
      }
      return (this.fixed || (Math.abs(this.velocity.x) <= 0.01 && Math.abs(this.velocity.y) <= 0.01))
    }
}
  
export default Vertex