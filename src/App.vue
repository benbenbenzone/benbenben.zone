<template>
  <div id="app">
    <div class="projects-section" v-bind:class="{ 'projects-section--open': showProjects }">
      <SideBar title="PROJECTS" tabClickEventName="projects-tab-click" v-on:projects-tab-click="openProjects" direction="right">
        <Projects />
      </SideBar>
    </div>
    <div class="about-section" v-bind:class="{ 'about-section--open': showAbout }">
      <SideBar title="ABOUT" tabClickEventName="about-tab-click" v-on:about-tab-click="openAbout" direction="left">
        About
      </SideBar>
    </div>
    <HomeLogo/>
  </div>
</template>

<script>
import HomeLogo from './components/HomeLogo.vue'
import SideBar from './components/SideBar.vue'
import Projects from './components/Projects'


export default {
  name: 'app',
  data () {
    return {
      showProjects: false,
      showAbout: false
    }
  },
  components: {
    HomeLogo,
    SideBar,
    Projects
  },
  methods: {
    openProjects () {
      this.showProjects = true
      this.showAbout = false
    },
    openAbout () {
      this.showAbout = true
      this.showProjects = false
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
  position: absolute;
  top: 0;
  left: 0;

  overflow: hidden;

  width: 100%;
  height: 100%;

  color: $white;
  background-color: $black;

  font-family: $stratos;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.projects-section {
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

.about-section {
  position: absolute;
  top: 0;
  left: -50%;

  width: 50%;
  height: 100%;

  transition: all 0.5s $ease-in-out-quad;

  &--open {
    transform: translateX(100%);
  }
}
</style>
