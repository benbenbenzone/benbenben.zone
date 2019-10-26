<template>
  <div id="app">
    <div class="projects-section" :class="{ 'projects-section--open': showProjects }">
      <SideBar title="PROJECTS" tabClickEventName="projects-tab-click" v-on:projects-tab-click="toggleProjects" v-closable="{ exclude: [], handler: 'closeProjects'}" position="right">
        <Projects />
      </SideBar>
    </div>
    <div class="about-section" :class="{ 'about-section--open': showAbout }">
      <SideBar title="ABOUT" tabClickEventName="about-tab-click" v-on:about-tab-click="toggleAbout" v-closable="{ exclude: [], handler: 'closeAbout'}" position="left">
        <About />
      </SideBar>
    </div>
    <HomeLogo/>
  </div>
</template>

<script>
import HomeLogo from './components/HomeLogo.vue'
import SideBar from './components/SideBar.vue'
import Projects from './components/Projects'
import About from './components/About'

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
    Projects,
    About
  },
  methods: {
    toggleProjects () {
      if (this.showProjects) {
        this.showProjects = false
      } else {
        this.showProjects = true
        this.showAbout = false
      }
    },
    closeProjects () {
      this.showProjects = false
    },
    toggleAbout () {
      if (this.showAbout) {
        this.showAbout = false
      } else {
        this.showAbout = true
        this.showProjects = false
      }
    },
    closeAbout () {
      this.showAbout = false
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

$mobile-side-section-width: calc(100% - #{$mobile-side-bar-tab-width});
$section-slide-transition-time: 0.8s;
$z-index-section-open: 5;

.projects-section {
  position: absolute;
  top: 0;
  right: -50%;

  width: 50%;
  height: 100%;

  animation: translateZeroFromLeft-easeOutElastic $section-slide-transition-time linear forwards;
  // transition: all 0.5s $ease-in-out-quad;

  @media screen and (max-width: $small-screen-size) {
    width: $mobile-side-section-width;
    right: calc(-1 * #{$mobile-side-section-width});
  }

  &--open {
    z-index: $z-index-section-open;
    // transform: translateX(-100%);
    animation: translateLeft-easeOutElastic $section-slide-transition-time linear forwards;
  }
}

.about-section {
  position: absolute;
  top: 0;
  left: -50%;

  width: 50%;
  height: 100%;
  animation: translateZeroFromRight-easeOutElastic $section-slide-transition-time linear forwards;
  // transition: all 0.5s $ease-in-out-quad;

  @media screen and (max-width: $small-screen-size) {
    width: $mobile-side-section-width;
    left: calc(-1 * #{$mobile-side-section-width});
  }

  &--open {
    z-index: $z-index-section-open;
    animation: translateRight-easeOutElastic $section-slide-transition-time linear forwards;
    // transform: translateX(100%);
  }
}

@keyframes translateLeft-easeOutElastic {
	0% {
		transform: translateX(0%);
	}

	16% {
		transform: translateX(-132.27%);
	}

	28% {
		transform: translateX(-86.88%);
	}

	44% {
		transform: translateX(-104.63%);
	}

	59% {
		transform: translateX(-98.36%);
	}

	73% {
		transform: translateX(-100.58%);
	}

	88% {
		transform: translateX(-99.8%);
	}

	100% {
		transform: translateX(-100%);
	}

}

@keyframes translateZeroFromLeft-easeOutElastic {
  0% {
    z-index: $z-index-section-open;
		transform: translateX(-100%);
	}

	16% {
		transform: translateX(32.27%);
	}

	28% {
		transform: translateX(-13.12%);
	}

	44% {
		transform: translateX(4.63%);
	}

	59% {
		transform: translateX(-1.64%);
	}

	73% {
		transform: translateX(0.58%);
	}

	88% {
		transform: translateX(0.2%);
  }

  99% {
    z-index: $z-index-section-open;
  }

	100% {
    z-index: 0;
    transform: translateX(0%);
	}
}

@keyframes translateZeroFromRight-easeOutElastic {
	0% {
    z-index: $z-index-section-open;
		transform: translateX(100%);
	}

	16% {
		transform: translateX(-32.27%);
	}

	28% {
		transform: translateX(13.12%);
	}

	44% {
		transform: translateX(-4.63%);
	}

	59% {
		transform: translateX(1.64%);
	}

	73% {
		transform: translateX(-0.58%);
	}

	88% {
		transform: translateX(0.2%);
  }
  
  99% {
    z-index: $z-index-section-open;
  }

	100% {
    z-index: 0;
		transform: translateX(0%);
	}

}

@keyframes translateRight-easeOutElastic {
	0% {
		transform: translateX(0%);
	}

	16% {
		transform: translateX(132.27%);
	}

	28% {
		transform: translateX(86.88%);
	}

	44% {
		transform: translateX(104.63%);
	}

	59% {
		transform: translateX(98.36%);
	}

	73% {
		transform: translateX(100.58%);
	}

	88% {
		transform: translateX(99.8%);
	}

	100% {
		transform: translateX(100%);
	}
}
</style>
