<template>
  <div class="wrapper" v-touch:swipe="onSwipe">
    <div class="carousel" :style=" {
      transition: sliding ? 'none' : 'transform 1s ease',
      transform: getTransform()
    }">
      <slot :get-order="getOrder"></slot>
    </div>
  </div>
</template>

<script>
// https://medium.com/@incubation.ff/build-your-own-css-carousel-in-react-part-one-86f71f6670ca
export default {
  name: 'Carousel',
  props: {
    numSlides: Number,
    autoPlay: Boolean
  },
  data () {
    return {
      position: 0,
      sliding: false
    }
  },
  mounted () {
    console.log('CAROUSEL MUNTED', this.autoPlay)
    if (this.autoPlay) {
      this.interval = setInterval(() => {
        this.nextSlide()
      }, 3000)
    }
  },
  updated () {
    console.log('hellooooo')
  },
  methods: {
    getOrder (itemIndex) {
      const position = this.position
      const children = this.$children
      const numItems = this.numSlides || children.length || 1

      return ((numItems + 1) - position + itemIndex) % numItems
    },
    nextSlide () {
      const position = this.position
      const children = this.$children
      const numItems = children.length || 1

      this.doSliding('next', position === numItems - 1 ? 0 : position + 1)
    },
    prevSlide () {
      const position = this.position
      const children = this.$children
      const numItems = children.length

      this.doSliding('prev', position === 0 ? numItems - 1 : position - 1)
    },
    doSliding (direction, position) {
      this.sliding = true
      this.position = position
      this.direction = direction

      setTimeout(() => {
        this.sliding = false
      }, 50)
    },
    onSwipe (direction) {
      if (this.autoPlay) return

      if (direction === 'left') {
        this.nextSlide()
      } else if (direction === 'right') {
        this.prevSlide()
      }
    },
    getTransform () {
      if (this.numSlides === 1) return 'translateX(0%)'
      if (!this.sliding) return 'translateX(calc(-80% - 20px))'
      if (this.direction === 'prev') return 'translateX(calc(2 * (-80% - 20px)))'
      return 'translateX(0%)'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrapper {
  overflow: hidden;

  width: 100%;
}
.carousel {
  display: flex;
  margin: 0 0 20px 20px;
}
</style>
