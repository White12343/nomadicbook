<template>
  <article class="booth-card">
    <BookCard :card-data="BoothData"/>
    <router-link class="booth-card__btn mx-auto"
      :to="{ path: '/uploadpd', query: {id: BoothData.id}}"
    >編輯</router-link>
  </article>
</template>

<script>
import BookCard from '@/components/book/BookCard';
export default {
  name: 'BoothCard',
  props: [
    'BoothData'
  ],
  components: {
    BookCard,
  },
  computed: {
  },

}
</script>

<style lang="stylus">
.booth-card
  background-color $light
  &__btn
    width 50%
    margin-top 12px
    display block
    border 2px solid $bg-dark
    text-align center
    padding 3px 0
    border-radius 5px
    background-color $light
    color $headline-dark
    transition all .3s


</style>
