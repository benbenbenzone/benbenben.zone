<template>
  <div class="about">
    <div class="about__content">
      {{about.content}}
    </div>
    <div class="about__social">
      <a v-for="url in socialUrls" :href="url">Ben</a>
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
    font-size: calc(15px + 1vw);
    line-height: calc(1.1em + 0.5vw);
    text-align: justify;
  }

  &__social {
    padding-top:4rem;
    margin:0 auto;
    max-width: 80%;
    font-size: calc(40px + 1vw);
    margin-bottom: 3rem;
    a {
      text-decoration: none;
      color: white;
      padding-right:0.55rem;
    }
    a:hover {
      // color: red;
      text-decoration: underline;
    }
  }

  &__mail {
    display:block;
    img {
      width: calc(150px + 1vw);
      display: block;
      margin: 0 auto;

    }
  }

  &__mail:hover {
    cursor: pointer;
    img {
      padding:5px;
      border: 3px solid white;
    }
  }
}
</style>
