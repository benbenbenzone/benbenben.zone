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
  
    update () {
      if (!this.fixed) {
      
        const next = {
          x : this.position.x + this.velocity.x,
          y : this.position.y + this.velocity.y,
        }
        // if (this.fixed) {
        // }
        // if (this.next.x < (this.originalPosition.x + 300)) {
        //   next.y += 0.1;
        // }
        this.prev = this.position
        this.position = next
        this.velocity = {
          x: (this.position.x - this.prev.x),
          y: (this.position.y - this.prev.y)
        }
      } else {
        if (this.position.x < (this.originalPosition.x + 300)) {
          this.position.x += 100;
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
}
  
export default Vertex