<template>
  <section class="ask-stall">
    <div class="ask-stall__cntr">
      <div class="ask-stall__list">
        <a href="#" class="ask-stall__item"
          v-for="(item, index) in pdData"
          :key="index"
          @click.prevent="getBookDetail(item.id)"
        >
          {{ item.name }}
        </a>
      </div>
      <div class="ask-stall__detail ask-detail">
        <div class="ask-detail__info">
        <BookPic class="ask-detail__pic" :book-photo="pdDetail.BookPhoto" :book-name="pdDetail.BookName"/>
          <BookInfo
            :user-name="pdDetail.UserName"
            :book-name="pdDetail.BookName"
            :book-author="pdDetail.Author"
            :publish-date="pdDetail.PublishDate"
            :publisher="pdDetail.Publisher"
          >
            <a href="#" class="ask-detail__btn" @click.prevent="requestExchange">交換</a>
          </BookInfo>
        </div>
        <div class="ask-detail__cntr">
          <BookCntr cntr-title="簡介" :cntr="pdDetail.Introduction" />
          <BookCntr cntr-title="書況" :cntr="pdDetail.Condition" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BookPic from '@/components/detail/BookPic';
import BookInfo from '@/components/detail/BookInfo';
import BookCntr from '@/components/detail/BookCntr';
export default {
  name: 'AskList',
  props: ['seekUserId'],
  data() {
    return {
      pdData: [],
      pdDetail: {

      },
    }
  },
  created() {
    const path = '/static/json/pd.json';
    let vm = this;
    this.$http.get(path).then(res => {
      vm.pdData = res.data;
      vm.getBookDetail(vm.pdData[0].id)
    })
  },
  methods: {
    getBookDetail(id) {
      console.log("Ask Stall: " + id);
      const path = '/static/json/detail.json';
      let vm = this;
      this.$http.get(path).then(res => {
        vm.pdDetail = res.data[0];
      })
    },
    requestExchange() {
      console.log('test');
    }
  },
  components: {
    BookPic,
    BookInfo,
    BookCntr,
  }

}
</script>

<style lang="stylus">
.ask-stall
  height 100%
  overflow hidden
  &__header
    box-shadow 0 0 3px $gray

  &__cntr
    display flex
    height 100%

  &__list
    width 20%
    height 100%
    overflow-y scroll

  &__item
    display block
    padding 3px
.ask-detail
  width 80%
  overflow-y scroll
  padding 1em
  &__pic
    width 50%

  &__btn
    display block
    width 48%
    border 2px solid $bg-dark
    text-align center
    padding 6px 0
    border-radius 5px
    background-color $bg-dark
    color $headline-light
</style>
