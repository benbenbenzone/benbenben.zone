<template>
  <div class="projects" v-closable="{ exclude: [], handler: 'resetProjects'}">
    <div v-for="(project, index) in projects" :key="project.id" v-on:click="openProject(index)" class="project-outer"
      :class="[(index + 1) % 2 === 0 ? 'project-outer--bottom' : 'project-outer--top', selectedProject === index ? 'project-outer--open' : 'project-outer--close']" :style="projectDynamicStyles(index).outer">
      <div class="project-inner" :class="[(index + 1) % 2 === 0 ? 'project-inner--bottom' : 'project-inner--top', selectedProject === index ? 'project-inner--open' : 'project-inner--close']" :style="projectDynamicStyles(index).inner">
        <Project :project="project" :position="(index + 1) % 2 == 0 ? 'bottom' : 'top'" :open="selectedProject === index" :clickable="clickableProject === index" v-on:project-info-opened="updateOpenProjectHeight" v-on:project-collapse-click="resetProjects"/>
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
      selectedProject: -1,
      clickableProject: -1,
      openProjectHeight: 0
    }
  },
  mounted () {
    Api.getProjects().then((projects) => {
      this.projects = projects
    })
  },
  computed () {

  },
  methods: {
    openProject (projectIdx) {
      this.selectedProject = projectIdx
    },
    resetProjects () {
      this.selectedProject = -1
    },
    updateOpenProjectHeight (openProjectHeight) {
      this.openProjectHeight = openProjectHeight
    },
    projectDynamicStyles (projectIndex) {
      // These should match sass variables below
      const defaultContentHeight = 500
      const triangleHeight = 300
      const borderWidth = 3

      // const defaultTotalHeight = defaultContentHeight + triangleHeight - borderWidth
      if (this.selectedProject === projectIndex && this.openProjectHeight > defaultContentHeight) {
        const innerClipPath = `polygon(0 ${this.openProjectHeight - borderWidth}px, 0 0, 100% 0, 100% 100%)`
        const outerClipPath = `polygon(0 ${this.openProjectHeight}px, 0 0, 100% 0, 100% 100%)`
        
        const style = {
          outer: {
            height: `${this.openProjectHeight + triangleHeight}px`,
          },
          inner: {
            height: `${this.openProjectHeight + triangleHeight - borderWidth}px`,
          }
        }

        if ((projectIndex + 1) % 2 !== 0) {
          style.inner.clipPath = innerClipPath
          style.outer.clipPath = outerClipPath
        }

        return style
      } else {
        return {
          outer: {},
          inner: {}
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$triangle-height: 300px;
$content-height: 500px;
$border-width: 3px;
$z-index-project-bottom: 1;
$z-index-project-top: 2;

.project-inner {
  position: relative;

  transition: all 0.3s;

  background: $black;

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

  overflow: hidden;

  transition: all 0.3s;

  background: $white;

  &--close {
    height: $triangle-height;
  }

  &--open {
    height: $content-height + $triangle-height;
  }

  &--top {
    z-index: $z-index-project-top;

    &.project-outer--close {
      clip-path: polygon(0 $border-width, 0 0, 100% 0, 100% 100%);
    }

    &.project-outer--open {
      clip-path: polygon(0 $content-height, 0 0, 100% 0, 100% 100%);
    }
  }

  &--bottom {
    z-index:  $z-index-project-bottom;

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
