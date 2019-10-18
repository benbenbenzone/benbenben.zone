class Vertex {
  constructor (position, fixed) {
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
      this.velocity = {
        x: this.position.x - this.prev.x,
        y: this.position.y - this.prev.y
      }

      const next = {
        x: this.position.x + this.velocity.x,
        y: this.position.y + this.velocity.y
      }

      this.prev = this.position
      this.position = next
    } else {
      if (pos.x !== 0) {
        this.position.x = this.originalPosition.x + (pos.y * 2.5)
        this.position.y = this.originalPosition.y + (pos.x * 1.25)
      } else {
        this.position.y = this.originalPosition.y
        this.position.x = this.originalPosition.x
        this.velocity.y = 0
        this.velocity.x = 0
      }
    }
  }

  constrain () {
    if (this.position.x > window.innerWidth) {
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

  setPosition (pos) {
    this.originalPosition.x = pos.x
    this.originalPosition.y = pos.y
  }

  translateOrigin (translation) {
    this.originalPosition.x += translation.x
    this.originalPosition.y += translation.y
  }

  resting () {
    if (!this.fixed) {
    }
    return (this.fixed || (this.velocity.x === 0 && this.velocity.y === 0))
  }
}

export default Vertex
