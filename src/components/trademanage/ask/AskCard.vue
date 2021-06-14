<template>
  <article class="ask-card">
    <BookCard :card-data="bookData"/>
    <TradeBtn title="查看攤位" btn-style="light" class="ask-card__btn mx-auto">
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
    width 50%
    margin-top 12px


</style>
