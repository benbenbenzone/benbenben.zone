<template>
  <div class="side-bar" :class="{ 'side-bar--right': position === 'right', 'side-bar--left': position === 'left' }">
    <div class="side-bar__tab" :class="{ 'side-bar__tab--left': position === 'right', 'side-bar__tab--right': position === 'left' }" v-on:click="$emit(tabClickEventName)">
      <div class="side-bar__tab-title" :class="{ 'side-bar__tab-title--top': position === 'right', 'side-bar__tab-title--bottom': position === 'left' }">
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
    position: String,
    title: String,
    tabClickEventName: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.side-bar {
  z-index: $z-index-side-bar;

  box-sizing: border-box;
  width: 100%;
  height: 100%;

  background: $black;

  overflow-y: auto;
  overflow-x: hidden;

  &--left {
    border-right: 4px solid $white;
  }

  &--right {
    border-left: 4px solid $white;
  }

  &__tab {
    position: absolute;
    top: 0;

    box-sizing: border-box;
    width: $side-bar-tab-width;
    height: 100%;
    padding: 0.5rem;

    cursor: pointer;

    background: $black;

    @media screen and (max-width: $small-screen-size) {
      width: $mobile-side-bar-tab-width;
    }

    &--left {
      left: -$side-bar-tab-width;

      border-left: 4px solid $white;

      @media screen and (max-width: $small-screen-size) {
        left: -$mobile-side-bar-tab-width
      }
    }

    &--right {
      right: -$side-bar-tab-width;

      border-right: 4px solid $white;

      @media screen and (max-width: $small-screen-size) {
        right: -$mobile-side-bar-tab-width
      }
    }

  }

  &__tab-title {
    position: absolute;

    color: $white;

    font-size: 4.5rem;

    @media screen and (max-width: $small-screen-size) {
      font-size: 3rem;
    }

    &--top {
      top: 0;

      margin-left: 85%;

      transform: rotate(90deg);
      transform-origin: top left;
    }

    &--bottom {
      bottom: 0;

      margin-bottom: 10%;
      margin-left: 85%;

      transform: rotate(-90deg);
      transform-origin: bottom left;
    }
  }
}
</style>
