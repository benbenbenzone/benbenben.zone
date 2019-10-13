<template>
  <div class="side-bar">
    <div class="side-bar__tab" v-bind:class="{ 'side-bar__tab--left': direction === 'right', 'side-bar__tab--right': direction === 'left' }" v-on:click="$emit(tabClickEventName)">
      <div class="side-bar__tab-title" v-bind:class="{ 'side-bar__tab-title--top': direction === 'right', 'side-bar__tab-title--bottom': direction === 'left' }">
        {{title}}        
      </div>
    </div>
      <slot></slot>
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

  width: 100%;
  height: 100%;

  background: $black;

  &__tab {
    box-sizing: border-box;
    position: absolute;
    top: 0;

    width: 5rem;
    height: 100%;
    padding: 0.5rem;

    cursor: pointer;

    background: $black;

    &--left {
      left: -5rem;

      border-left: 4px solid $white;
    }

    &--right {
      right: -5rem;

      border-right: 4px solid $white;
    }

  }

  &__tab-title {
    position: absolute;

    color: $white;

    font-size: 4.5rem;

    &--top {
      top: 0;

      margin-left: 85%;

      transform: rotate(90deg);
      transform-origin: top left;
    }

    &--bottom {
      bottom: 0;

      margin-bottom: 10%;
      margin-left: 90%;

      transform: rotate(-90deg);
      transform-origin: bottom left;
    }
  }
}
</style>