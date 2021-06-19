<template>
  <section class="detail">
    <div class="detail__info">
      <BookPic class="detail__pic" :book-photo="bookDesc.bookPhotos" :book-name="bookDesc.bookName"/>
      <BookInfo
        :book-id="parseInt(this.$route.params.id)"
        :bookDesc="bookDesc"
      />
    </div>
    <div class="detail__cntr">
      <BookCntr class="detail__desc" cntr-title="簡介" :cntr="bookDesc.introduction" />
      <BookCntr class="detail__desc" cntr-title="書況" :cntr="bookDesc.condition" />
    </div>
  </section>
</template>

<script>
import { getBookDetail } from "@/request/api";
import BookPic from '@/components/detail/BookPic';
import BookInfo from '@/components/detail/BookInfo';
import BookCntr from '@/components/detail/BookCntr';


export default {
  namd: 'Detail',
  data() {
    return {
      bookDesc: {},
      isOpenPopup: false,
    }
  },
  created() {
    // 用 id 去 call api
    let vm = this;
    getBookDetail(this.$route.params.id)
      .then(res => {
        vm.bookDesc = res.data;
      })
      .catch(error => {
        console.log(error);
      })

  },
  methods: {
  },
  components: {
    BookPic,
    BookInfo,
    BookCntr,
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
