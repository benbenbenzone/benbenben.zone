<template>
  <canvas width="1000" height="1000" id="homelogo" resize>
  </canvas>
</template>

<script>
import paper, { Project, Path, Point } from 'paper'
import BenBSvg from '../assets/ben.svg'
import Simulator from '../physics/Simulator'

import Api from '../api/index'

export default {
  name: 'HomeLogo',
  mounted() {
    this.mouseX = 0
    this.mouseY = 0
    this.mouseDx = 0
    this.mouseDy = 0
    this.lastMouseMove = Date.now()

    document.onmousemove = function(e){
      // console.log("mouse location:", e.clientX, e.clientY)
      this.mouseDx = e.clientX - this.mouseX
      this.mouseDy = e.clientY - this.mouseY
      this.mouseX = e.clientX
      this.mouseY = e.clientY
      this.lastMouseMove = Date.now()
    }.bind(this)

    // SAMPLE PROJECTS CALL
    Api.getProjects().then((res) => {
    })


    const canvas  = document.getElementById('homelogo')
    const HomeLogoProject = new Project(canvas)

    const logoPoints = {
      b : [],
      e : [],
      n : []
    }

    this.ben1 = null
    this.ben2 = null
    this.ben3 = null

    HomeLogoProject.importSVG(BenBSvg, { insert: false, onLoad: (bsvg) => {
        // Turn path into points
        for (const letter of Object.keys(logoPoints)) {
  
          const path = bsvg.children[letter].children[0]
          path.flatten(0.1)
          const segments  = path.segments;
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
          // const translatedPoints = []

          // for (const segment of this['path' + letter.toUpperCase()].segments) {
          //   translatedPoints.push({
          //     x: segment.point.x,
          //     y: segment.point.y
          //   })
          // }

          // logoPoints[letter] = translatedPoints
          // this['sim' + letter.toUpperCase()] = new Simulator(translatedPoints, true, false)
        }

        this.ben1 = {
          paths: {
            b: this.pathB.clone(),
            e: this.pathE.clone(),
            n: this.pathN.clone()
          },
          points: {
            b : [],
            e : [],
            n : []
          }
        }

        this.ben2 = {
          paths: {
            b: this.pathB.clone(),
            e: this.pathE.clone(),
            n: this.pathN.clone()
          },
          points: {
            b : [],
            e : [],
            n : []
          }
        }

        this.ben3 = {
          paths: {
            b: this.pathB.clone(),
            e: this.pathE.clone(),
            n: this.pathN.clone()
          },
          points: {
            b : [],
            e : [],
            n : []
          }
        }
        const widthHalf = window.innerWidth/2
        const heightHalf = window.innerWidth/2
        
        this.ben1 = this.setInitialBenPosition(this.ben1, {x: 170, y: 300})
        this.ben2 = this.setInitialBenPosition(this.ben2, {x: widthHalf-150, y: heightHalf-150})
        this.ben3 = this.setInitialBenPosition(this.ben3  , {x: window.innerWidth -400, y: window.innerHeight+20})
        // this.ben1.states = [{x: widthQuarter * 2.5, y: heightQuarter}, {x: widthQuarter, y: heightQuarter * 2}, {x: widthQuarter, y: heightQuarter}]
        HomeLogoProject.view.onFrame = this.updateLogo.bind(this)
    }})

  },
  methods: {
    setInitialBenPosition(ben, pos) {
      ben.simulators = {
        b : null,
        e : null,
        n : null
      }

      for (const [letter, path] of Object.entries(ben.paths)) {
        path.translate({x: (pos.x - path.position.x) - 75, y: (pos.y - path.position.y) -150})
        path.visible = true
        if (letter === 'e') {
          path.translate({x: 145, y: 0 })
        } else if (letter === 'n') {
          path.translate({x: 290, y: 0 })
        }
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
        paths : ben.paths,
        points: ben.points,
        simulators: ben.simulators,
        stateIndex: 0,
        resting: false,
        restingStateLastChanged: Date.now()
      }
    },
    initializePath(points) {
      const path = new Path()
      path.fillColor = 'none'
      path.strokeColor = 'white'
      path.closed = true
      path.visible = false
      for (const point of points) {
        path.add(point)
      }
      path.scale(1)
      path.translate({x: 0 - path.position.x, y: 0 - path.position.y})
      return path
    },

    updateLogo(e) {
      if (Date.now() - this.lastMouseMove > 10) {
        this.mouseDx = 0
        this.mouseDy = 0

      }

      this.ben1.simulators.b.update({x: this.mouseDx, y: this.mouseDy})
      this.ben1.simulators.e.update({x: this.mouseDx, y: this.mouseDy})
      this.ben1.simulators.n.update({x: this.mouseDx, y: this.mouseDy})

      this.ben2.simulators.b.update({x: -this.mouseDx, y: this.mouseDy})
      this.ben2.simulators.e.update({x: this.mouseDx, y: -this.mouseDy})
      this.ben2.simulators.n.update({x: -this.mouseDx, y: this.mouseDy})
      
      this.ben3.simulators.b.update({x: -this.mouseDx, y: -this.mouseDy})
      this.ben3.simulators.e.update({x: -this.mouseDx, y: this.mouseDy})
      this.ben3.simulators.n.update({x: -this.mouseDx, y: -this.mouseDy})

      this.drawLogo()
    },

    drawLogo() {
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


      // DRAWING  SPRING
      // for (let i = 0; i < this.simE.vertices.length; i++) {
      //   this.pathE.segments[i].point = new Point(this.simE.springVertices[i].position.x, this.simE.springVertices[i].position.y)
      // }

      // DRAWING NON SPRING
      // for (let i = 0; i < this.simE.vertices.length; i++) {
      //   this.pathE.segments[i].point = new Point(this.simE.vertices[i].position.x, this.simE.vertices[i].position.y)
      // }


      // for (let i = 0; i < this.simN.vertices.length; i++) {
      //   this.pathN.segments[i].point = new Point(this.simN.vertices[i].position.x, this.simN.vertices[i].position.y)
      // }

      // console.log(this.pathB.segments[0].point, this.simB.vertices[0].position.x, this.simB.vertices[0].position.y)

    }
  }
}



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
