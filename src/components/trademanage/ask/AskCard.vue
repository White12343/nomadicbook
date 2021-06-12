<template>
  <article class="ask-card">
    <BookCard :card-data="bookData"/>
    <TradeBtn title="查看攤位" btn-style="light">
      <AskStall :seek-user-id="askData.SeekUserId"/>
    </TradeBtn>
  </article>

</template>

<script>

import TradeBtn from '@/components/detail/TradeBtn';
import BookCard from '@/components//book/BookCard';
import AskStall from '@/components/trademanage/ask/AskStall';
export default {
  components: {
    BookCard,
    TradeBtn,
    AskStall,
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
  },
  methods: {

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
