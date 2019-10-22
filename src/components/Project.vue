<template>
  <div class="project" :style="{ pointerEvents: isSafari ? 'none' : 'auto' }">
    <div class="project__client-type" :class="[ position === 'top' ? 'project__client-type--top' : 'project__client-type--bottom' ]">
      <span class="project__client">{{project.client}}</span><br />
      <span class="project__type">{{project.type}}</span>
    </div>
    <div class="project__info-media" :class="{ 'project__info-media--top': position === 'top', 'project__info-media--bottom':  position === 'bottom', 'project__info-media--closed': !open }">
      <div class="project__info" :class="position === 'top' ? 'project__info--top' : 'project__info--bottom'">
        <div class="project__info-toggle" v-on:click="toggleInfoDescription" :class="{ 'project__info-toggle--top': onTop, 'project__info-toggle--bottom': onBottom }">
          + INFO
        </div>
        <div class="project__info-description" :class="{ 'project__info-description--open': infoOpen, 'project__info-description--top': onTop, 'project__info-description--bottom': onBottom }" ref="infoDescription">
          {{project.description}}
        </div>
      </div>
      <div class="project__media" :style="{ transform: getMediaTransform(), transitionDelay: projectInfoOpen ? '0' : '0.3s' }">
        <carousel v-slot:default="slotProps" :num-slides="mediaUrls.length" :autoPlay="isSafari">
          <slide v-for="(url, index) in mediaUrls" :key="url" :order="slotProps.getOrder(index)">
            <div class="project__media-image-container" :class="position === 'top' ? 'project__media-image-container--top' : 'project__media-image-container--bottom'">
              <img class="project__media-image" v-lazy="url" />
            </div>
          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../api/config'
import Carousel from './carousel/Carousel'
import Slide from './carousel/Slide'

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
    Slide,
    Carousel
  },
  computed: {
    mediaUrls () {
      if (this.project.media) {
        const computed = this.project.media.map((mediaObj) => {
          return config.API_URL + mediaObj.media.url
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
    }
  },
  methods: {
    toggleInfoDescription () {
      this.infoOpen = !this.infoOpen
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

    padding: 1.5rem;

    font-family: $caslon;
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
    font-family: $stratos;

    &--top {
      order: 0;
      margin-bottom: 1rem;
    }

    &--bottom {
      order: 1;
      margin-top: 1rem;
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
  }

  &__media {
    flex: 1;

    transition: transform 0.3s $ease-in-quad;
  }

  &__media-image-container {
    display: flex;
    flex-direction: column;

    height: 100%;

    &--top {
      justify-content: flex-start;

    }

    &--bottom {
      justify-content: flex-end;
    }
  }

  &__media-image {
    width: 100%;

    transition: all 0.3s;

    -webkit-user-drag: none;
  }
}
</style>
