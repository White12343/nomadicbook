<template>
  <article class="card" :id="cardData.bookId">
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
    </header>
    <router-link class="card__link" :to="{
        name: 'Detail',
        params: {
          id: cardData.bookId,
        }
      }">
      <figure class="card__inner">
        <img :src="`http://35.236.167.85/photo/${cardData.bookPhoto}.jpg` || defaultImg" :alt="cardData.name" class="card__img img-resp">
      </figure>
    </router-link>
  </article>

</template>

<script>
export default {
  name: 'BookCard',
  props: ['cardData'],
  data() {
    return {
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
    height 180px
    overflow hidden
    display flex
    align-items center


  &__img
    display block
    margin-left auto
    margin-right auto

  &__header
    padding 1em

  &__tit
    textHiding(1)
    color $text-primary
    &:hover
      text-decoration underline
  &__author
    color $text-secondary
</style>
