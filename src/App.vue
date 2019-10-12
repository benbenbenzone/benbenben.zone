<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HomeLogo/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HomeLogo from './components/HomeLogo.vue'


export default {
  name: 'app',
  components: {
    HomeLogo
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: black;
}
</style>
