<template>
  <canvas width="1000" height="1000" id="homelogo" resize>
  </canvas>
</template>

<script>
import paper, { Project, Path, Point } from 'paper'
import BenSvg from '../assets/ben.svg'
import Simulator from '../physics/Simulator'

export default {
  name: 'HomeLogo',
  mounted () {
    this.mouseX = 0
    this.mouseY = 0
    this.mouseDx = 0
    this.mouseDy = 0
    this.lastMouseMove = Date.now()

    this.benBounds = null

    document.onmousemove = function (e) {
      this.mouseDx = e.clientX - this.mouseX
      this.mouseDy = e.clientY - this.mouseY
      this.mouseX = e.clientX
      this.mouseY = e.clientY
      this.lastMouseMove = Date.now()
    }.bind(this)


    const canvas = document.getElementById('homelogo')
    const HomeLogoProject = new Project(canvas)

    const logoPoints = {
      b: [],
      e: [],
      n: []
    }

    this.ben1 = null
    this.ben2 = null
    this.ben3 = null

    HomeLogoProject.importSVG(BenSvg, { insert: false, onLoad: (bsvg) => {
      // Turn path into points
      this.benBounds = bsvg.bounds

      for (const letter of Object.keys(logoPoints)) {
        const path = bsvg.children[letter].children[0]
        path.flatten(0.1)
        const segments = path.segments
        for (const segment of segments) {
          logoPoints[letter].push({
            x: segment.point.x,
            y: segment.point.y
          })
        }
      }

      // Create a new translated base path
      for (const [letter, points] of Object.entries(logoPoints)) {
        this['path' + letter.toUpperCase()] = this.initializePath(points) 
      }

      this.ben1 = {
        paths: {
          b: this.pathB.clone(),
          e: this.pathE.clone(),
          n: this.pathN.clone()
        },
        points: {
          b: [],
          e: [],
          n: []
        }
      }

      this.ben2 = {
        paths: {
          b: this.pathB.clone(),
          e: this.pathE.clone(),
          n: this.pathN.clone()
        },
        points: {
          b: [],
          e: [],
          n: []
        }
      }

      this.ben3 = {
        paths: {
          b: this.pathB.clone(),
          e: this.pathE.clone(),
          n: this.pathN.clone()
        },
        points: {
          b: [],
          e: [],
          n: []
        }
      }
      const widthHalf = window.innerWidth / 2
      const heightHalf = window.innerHeight / 2

      this.ben1 = this.setInitialBenPosition(this.ben1, { x: this.benBounds.width / 2.5, y: this.benBounds.height / 1.75 })
      this.ben2 = this.setInitialBenPosition(this.ben2, { x: widthHalf - (this.benBounds.width / 2.5), y: heightHalf })
      this.ben3 = this.setInitialBenPosition(this.ben3, { x: window.innerWidth - this.benBounds.width * 1.05, y: window.innerHeight - this.benBounds.height / 1.75 })

      HomeLogoProject.view.onFrame = this.updateLogo.bind(this)
      HomeLogoProject.view.onResize = debounce(this.resizeToy, 250).bind(this)
    } })
  },
  methods: {
    updateInitialBenPosition (benIndex, pos) {
      for (const [letter, path] of Object.entries(this['ben'+benIndex].paths)) {
        this['ben' + benIndex].simulators[letter].updateOriginalPositions(pos)
      }
    },
    setInitialBenPosition (ben, pos) {
      ben.simulators = {
        b : null,
        e : null,
        n : null
      }

      for (const [letter, path] of Object.entries(ben.paths)) {
        path.translate({ x: pos.x, y: pos.y })
        if (letter === 'e') {
          path.translate({ x: 145, y: 0 })
        } else if (letter === 'n') {
          path.translate({ x: 290, y: 0 })
        }
        path.visible = true
        ben.paths[letter] = path

        const translatedPoints = []

        for (const segment of path.segments) {
          translatedPoints.push({
            x: segment.point.x,
            y: segment.point.y
          })
        }

        ben.points[letter] = translatedPoints
        ben.simulators[letter] = new Simulator(translatedPoints, true, false)
      }

      return {
        paths: ben.paths,
        points: ben.points,
        simulators: ben.simulators,
        stateIndex: 0,
        resting: false,
        restingStateLastChanged: Date.now()
      }
    },

    initializePath (points) {
      const path = new Path()
      path.fillColor = 'none'
      path.strokeColor = 'white'
      path.closed = true
      path.visible = false
      for (const point of points) {
        path.add(point)
      }
      path.scale(1)
      path.translate({ x: 0 - path.position.x, y: 0 - path.position.y })
      return path
    },

    updateLogo (e) {
      if (Date.now() - this.lastMouseMove > 10) {
        this.mouseDx = 0
        this.mouseDy = 0
      }

      this.ben1.simulators.b.update({ x: this.mouseDx, y: this.mouseDy })
      this.ben1.simulators.e.update({ x: this.mouseDx, y: this.mouseDy })
      this.ben1.simulators.n.update({ x: this.mouseDx, y: this.mouseDy })

      this.ben2.simulators.b.update({ x: -this.mouseDx, y: this.mouseDy })
      this.ben2.simulators.e.update({ x: this.mouseDx, y: -this.mouseDy })
      this.ben2.simulators.n.update({ x: -this.mouseDx, y: this.mouseDy })

      this.ben3.simulators.b.update({ x: -this.mouseDx, y: -this.mouseDy })
      this.ben3.simulators.e.update({ x: -this.mouseDx, y: this.mouseDy })
      this.ben3.simulators.n.update({ x: -this.mouseDx, y: -this.mouseDy })

      this.drawLogo()
    },
    drawLogo () {
      for (let i = 0; i < this.ben1.simulators.b.vertices.length; i++) {
        this.ben1.paths.b.segments[i].point = new Point(this.ben1.simulators.b.springVertices[i].position.x, this.ben1.simulators.b.springVertices[i].position.y)
      }
      for (let i = 0; i < this.ben1.simulators.e.vertices.length; i++) {
        this.ben1.paths.e.segments[i].point = new Point(this.ben1.simulators.e.springVertices[i].position.x, this.ben1.simulators.e.springVertices[i].position.y)
      }
      for (let i = 0; i < this.ben1.simulators.n.vertices.length; i++) {
        this.ben1.paths.n.segments[i].point = new Point(this.ben1.simulators.n.springVertices[i].position.x, this.ben1.simulators.n.springVertices[i].position.y)
      }

      for (let i = 0; i < this.ben2.simulators.b.vertices.length; i++) {
        this.ben2.paths.b.segments[i].point = new Point(this.ben2.simulators.b.springVertices[i].position.x, this.ben2.simulators.b.springVertices[i].position.y)
      }
      for (let i = 0; i < this.ben2.simulators.e.vertices.length; i++) {
        this.ben2.paths.e.segments[i].point = new Point(this.ben2.simulators.e.springVertices[i].position.x, this.ben2.simulators.e.springVertices[i].position.y)
      }
      for (let i = 0; i < this.ben2.simulators.n.vertices.length; i++) {
        this.ben2.paths.n.segments[i].point = new Point(this.ben2.simulators.n.springVertices[i].position.x, this.ben2.simulators.n.springVertices[i].position.y)
      }

      for (let i = 0; i < this.ben3.simulators.b.vertices.length; i++) {
        this.ben3.paths.b.segments[i].point = new Point(this.ben3.simulators.b.springVertices[i].position.x, this.ben3.simulators.b.springVertices[i].position.y)
      }
      for (let i = 0; i < this.ben3.simulators.e.vertices.length; i++) {
        this.ben3.paths.e.segments[i].point = new Point(this.ben3.simulators.e.springVertices[i].position.x, this.ben3.simulators.e.springVertices[i].position.y)
      }
      for (let i = 0; i < this.ben3.simulators.n.vertices.length; i++) {
        this.ben3.paths.n.segments[i].point = new Point(this.ben3.simulators.n.springVertices[i].position.x, this.ben3.simulators.n.springVertices[i].position.y)
      }
    },
    resizeToy (e) {
      const widthHalf = window.innerWidth / 2
      const heightHalf = window.innerHeight / 2
      const b1Dx = this.benBounds.width / 2.5 - this.ben1.paths['b'].position.x
      const b1Dy = this.benBounds.height / 1.75 - this.ben1.paths['b'].position.y
      if (Math.abs(b1Dx) > 0.05 && Math.abs(b1Dy) > 0.05) {
        this.updateInitialBenPosition(1, { x: b1Dx, y: b1Dy })
      }

      const b2Dx = (widthHalf - (this.benBounds.width / 2.5)) - this.ben2.paths['b'].position.x
      const b2Dy = heightHalf - this.ben2.paths['b'].position.y
      if (Math.abs(b2Dx) > 0.05 && Math.abs(b2Dy) > 0.05) {
        this.updateInitialBenPosition(2, { x: b2Dx, y: b2Dy })
      }

      const b3Dx = (window.innerWidth - this.benBounds.width * 1.05) - this.ben3.paths['b'].position.x
      const b3Dy = (window.innerHeight - this.benBounds.height / 1.75) - this.ben3.paths['b'].position.y
      if (Math.abs(b3Dx) > 0.05 && Math.abs(b3Dy) > 0.05) {
        this.updateInitialBenPosition(3, { x: b3Dx, y: b3Dy })
      }
    }
  }
}

function debounce (func, wait, immediate) {
  let timeout
  return function () {
    let context = this
    let args = arguments
    let later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    let callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
canvas[resize] {
  width: 100%;
  height: 100%;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
