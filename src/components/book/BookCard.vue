<template>
  <article class="card" :id="cardData.bookId">
    <div class="card__cntr">
      <slot></slot>
    </div>
    <header class="card__header">
      <router-link class="card__link" :to="{
          name: 'Detail',
          params: {
            id: cardData.bookId,
          }
        }">
        <h3 class="card__tit">
          {{ cardData.bookName }}
        </h3>
      </router-link>
      <h4 class="card__author" v-if="cardData.author">{{ cardData.author }}</h4>
      <h4 class="card__desc">{{ cardData.conditionNum }} 成新 {{ cardData.condition }}</h4>
    </header>
    <div class="card__link-wrap">
      <router-link class="card__link" :to="{
          name: 'Detail',
          params: {
            id: cardData.bookId,
          }
        }">
        <figure class="card__inner" :style="{'height': photoHeight}">
          <img :src="`http://35.236.167.85/photo/${cardData.bookPhoto}.jpg` || defaultImg" :alt="cardData.name" class="card__img img-resp">
        </figure>
      </router-link>

      <v-overlay
        absolute
        :value="!seekStatus"
      >
        <span class="text-h5">該書已不在架上</span>
      </v-overlay>
    </div>


  </article>

</template>

<script>
export default {
  name: 'BookCard',
  props: ['cardData', 'photoHeight'],
  props: {
    cardData: Object,
    photoHeight: {
      type: String,
      default: '200px',
      require: false,
    },
    seekStatus: {
      type: Boolean,
      default: true,
      require: false,
    }
  },
  data() {
    return {
      rating: 4.5,
      defaultImg: '/static/img/default-image.png',
    }
  },
  computed: {
    imgUrl() {
      return `http://35.236.167.85/photo/${cardData.bookPhoto}.jpg`;
    }
  }
}
</script>

<style lang="stylus">
.card
  display flex
  flex-direction column-reverse
  background-color $light
  &__inner
    height 250px
    overflow hidden
    display flex
    align-items center


  &__img
    display block
    margin-left auto
    margin-right auto
    height 100%

  &__header
    margin-top 1em

  &__tit
    textHiding(2)
    color $text-primary
    font-size 1em
    margin-bottom .6em
    line-height 1.3
    font-weight bold
    height 40px
    &:hover
      text-decoration underline
  &__author
    font-size .9em
    margin-bottom .6em
  &__author
    color $text-secondary
    textHiding(1)

  &__desc
    font-size .9em
    color $text-primary
    min-height 42px
    textHiding(2)

  &__link-wrap

    position relative

</style>
