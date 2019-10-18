<template>
  <div class="slide"  v-bind:style="{ order: order }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Slide',
  props: {
    idx: Number,
    orderFunc: Function
  },
  computed: {
    order () {
      console.log(this.idx)
      console.log(this.orderFunc(this.idx))
      return this.orderFunc(this.idx)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.slide {
  flex: 1 0 100%;
  flex-basis: 80%;
  margin-right: 2rem;
}
</style>
