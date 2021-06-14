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
        <Btn
          desc="我要交換"
          btnStyle="dark"
          class="book-info__trade-btn"
          @click.native.stop="openPopup"
        />
        <Popup :visible="isOpenPopup" @hide="isOpenPopup = false">
          <!-- 自定義內容  -->
        </Popup>
      </BookInfo>
    </div>
    <div class="detail__cntr">
      <BookCntr class="detail__desc" cntr-title="簡介" :cntr="bookDesc.Introduction" />
      <BookCntr class="detail__desc" cntr-title="書況" :cntr="bookDesc.Condition" />
    </div>
  </section>
</template>

<script>
import { getBookDetail } from "@/request/api";
import BookPic from '@/components/detail/BookPic';
import BookInfo from '@/components/detail/BookInfo';
import BookCntr from '@/components/detail/BookCntr';
import Popup from '@/components/ui/Popup';
import Btn from '@/components/ui/Btn';


export default {
  namd: 'Detail',
  data() {
    return {
      bookDesc: {},
      isOpenPopup: false,
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
  methods: {
    checkLogin() {
      if(!$cookies.get('isLogin') || $cookies.get('isLogin') === '0'){
        alert('請先登入');
        this.$router.push('/login/signin');
      }
    },
    openPopup() {
      this.checkLogin();
      this.isOpenPopup = true;
    }
  },
  components: {
    BookPic,
    BookInfo,
    BookCntr,
    Btn,
    Popup,
  }
}
</script>

<style lang="stylus" scoped>
.detail
  &__info
    display flex
    background-color $light
    box-shadow 0 0 5px $gray
  &__pic
    width 40%
  &__cntr
    background-color $light
    padding 1em
    margin-top 1em
    box-shadow 0 0 5px $gray
  &__desc
    margin-bottom 2em
.tarde-form
  padding 1em
</style>
