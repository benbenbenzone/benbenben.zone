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
// TODO: Font sizes/line heights should be in relation to other font sizes/line heights on site
.about {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;

  box-sizing: border-box;
  min-height: 100%;
  padding: 0 10% 0 10%;

  font-family: $orpheus;

  &__content {
    margin-bottom: 3rem;

    font-size: 1.85rem;
    line-height: 2.5rem;

    @media screen and (max-width: $small-screen-size) {
      font-size: 1.45rem;
      line-height: 2.15rem;
    }
  }

  &__social {
    margin-bottom: 3rem;

    font-family: $stratos;
    font-size: 3.5rem;

    a {
      padding-right:0.55rem;

      text-decoration: none;

      color: white;
    }

    a:hover {
      text-decoration: underline;
    }

    @media screen and (max-width: $small-screen-size) {
      font-size: 2rem;
    }
  }

  &__mail {
    display: block;

    img {
      display: block;

      width: 10rem;
    }

    &:hover {
      cursor: pointer;
      img {
        padding: 5px;

        border: 3px solid white;
      }
    }
  }
}
</style>
