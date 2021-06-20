<template>
  <article class="ask-card">
    <BookCard :card-data="bookData"/>
    <div class="ask-card__cntr">
      <Btn
        desc="查看攤位"
        btnStyle="light"
        class="ask-card__btn"
        @click.native.stop="isOpenPopup = true"
      />
      <Popup :visible="isOpenPopup" @hide="isOpenPopup = false" popupHeight="70vh">
        <AskStall :seek-user-id="askData.seekUserId" :seek-id="askData.seekId"/>
      </Popup>
    </div>
  </article>

</template>

<script>
import BookCard from '@/components/book/BookCard';
import AskStall from '@/components/trademanage/ask/AskStall';
import Btn from '@/components/ui/Btn';
import Popup from '@/components/ui/Popup';

export default {
  props: ['askData'],
  data() {
    return {
      isOpenPopup: false,
    }
  },
  components: {
    BookCard,
    AskStall,
    Btn,
    Popup,
  },
  computed: {
    bookData() {
      return {
        bookId: this.askData.seekBookId,
        bookName: this.askData.seekBookName,
        bookPhoto: this.askData.seekBookPhoto,
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="stylus">
.ask-card
  &__cntr
    padding 0 1em


</style>
