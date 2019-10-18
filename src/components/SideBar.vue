<template>
  <div class="side-bar" v-bind:class="{ 'side-bar--right': position === 'right', 'side-bar--left': position === 'left' }">
    <div class="side-bar__tab" v-bind:class="{ 'side-bar__tab--left': position === 'right', 'side-bar__tab--right': position === 'left' }" v-on:click="$emit(tabClickEventName)">
      <div class="side-bar__tab-title" v-bind:class="{ 'side-bar__tab-title--top': position === 'right', 'side-bar__tab-title--bottom': position === 'left' }">
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
