<template>
  <div class="slide"  :style="{ order: order }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Slide',
  props: {
    order: Number
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
