<template>
  <article class="ask-card">
    <BookCard :card-data="bookData"/>
    <Btn
      desc="查看攤位"
      btnStyle="light"
       class="ask-card__btn mx-auto"
      @click.native.stop="isOpenPopup = true"
    />
    <Popup :visible="isOpenPopup" @hide="isOpenPopup = false">
      <AskStall :seek-user-id="askData.SeekUserId"/>
    </Popup>
  </article>

</template>

<script>
import BookCard from '@/components//book/BookCard';
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
