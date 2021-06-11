<template>
  <article class="ask-card">
    <BookCard :card-data="bookData"/>
  </article>

</template>

<script>
import BookCard from '../../book/BookCard';
export default {
  components: {
    BookCard,
  },
  props: ['askData'],
  computed: {
    bookData() {
      return {
        id: this.askData.SeekedBookId,
        name: this.askData.SeekedBookName,
        imgUrl: this.askData.SeekedBookPhoto,
      }
    }
  }
}
</script>

<style lang="stylus">
.ask-card
  min-width 20%
  background-color $light
  &__btn
    border 2px solid $bg-dark
    color $headline-dark
    padding 3px
    border-radius 5px


</style>
