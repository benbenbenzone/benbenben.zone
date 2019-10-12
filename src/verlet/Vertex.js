import MathUtil from '../MathUtil'
class Vertex {

    constructor(position) {
      this.position = position
      this.prev = this.position;
      this.connection = []
      this.velocity = {
        x: this.position.x + (this.position.x - this.prev.x),
        y: this.position.y + (this.position.y - this.prev.y)
      }
    }
  
    update () {
      this.velocity = {
        x: this.position.x + (this.position.x - this.prev.x),
        y: this.position.y + (this.position.y - this.prev.y)
      }
      const next = {
        x : this.position.x + this.velocity.x,
        y : this.position.y + this.velocity.y,
      }
      this.prev = this.position
      this.position = next
    }

 
}
  
export default Vertex