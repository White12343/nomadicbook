<template>
  <article class="seek-card">
    <BookCard :card-data="bookData"/>
    <div class="seek-card__cntr">
      <router-link
        class="seek-card__btn"
        :to="{
          name: 'Detail',
          params: {
            id: bookData.bookId,
          }
        }">
        產品細節
      </router-link>
    </div>
  </article>

</template>

<script>
import BookCard from '@/components/book/BookCard';

export default {
  props: ['seekData'],
  data() {
    return {
    }
  },
  components: {
    BookCard,
  },
  computed: {
    bookData() {
      return {
        bookId: this.seekData.seekBookId,
        bookName: this.seekData.seekBookName,
        bookPhoto: this.seekData.seekBookPhoto,
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="stylus">
.seek-card
  &__cntr
    padding 0 1em
  &__btn
    display block
    text-align center
    padding .6em 0
    margin 1em 0
    border-radius 3px
    transition all .3s
    background-color $gray
    color $text-secondary

</style>
