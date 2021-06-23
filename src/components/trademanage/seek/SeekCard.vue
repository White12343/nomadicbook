<template>
  <article class="seek-card">
    <BookCard :card-data="bookData"/>
    <v-btn
      block
      outlined
      class="seek-card__btn"
      :to="{
        name: 'Detail',
        params: {
          id: bookData.bookId,
        }
      }"
    >
      產品細節
    </v-btn>
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
        conditionNum: this.seekData.conditionNum,
        condition: this.seekData.condition,
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="stylus">
.seek-card
  min-height 100%
</style>
