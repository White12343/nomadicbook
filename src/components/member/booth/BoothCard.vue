<template>
  <article class="booth-card">
    <BookCard :card-data="BoothData"/>
    <div class="booth-card__btns">
      <a href="#" class="booth-card__btn" @click.prevent>下架</a>
      <router-link class="booth-card__btn"
        :to="{ path: '/uploadpd', query: {id: BoothData.id}}"
      >編輯</router-link>
    </div>
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
  &__btns
    display flex
    justify-content space-around
  &__btn
    width 35%
    margin-bottom 1em
    display block
    border 2px solid $bg-dark
    text-align center
    padding 3px 0
    border-radius 5px
    background-color $light
    color $headline-dark
    transition all .3s


</style>
