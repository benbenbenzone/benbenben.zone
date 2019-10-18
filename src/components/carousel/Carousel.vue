<template>
  <div class="wrapper" v-touch:swipe="onSwipe">
    <div class="carousel" v-bind:style=" {
      transition: sliding ? 'none' : 'transform 1s ease',
      transform: getTransform()
    }">
      <slot v-bind:get-order="getOrder"></slot>
    </div>
  </div>
</template>

<script>
// https://medium.com/@incubation.ff/build-your-own-css-carousel-in-react-part-one-86f71f6670ca
export default {
  name: 'Carousel',
  data () {
    return {
      position: 0,
      sliding: false
    }
  },
  methods: {
    getOrder (itemIndex) {
      // console.log(itemIndex)
      const position = this.position
      const children = this.$children
      const numItems = children.length || 1
      // console.log(this.$children.length)
      // console.log(this.$children)
      // console.log(((numItems + 1) - position + itemIndex) % numItems)
      // console.log('POSITION', position)
      // console.log('NUM ITEMS', numItems)
      // console.log('ITEM INDEX', itemIndex)
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
      if (direction === 'left') {
        this.nextSlide()
      } else if (direction === 'right') {
        this.prevSlide()
      }
    },
    getTransform () {
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
