import Vertex from './Vertex'
import Edge from './Edge'
import Spring from './Spring'

class Simulator {
  constructor (points, springs, edges) {
    this.vertices = this.createVertices(points)
    this.springVertices = null
    this.edges = null
    if (springs) {
      const res = this.createSprings(this.vertices)
      this.springs = res.springs
      this.springVertices = res.vertices
    }

    if (edges) {
      this.edges = this.createEdges(this.vertices)
    }
  }

  getEdges () {
    return this.edges
  }

  getVertices () {
    return this.vertices
  }
  update (pos) {
    if (this.springs) {
      this.updateSprings()
    }
    this.updateVertices(pos)
    if (this.edges) {
      this.updateEdges()
    }
  }

  createSprings (vertices) {
    const springVertices = []
    const springs = []
    for (const vert of vertices) {
      const springVert = new Vertex(vert.position, false)
      springVertices.push(springVert)
      springs.push(new Spring(springVert, vert, 0.1, 0.01, 1))
    }

    return {
      springs,
      vertices: springVertices
    }
  }

  isResting () {
    let allResting = true
    for (const vertex of this.vertices) {
      allResting = vertex.resting()
    }

    if (this.springVertices) {
      for (const springVertex of this.springVertices) {
        allResting = springVertex.resting()
      }
    }
    return allResting
  }

  createVertices (points) {
    const verts = []
    for (const point of points) {
      verts.push(new Vertex(point, true))
    }
    return verts
  }

  createEdges (vertices) {
    const edges = []
    for (let i = 0; i < vertices.length - 1; i++) {
      edges.push(new Edge(vertices[i], vertices[ i + 1 ]))
    }

    return edges
  }

  updateEdges () {
    for (const edge of this.edges) {
      edge.update()
    }
  }

  updateSprings () {
    for (const spring of this.springs) {
      if (!spring.resting()) {
        spring.update()
      }
    }
  }

  updateOriginalPositions (translation) {
    for (const vertex of this.vertices) {
      vertex.translateOrigin(translation)
    }
  }

  updateVertices (pos) {
    for (const vertex of this.vertices) {
      vertex.update(pos)
      vertex.constrain()
    }

    if (this.springVertices) {
      for (const springVertex of this.springVertices) {
        // if (!springVertex.resting()) {
        springVertex.update()
        // springVertex.constrain()
        // }
      }
    }
  }
}

export default Simulator
