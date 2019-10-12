<template>
  <div id="app">
    <div class="projects" v-bind:class="{ 'projects--open': showProjects }">
      <SideBar title="PROJECTS" tabClickEventName="projects-tab-click" v-on:projects-tab-click="openProjects">
        PROJECTS
      </SideBar>
    </div>
    <HomeLogo/>
  </div>
</template>

<script>
import HomeLogo from './components/HomeLogo.vue'
import SideBar from './components/SideBar.vue'


export default {
  name: 'app',
  data: function () {
    return {
      showProjects: false
    }
  },
  components: {
    HomeLogo,
    SideBar
  },
  methods: {
    openProjects: function() {
      this.showProjects = true
    }
  }
}
</script>

<style lang="scss">
@import './reset.scss';

html, body {
  position: relative;

  width: 100%;
  height: 100%;
}

#app {
  background-color: $black;

  font-family: $stratos;
  color: $white;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.projects {
  position: absolute;
  top: 0;
  right: -50%;

  width: 50%;
  height: 100%;
  transition: all 0.5s $ease-in-out-quad;

  &--open {
    transform: translateX(-100%);
  }
}
</style>
