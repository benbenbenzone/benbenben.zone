<template>
  <canvas width="1000" height="1000" id="homelogo">
  </canvas>
</template>

<script>
import paper, { Project, Path, Point } from 'paper'
import BenBSvg from '../assets/ben.svg'
import Simulator from '../physics/Simulator'

export default {
  name: 'HomeLogo',
  mounted() {
    const canvas  = document.getElementById('homelogo')
    const HomeLogoProject = new Project(canvas)
    const logoPoints = {
      b : [],
      e : [],
      n : []
    }

    HomeLogoProject.importSVG(BenBSvg, { insert: false, onLoad: (bsvg) => {
        for (const letter of Object.keys(logoPoints)) {
  
          const path = bsvg.children[letter].children[0]
          const segments  = path.segments;
          for (const segment of segments) {
            logoPoints[letter].push({
              x: segment.point.x,
              y: segment.point.y
            })
          }
        }

        for (const [letter, points] of Object.entries(logoPoints)) {
          this['path' + letter.toUpperCase()] = this.initializePath(points) 
          this['sim' + letter.toUpperCase()] = new Simulator(points, true, false)
        }

        HomeLogoProject.view.onFrame = this.updateLogo.bind(this)
    }})

  },
  methods: {
    initializePath(points) {
      const path = new Path()
      path.fillColor = 'none'
      path.strokeColor = 'white'
      path.closed = true
      for (const point of points) {
        path.add(point)
      }

      return path
    },

    updateLogo(e) {
      // this.simB.update(e)
      this.simE.update(e)
      this.simN.update(e)
      this.drawLogo()
    },

    drawLogo() {
      // for (let i = 0; i < this.simB.vertices.length; i++) {
      //   this.pathB.segments[i].point = new Point(this.simB.vertices[i].position.x, this.simB.vertices[i].position.y)
      // }

      // DRAWING  SPRING
      for (let i = 0; i < this.simE.vertices.length; i++) {
        this.pathE.segments[i].point = new Point(this.simE.springVertices[i].position.x, this.simE.springVertices[i].position.y)
      }

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
