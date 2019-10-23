<template>
  <div class="project" :style="{ pointerEvents: isSafari ? 'none' : 'auto', cursor: open ? 'auto' : 'pointer' }">
    <div :class="generateClasses('project__client-type')">
      <span class="project__client">{{project.client}}</span><br />
      <span class="project__type">{{project.type}}</span>
    </div>
    <a v-if="project.link" :href="project.link" target="_blank" :class="generateClasses('project__link')">
      VISIT
    </a>
    <div :class="generateClasses('project__info-media')">
      <div :class="generateClasses('project__info')">
        <div :class="generateClasses('project__info-toggle')" v-on:click="toggleInfoDescription">
          + INFO
        </div>
        <div :class="Object.assign(generateClasses('project__info-description'), { 'project__info-description--open': infoOpen })" ref="infoDescription">
          <div v-html="description"></div>
          <br />
          <div class="project__info-role">ROLE: {{roles}}</div>
        </div>
      </div>
      <div :class="generateClasses('project__media')" :style="{ transform: getMediaTransform(), transitionDelay: infoOpen ? '0s' : '0.3s' }">
        <swiper :options="getSwiperOptions()" ref="mediaSlider">
          <swiper-slide v-for="url in mediaUrls" :key="url">
            <!-- <div class="project__media-image-container" :class="position === 'top' ? 'project__media-image-container--top' : 'project__media-image-container--bottom'"> -->
              <img class="project__media-image" v-lazy="url" />
            <!-- </div> -->
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../api/config'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import MarkdownIt from 'markdown-it'

export default {
  name: 'Project',
  data () {
    return {
      infoOpen: false
    }
  },
  props: {
    position: String,
    project: Object,
    open: Boolean,
    clickable: Boolean
  },
  components: {
    swiper,
    swiperSlide
  },
  mounted () {
    console.log(this.$refs.infoDescription)
  },
  computed: {
    mediaUrls () {
      if (this.project.media) {
        const computed = this.project.media.map((mediaObj) => {
          if (mediaObj.media) {
            const splitUrl = mediaObj.media.url.split('/upload/');
            const resizedUrl = splitUrl[0] + '/upload' + config.cloudinaryTransformation + splitUrl[1]
            return resizedUrl
          } else {
            return ''
          }
        })

        return computed
      }

      return []
    },
    isSafari () {
      return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    },
    onTop () {
      return this.position === 'top'
    },
    onBottom () {
      return this.position === 'bottom'
    },
    description () {
      if (this.project.description) {
        const md = new MarkdownIt()
        return md.render(this.project.description)
      }

      return ''
    },
    roles () {
      let currentRoles = ''
      if (this.project.role) {
        currentRoles = Object.entries(this.project.role).filter(([role, active]) => { return active === true }).map(([role, active]) => {
          return role
        }).join(', ')
      }

      return currentRoles
    },
    mediaTransform () {
      if (!this.infoOpen && this.$refs.infoDescription) {
        if (this.position === 'top') {
          return `translateY(-${this.$refs.infoDescription.clientHeight}px)`
        } else {
          return `translateY(${this.$refs.infoDescription.clientHeight}px)`
        }
      } else {
        return 'translateY(0)'
      }
    }
  },
  watch: {
    open (newVal, oldVal) {
      this.infoOpen = false
      if (newVal === true) {
        this.$refs.mediaSlider.swiper.update()
      }
    },
    project () {
      if (this.$refs.infoDescription) {
        console.log(this.$refs.infoDescription)
      } else {
        console.log('helloooo')
      }
    }
  },
  methods: {
    toggleInfoDescription () {
      if (this.open) {
        this.infoOpen = !this.infoOpen
      }
    },
    getMediaTransform () {
      if (!this.infoOpen && this.$refs.infoDescription) {
        if (this.position === 'top') {
          return `translateY(-${this.$refs.infoDescription.clientHeight}px)`
        } else {
          return `translateY(${this.$refs.infoDescription.clientHeight}px)`
        }
      } else {
        return 'translateY(0)'
      }
    },
    getSwiperOptions () {
      return {
        slidesPerView: 'auto',
        centeredSlides: true,
        autoplay: this.isSafari,
        freeMode: !this.isSafari,
        freeModeSticky: true,
        mousewheel: true,
        spaceBetween: 30
      }
    },
    generateClasses (baseClass) {
      const classes = {}
      classes[baseClass] = true
      classes[baseClass + '--open'] = this.open
      classes[baseClass + '--closed'] = !this.open
      classes[baseClass + '--top'] = this.onTop
      classes[baseClass + '--bottom'] = this.onBottom

      return classes
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.project__media {
  &--top {
    .swiper-wrapper {
      align-items: flex-start;
    }
  }

  &--bottom {
    .swiper-wrapper {
      align-items: flex-end;
    }
  }

  .swiper-slide {
    width: auto;
    max-width: 100%;
  }
}
.project__info-description {
  line-height: 1.5;

  a {
    text-decoration: underline;

    color: $white;

    font-weight: bold;
  }
}
</style>
<style scoped lang="scss">
.project {
  &__client-type {
    position: absolute;

    width: 100%;

    font-size: 1.5rem;
    line-height: 1.25;

    $margin: 1.5rem;

    &--top {
      top: 0;
      right: 0;

      padding: $margin $margin 0 0;

      text-align: right;
    }

    &--bottom {
      bottom: 0;
      left: 0;

      padding: 0 0 $margin $margin;

      text-align: left;
    }
  }

  &__client {
    text-transform: uppercase;
  }

  &__type {
    text-transform: lowercase;
  }

  &__link {
    z-index: 5;
    position: absolute;
    color: $white;
    font-size: 1.5rem;
    font-style: italic;

    &--top {
      bottom: 3rem;
      right: 1.5rem;
    }

    &--bottom {
      top: 3rem;
      left: 1.5rem;
    }
  }

  &__info-media {
    position: absolute;

    display: flex;
    flex-direction: column;

    width: 100%;
    height: 50%;

    transition: filter 0.3s;

    filter: brightness(1);

    &--closed {
      filter: brightness(0.25);
    }

    &--top {
      top: 6rem;

      justify-content: flex-start;
    }

    &--bottom {
      bottom: 6rem;

      justify-content: flex-end;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    padding: 1.5rem;

    font-family: $orpheus;
    // letter-spacing: 0.75px
    font-size: 1.2rem;
    line-height: 1.25;

    &--top {
      order: 0;
    }

    &--bottom {
      order: 1;
    }
  }

  &__info-toggle {
    pointer-events: auto;
    cursor: pointer;

    font-family: $stratos;

    transition: opacity 0.3s $ease-in-quad;

    &--top {
      order: 0;

      margin-bottom: 1rem;
      text-align: right;
    }

    &--bottom {
      order: 1;

      margin-top: 1rem;
    }

    &--open {
      opacity: 1;
    }

    &--closed {
      opacity: 0;
    }
  }

  &__info-description {
    transition: opacity 0.3s $ease-in-quad;

    opacity: 0;

    &--top {
      order: 1;
    }

    &--bottom {
      order: 0;
    }
    
    &--open {
      transition: opacity 0.3s 0.3s $ease-in-quad;

      opacity: 1;
    }
    
    a {
      color: $white;
    }
  }

  &__info-role {
    text-align: right;
    text-transform: lowercase;

    font-family: $stratos;
    font-weight: bold;
  }

  &__media {
    flex: 1;

    transition: transform 0.3s $ease-in-quad;
  }

  &__media-image {
    max-height: 300px;
    max-width: 100%;

    transition: all 0.3s;

    -webkit-user-drag: none;
  }
}
</style>
