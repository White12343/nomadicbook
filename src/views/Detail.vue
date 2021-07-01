<template>
  <section class="detail">
    <div class="detail__head">
      <div class="detail__info">
        <BookPic class="detail__pic" :book-photo="bookDesc.bookPhotos" :book-name="bookDesc.bookName"/>
        <BookInfo
          :book-id="parseInt(this.$route.params.id)"
          :bookDesc="bookDesc"
          class="detail__info-inner"
        />
      </div>
      <DetailTrade
        :book-id="parseInt(this.$route.params.id)"
        :bookDesc="bookDesc"
        class="detail__trade"
      />
    </div>
    <div class="detail__cntr">
      <BookCntr class="detail__desc" cntr-title="書況" :cntr="bookDesc.condition" />
      <BookCntr class="detail__desc" cntr-title="簡介" :cntr="bookDesc.introduction" />

    </div>

    <div class="detail__cntr">
      <NewBook :no-header="true" :photoHeight="'280px'"/>
    </div>
  </section>
</template>

<script>
import { getBookDetail, checkIsAlreadyAsk } from "@/request/api";
import BookPic from '@/components/detail/BookPic';
import DetailTrade from '@/components/detail/DetailTrade';
import BookInfo from '@/components/detail/BookInfo';
import BookCntr from '@/components/detail/BookCntr';
import NewBook from '@/components/home/NewBook';


export default {
  namd: 'Detail',
  inject: ['reload'],
  data() {
    return {
      bookDesc: {},
      isOpenPopup: false,

      askData: null,
    }
  },
  created() {
    // 用 id 去 call api
    let vm = this;
    getBookDetail(this.$route.params.id)
      .then(res => {
        vm.bookDesc = res.data;
        checkIsAlreadyAsk({
          userId: vm.$cookies.get('user').id,
          stallUserId: vm.bookDesc.userId,
        })
          .then(res => {
            if(res.status === 200){
              this.askData = {
                seekId: res.data.seekId,
                tradeMode: res.data.tradeMode,
              }
            }
          })
          .catch(error => {
            console.log(error);
          })
      })
      .catch(error => {
        console.log(error);
      })



  },
  watch: {
    $route(to) {
      console.log(to);
      this.reload();
    }
  },
  methods: {
  },
  components: {
    BookPic,
    BookInfo,
    BookCntr,
    DetailTrade,
    NewBook,
  }
}
</script>

<style lang="stylus" scoped>
.detail
  &__info, &__trade
    background-color $light
    box-shadow 0 0 5px $gray

  &__head
    display flex

  &__trade
    width 25%
    margin-left 1em

  &__info
    display flex
    width 75%

  &__info-inner
    width 60%
    margin-left 1em

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
