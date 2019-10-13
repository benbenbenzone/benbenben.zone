<template>
  <div class="projects">
    <div v-for="(project, index) in projects" v-bind:key="project.id" v-on:click="openProject(index)" class="project-outer" 
      v-bind:class="[index+1 % 2 == 0 ? 'project-outer--bottom' : 'project-outer--top', selectedProject === index ? 'project-outer--open' : 'project-outer--close']">
      <div class="project-inner" v-bind:class="[index+1 % 2 == 0 ? 'project-inner--bottom' : 'project-inner--top', selectedProject === index ? 'project-inner--open' : 'project-inner--close']">
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../api';

export default {
  name: 'Projects',
  data () {
    return {
      projects: [],
      selectedProject: -1
    }
  },
  mounted() {
    Api.getProjects().then((projects) => {
      this.projects = projects
    })
  },
  methods: {
    openProject (projectIdx) {
      this.selectedProject = projectIdx
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.projects {

}

.project-inner {
  position: relative;

  height: 400px;

  background: $black;

  transition: all 0.3s;

  &--close {
    height: 400px;
  }

  &--open {
    height: 700px;
  } 

  &--top {
    &.project-inner--close {
      clip-path: polygon(3px 0, 3px 0, 100% 0, 100% calc(100% - 3px));
    }
    
    &.project-inner--open {
      clip-path: polygon(3px 500px, 3px 0, 100% 0, 100% calc(100% - 3px));      
    }
  }
}

.project-outer {
  position: relative;

  background: $white;

  transition: all 0.3s;

  &--close {
    height: 400px;
  }

  &--open {
    height: 700px;
  }

  &--top {
    &.project-outer--close {
      clip-path: polygon(0 0, 0 0, 100% 0, 100% 100%);
    }

    &.project-outer--open {
      clip-path: polygon(0 500px, 0 0, 100% 0, 100% 100%);
    }
  }
}
</style>