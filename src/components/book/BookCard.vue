<template>
  <article class="card" :id="cardData.id">
    <header class="card__header">
      <router-link class="card__link" :to="{
          name: 'Detail',
          params: {
            id: cardData.id,
          }
        }">
        <h3 class="card__tit">
          {{ cardData.name }}
        </h3>
      </router-link>

      <h4 class="card__author" v-if="cardData.author">{{ cardData.author }}</h4>
    </header>
    <router-link class="card__link" :to="{
        name: 'Detail',
        params: {
          id: cardData.id,
        }
      }">
      <figure class="card__inner">
        <img :src="cardData.imgUrl" :alt="cardData.name" class="card__img img-resp">
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
    height 220px

  &__img
    display block
    margin-left auto
    margin-right auto

  &__header
    padding 1em

  &__tit
    textHiding(1)
    color $headline-dark
    &:hover
      text-decoration underline
  &__author
    color $paragraph-dark
</style>
