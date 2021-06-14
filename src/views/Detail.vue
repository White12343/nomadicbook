<template>
  <section class="detail">
    <div class="detail__info">
      <BookPic class="detail__pic" :book-photo="bookDesc.BookPhoto" :book-name="bookDesc.BookName"/>
      <BookInfo
        :user-name="bookDesc.UserName"
        :book-name="bookDesc.BookName"
        :book-author="bookDesc.Author"
        :publish-date="bookDesc.PublishDate"
        :publisher="bookDesc.Publisher"
      >
        <TradeBtn class="book-info__trade-btn" title="我要交換">
          <form class="tarde-form">
            <h2 class="tarde-form__tit">我要交換</h2>
            <input type="submit" value="送出" class="tarde-form__submit">
          </form>
        </TradeBtn>
      </BookInfo>
    </div>
    <div class="detail__cntr">
      <BookCntr cntr-title="簡介" :cntr="bookDesc.Introduction" />
      <BookCntr cntr-title="書況" :cntr="bookDesc.Condition" />
    </div>
  </section>
</template>

<script>
import { getBookDetail } from "@/request/api";
import BookPic from '../components/detail/BookPic';
import BookInfo from '../components/detail/BookInfo';
import BookCntr from '../components/detail/BookCntr';
import TradeBtn from '../components/detail/TradeBtn';

export default {
  namd: 'Detail',
  data() {
    return {
      bookDesc: {}
    }
  },
  created() {
    console.log(this.$route.params.id);
    // 用 id 去 call api
    let vm = this;
    getBookDetail()
      .then(res => {
        vm.bookDesc = res.data[0];
      })
      .catch(error => {
        console.log(error);
      })

  },
  computed: {

  },
  components: {
    BookPic,
    BookInfo,
    BookCntr,
    TradeBtn,
  }
}
</script>

<style lang="stylus" scoped>
.detail
  &__info
    display flex
  &__pic
    width 40%


</style>
