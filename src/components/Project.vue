<template>
  <div class="project">
    <div class="project__client-type" v-bind:class="[ position === 'top' ? 'project__client-type--top' : 'project__client-type--bottom' ]">
      <span class="project__client">{{project.client}}</span><br />
      <span class="project__type">{{project.type}}</span>
    </div>
    <div class="project__media" v-bind:class="[ position === 'top' ? 'project__media--top' : 'project__media--bottom' ]">
      <carousel v-slot:default="slotProps">
        <slide v-for="(url, index) in mediaUrls" v-bind:key="url" v-bind:orderFunc="slotProps.getOrder" v-bind:idx="index">
          <img class="project__media-image" v-bind:src="url" />
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import config from '../api/config'
import Carousel from './carousel/Carousel'
import Slide from './carousel/Slide'

export default {
  name: 'Project',
  props: {
    position: String,
    project: Object
  },
  components: {
    Slide,
    Carousel
  },
  computed: {
    mediaUrls () {
      const computed = this.project.media.map((mediaObj) => {
        return config.API_URL + mediaObj.url
      })
      
      // console.log('helloo')
      return computed
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.project {
  &__client-type {
    position: absolute;

    font-size: 1.5rem;
    line-height: 1.25;

    $margin: 1.5rem;

    &--top {
      top: $margin;
      right: $margin;

      text-align: right;
    }

    &--bottom {
      bottom: $margin;
      left: $margin;

      text-align: left;
    }
  }

  &__client {
    text-transform: uppercase;
  }

  &__type {
    text-transform: lowercase;
  }

  &__media {
    position: absolute;
    width: 100%;
    height: 50%;
    display: flex;

    &--top {
      top: 8rem;
      align-items: flex-start;
    }

    &--bottom {
      bottom: 8rem;
      align-items: flex-end;
    }
  }

  &__media-image {
    width: 100%;
    -webkit-user-drag: none;
  }
}
</style>