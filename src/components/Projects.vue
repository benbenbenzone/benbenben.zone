<template>
  <div class="projects" v-closable="{ exclude: [], handler: 'resetProjects'}">
    <div v-for="(project, index) in projects" v-bind:key="project.id" v-on:click="openProject(index)" class="project-outer"
      v-bind:class="[(index + 1) % 2 === 0 ? 'project-outer--bottom' : 'project-outer--top', selectedProject === index ? 'project-outer--open' : 'project-outer--close']"
      v-bind:style="{ zIndex: projects.length - index }">
      <div class="project-inner" v-bind:class="[(index + 1) % 2 === 0 ? 'project-inner--bottom' : 'project-inner--top', selectedProject === index ? 'project-inner--open' : 'project-inner--close']">
        <Project v-bind:project="project" v-bind:position="(index + 1) % 2 == 0 ? 'bottom' : 'top'" v-bind:open="selectedProject === index"/>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../api'
import Project from './Project'

export default {
  name: 'Projects',
  components: {
    Project
  },
  data () {
    return {
      projects: [],
      selectedProject: -1
    }
  },
  mounted () {
    Api.getProjects().then((projects) => {
      this.projects = projects
    })
  },
  methods: {
    openProject (projectIdx) {
      this.selectedProject = projectIdx
    },
    resetProjects () {
      this.selectedProject = -1
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$triangle-height: 300px;
$content-height: 500px;
$border-width: 3px;

.project-inner {
  position: relative;

  background: $black;

  transition: all 0.3s;

  &--close {
    height: $triangle-height - $border-width;
  }

  &--open {
    height: $triangle-height + $content-height - $border-width;
  } 

  &--top {
    &.project-inner--close {
      clip-path: polygon(0 0, 0 0, 100% 0, 100% 100%);
    }
    
    &.project-inner--open {
      clip-path: polygon(0 $content-height - $border-width, 0 0, 100% 0, 100% 100%);
    }
  }
}

.project-outer {
  position: relative;

  background: $white;

  transition: all 0.3s;

  &--close {
    height: $triangle-height;
  }

  &--open {
    height: $content-height + $triangle-height;
  }

  &--top {
    &.project-outer--close {
      clip-path: polygon(0 $border-width, 0 0, 100% 0, 100% 100%);
    }

    &.project-outer--open {
      clip-path: polygon(0 $content-height, 0 0, 100% 0, 100% 100%);
    }
  }

  &--bottom {
    margin-top: -$triangle-height;

    &.project-outer--close {
      clip-path: polygon(0 100%, 0 0, 100% 100%, 100% 100%);
    }

    &.project-outer--open {
      clip-path: polygon(0 100%, 0 0, 100% $triangle-height, 100% 100%);
    }
  }
}
</style>