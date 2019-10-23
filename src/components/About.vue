<template>
  <div class="about">
    <div class="about__content">
      {{about.content}}
    </div>
    <div class="about__social">
      <a v-for="url in socialUrls" :href="url">BEN</a>
    </div>
    <a href="mailto:ben@benbenben.zone" class="about__mail">
      <img src="../assets/mail.svg">
    </a>
  </div>
</template>

<script>
import Api from '../api'

export default {
  name: 'About',
  props: {
  },
  data () {
    return {
      about: {
      },
      socialUrls: [
        'https://www.instagram.com/notha_nk_youok/',
        'https://www.instagram.com/benyo.sh/',
        'https://www.instagram.com/benbenbenzone/'
      ]
    }
  },
  components: {

  },
  mounted () {
    arrayShuffle(this.socialUrls)
    console.log(this.socialUrls)
    Api.getAbout().then((about) => {
      this.about = about
    })
  }
}

const arrayShuffle = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.about {
  font-family: $caslon;
  &__content {
    padding-top: 2rem;
    margin:0 auto;
    max-width: 80%;
    font-size: 1.85rem;
    line-height: 2.5rem;
  }

  &__social {
    padding-top:4rem;
    margin:0 auto;
    max-width: 80%;
    font-size: 3.5rem;
    margin-bottom: 3rem;
    a {
      text-decoration: none;
      color: white;
      padding-right:0.55rem;
    }
    a:hover {
      text-decoration: underline;
    }
  }

  &__mail {
    display:block;
    margin:0 auto;
    max-width: 80%;
    padding-bottom:1rem;
    img {
      width: 10rem;
      display: block;
    }
  }

  &__mail:hover {
    cursor: pointer;
    img {
      padding:5px;
      border: 3px solid white;
    }
  }

  @media screen and (max-width: $small-screen-size) {
    &__content {
      font-size: 1.45rem;
      line-height: 2.15rem;
    }

    &__social {
      padding-top: 2rem;
      font-size: 2rem;
    }
  }
}
</style>
