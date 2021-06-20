<template>
  <article class="book-info">
    <header class="book-info__head">
      <h2 class="book-info__tit">{{ bookDesc.bookName }}</h2>
    </header>
    <div class="book-info__user">
      <a href="#" class="book-info__user-name">{{ bookDesc.userName }}</a>
      <a href="#" class="book-info__stall-btn">查看攤位</a>
    </div>
    <ul class="book-info__list">
      <li class="book-info__list-item">作者：{{ bookDesc.author }}</li>
      <li class="book-info__list-item">出版社：{{ bookDesc.publishingHouse }}</li>
      <li class="book-info__list-item">出版日：{{ bookDesc.publishDate }}</li>
    </ul>
    <div class="book-info__trade">
      <h3 class="book-info__trade-tit fs-6">交易方式：</h3>
      <ul class="book-info__trade__desc">
        <!--
        ## 交易資訊
          1. mailBoxAddress i郵箱
          2. storeAddress 7-11
          3. homeAddress 宅配(郵寄、黑貓..等)
          4. faceTradeArea 面交
        -->
        <li class="book-info__trade__item" v-if="bookDesc.storeAddress">7-11</li>
        <li class="book-info__trade__item" v-if="bookDesc.homeAddress">宅配 ( 郵寄、黑貓 )</li>
        <li class="book-info__trade__item" v-if="bookDesc.mailBoxAddress">i郵箱</li>
        <li class="book-info__trade__item" v-if="bookDesc.faceTradeArea">面交</li>
      </ul>
    </div>
    <div class="book-info__btn-group">
      <!-- <slot></slot> -->
      <Btn
        desc="我要交換"
        btnStyle="dark"
        class="book-info__trade-btn"
        @click.native.stop="openPopup"
        v-if="popupOpen"
      />
      <a href="#" class="book-info__btn book-info__btn--dark" @click.prevent="requestExchange" v-else>交換</a>
      <Popup :visible="isOpenPopup" @hide="isOpenPopup = false" v-if="popupOpen" class="exchange__popup" popupWidth="30%">
        <!-- 自定義內容  -->
        <article class="seek-new">
          <header class="seek-new__header">
            <h2 class="seek-new__tit">提出交換</h2>
          </header>
          <form class="seek-new__form">
            <h3 class="seek-new__form__tit">選擇交易方式：</h3>
            <div class="seek-new__input-group" v-if="bookDesc.storeAddress">
              <input type="radio" class="seek-new__input" id="StoreTrade" v-model="tradeMode" :value="1">
              <label for="StoreTrade">7-11</label>
            </div>
            <div class="seek-new__input-group" v-if="bookDesc.homeAddress">
              <input type="radio" class="seek-new__input" id="Delivery" v-model="tradeMode" :value="2">
              <label for="Delivery">宅配 ( 郵寄、黑貓 )</label>
            </div>
            <div class="seek-new__input-group" v-if="bookDesc.mailBoxAddress">
              <input type="radio" class="seek-new__input" id="MailBoxTrade" v-model="tradeMode" :value="3">
              <label for="MailBoxTrade">i郵箱</label>
            </div>
            <div class="seek-new__input-group" v-if="bookDesc.faceTradeArea">
              <input type="radio" class="seek-new__input" id="FaceTrade" v-model="tradeMode" :value="4">
              <label for="FaceTrade">面交</label>
            </div>
            <div class="seek-new__btn-group text-right">
              <a class="seek-new__btn seek-new__btn--light" href="#" @click.prevent="isOpenPopup = false">取消</a>
              <input class="seek-new__btn" type="submit" value="提出交換" @click.prevent="seek">
            </div>
          </form>
        </article>
      </Popup>
      <a href="#" class="book-info__btn book-info__btn--light">聊聊</a>
    </div>
  </article>
</template>

<script>
import { seekNew } from "@/request/api";
import Popup from '@/components/ui/Popup';
import Btn from '@/components/ui/Btn';

export default {
  name: 'BookInfo',
  props: {
    bookId: Number,
    bookDesc: Object,
    popupOpen: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  data() {
    return {
      isOpenPopup: false,
      tradeMode: 0,
    }
  },
  computed: {
    getAddress() {
      let str = {
        address: null,
        name: null,
      };
      switch(this.tradeMode) {
        // 7-11
        case 1:
          str.address = this.bookDesc.storeAddress;
          str.name = this.bookDesc.storeName;
          break;
        // 宅配 ( 郵寄、黑貓 )
        case 2:
          str.address = this.bookDesc.homeAddress;
          break;
        // i郵箱
        case 3:
          str.address = this.bookDesc.mailBoxAddress;
          str.name = this.bookDesc.mailBoxName;
          break;
        // 面交
        case 4:
          str.address =
            this.bookDesc.faceTradeCity +
            this.bookDesc.faceTradeArea +
            this.bookDesc.faceTradeRoad +
            this.bookDesc.faceTradePath +
            this.bookDesc.faceTradeDetail;
          break;
      }
      return str;
    }
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
    },
    seek() {
      // {
      //   "SeekUserId":"short", // 提出邀請的使用者
      //   "SeekBookId":"int", // 被邀請的使用者的書本 id ok
      //   "Trademode":"int", // 交易方式 1~5 ok
      //   "SeekToAddress":"string", // 邀約者要去(寄)的地址
      //   "SeekToName":"string", // 邀約者要去(寄)的地方名稱
      //   "SeekedUserId":"short" // 被邀請的使用者 ok
      // }
      const seekData = JSON.stringify({
        SeekUserId: parseInt(this.$cookies.get('user').id),
        SeekBookId: this.bookId,
        Trademode: this.tradeMode,
        SeekToAddress: this.getAddress.address,
        SeekToName: this.getAddress.name,
        SeekedUserId: this.bookDesc.userId,
      })
      console.log(seekData);
      seekNew(seekData)
        .then(res => {
          this.isOpenPopup = false;
        })
        .catch(error => {
          console.log(error);
        })
    },
    requestExchange() {
      this.$emit('exchange', this.bookDesc.bookId)
    }
  },
  components: {
    Popup,
    Btn,
  }
}
</script>

<style lang="stylus">
.book-info
  margin-left 1em
  flex-grow 1
  padding 1em
  &__user
    display flex
    align-items center
    margin-top 1em
    margin-bottom 1em

  &__user-photo, &__user-name, &__stall-btn
    margin-right 1em

  &__user-name, &__stall-btn
    display block
    color $headline-dark

  &__user-photo
    width 2em

  &__stall-btn
    border 2px solid $bg-dark
    border-radius 3px
    padding 3px 6px

  &__btn-group
    display flex
    justify-content space-between
    margin-top 2em
  &__btn
    display block
    width 48%
    border 2px solid $bg-dark
    text-align center
    padding 3px 0
    border-radius 5px

    &--dark
      background-color $accent
      color $headline-light
    &--light
      background-color $bg-light
      color $headline-dark
  &__trade-btn
    width 48%

.seek-new
  padding 1em
  &__btn
    display inline-block
    padding 6px 1em
    background-color $accent
    color $light
    cursor pointer
    &--light
      background-color $bg-light
      color $headline-dark

</style>
