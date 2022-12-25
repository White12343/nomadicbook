<template>
  <section class="ask-stall">
    <div class="ask-stall__cntr">
      <div class="ask-stall__list">
        <a href="#" class="ask-stall__item"
          v-for="(item, index) in pdData"
          :key="index"
          @click.prevent="bookDetail(item.bookId)"
        >
          {{ item.bookName }}
        </a>
      </div>
      <div class="ask-stall__detail ask-detail">
        <div class="ask-detail__info">
          <BookPic class="ask-detail__pic mx-auto" :book-photo="pdDetail.bookPhotos" :book-name="pdDetail.bookName"/>
          <div class="ask-detail__desc">
            <BookInfo
              class="ask-detail__book-info"
              :bookDesc="pdDetail"
              :popupOpen="false"
            />
            <DetailTrade
              :book-id="parseInt(pdDetail.bookId)"
              :bookDesc="pdDetail"
              :popupOpen="false"
              class="ask-detail__trade"
              @exchange="requestExchange"
            />
          </div>
        </div>
        <div class="ask-detail__cntr">
          <BookCntr class="ask-detail__cntr-item" cntr-title="簡介" :cntr="pdDetail.introduction" />
          <BookCntr class="ask-detail__cntr-item" cntr-title="書況" :cntr="pdDetail.condition" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getBookDetail, getAskBoothBookList, selectedBook } from "@/request/api";
import BookPic from '@/components/detail/BookPic';
import BookInfo from '@/components/detail/BookInfo';
import BookCntr from '@/components/detail/BookCntr';
import DetailTrade from '@/components/detail/DetailTrade';
export default {
  name: 'AskList',
  inject: ['reload'],
  props: ['seekUserId', 'seekId'],
  data() {
    return {
      pdData: [],
      pdDetail: {

      },
    }
  },
  created() {
    let vm = this;
    getAskBoothBookList(this.seekUserId, 4)
      .then(res => {
        vm.pdData = res.data;
        vm.bookDetail(vm.pdData[0].bookId)
      })
      .catch(error => {
        console.log(error);
      })
  },
  methods: {
    bookDetail(id) {
      let vm = this;
      getBookDetail(id)
        .then(res => {
          vm.pdDetail = res.data;
        })
        .catch(error => {
          console.log(error);
        })
    },
    requestExchange(id) {
      const exchangeData = JSON.stringify({
        bookId: id,
        tradeMode: 4
      })
      selectedBook(this.seekId, exchangeData)
        .then(res => {
          this.reload();
        })
        .catch(error => {
          console.log(error);
        })
    }
  },
  components: {
    BookPic,
    BookInfo,
    BookCntr,
    DetailTrade,
  }

}
</script>

<style lang="stylus">
</style>
