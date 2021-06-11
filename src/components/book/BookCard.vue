<template>
  <article class="card" :id="cardData.id">
    <header class="card__header">
      <h3 class="card__tit">
        <router-link class="card__link" :to="{
            name: 'Detail',
            params: {
              id: cardData.id,
            }
          }">
          {{ cardData.name }}
        </router-link>

      </h3>
      <h4 class="card__author" v-if="cardData.author">{{ cardData.author }}</h4>
    </header>
    <router-link class="card__link" :to="{
        name: 'Detail',
        params: {
          id: cardData.id,
        }
      }">
      <figure class="card__img">
        <img :src="cardData.imgUrl" :alt="cardData.name" class="img-resp">
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
  min-width 20%
  display flex
  flex-direction column-reverse
  margin-top 1em
  background-color $light

</style>
