<template>
  <div class="side-bar">
    <div class="side-bar__tab" v-on:click="$emit(tabClickEventName)">
      <div class="side-bar__tab-title">
        {{title}}        
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  props: {
    direction: String,
    title: String,
    tabClickEventName: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.side-bar {
  z-index: $z-index-side-bar;
  background: $black;
  width: 100%;
  height: 100%;

  &__tab {
    position: absolute;
    top: 0;
    left: -5rem;

    width: 5rem;
    height: 100%;
    padding: 0.5rem;

    cursor: pointer;

    border-left: 4px solid $white;
  }

  &__tab-title {
    color: $white;
    margin-left: 85%;

    transform: rotate(90deg);
    transform-origin: 0% 0%;

    font-size: 4.5rem;
  }
}
</style>