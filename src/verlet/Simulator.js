import Vertex from './Vertex'
import Edge from './Edge'


class Simulator {

  constructor(points) {

    this.vertices = this.createVertices(points)
    this.edges = this.createEdges()
  }

  getEdges () {
    return this.edges 
  }

  getVertices () {
    return this.vertices 
  }
  update () {
    this.updateVertices()
    this.updateEdges()
  }

  createVertices (points) {
    const verts = []
    for(const point of points) {
      verts.push(new Vertex(point))
    }
    return verts
  }

  createEdges () {
    const edges = []
    for (let i = 0; i < this.vertices.length; i++) {
      edges.push(new Edge(this.vertices[i], this.vertices[i % this.vertices.length]))
    }
    return edges
  }

  updateEdges() {
    for (const edge of this.edges) {
      edge.update()
    }
  }

  updateVertices () {
    for (const vertex of this.vertices) {
      vertex.update()
    }
  }

}

export default Simulator