<template>
  <article class="seek-card">
    <BookCard :card-data="bookData"/>
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
  min-width 20%
  background-color $light


</style>
