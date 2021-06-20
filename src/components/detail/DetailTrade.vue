<template>
  <aside class="detail-trade">
    <header class="detail-trade__header">
      <h3 class="detail-trade__tit">交換方式</h3>
    </header>
    <div class="detail-trade__cntr">
      <ul class="detail-trade__list">
        <li class="detail-trade__item" v-if="bookDesc.storeAddress">7-11</li>
        <li class="detail-trade__item" v-if="bookDesc.homeAddress">宅配 ( 郵寄、黑貓 )</li>
        <li class="detail-trade__item" v-if="bookDesc.mailBoxAddress">i郵箱</li>
        <li class="detail-trade__item" v-if="bookDesc.faceTradeArea">面交</li>
      </ul>
      <div class="detail-trade__btn-group">
        <Btn
          desc="我要交換"
          class="detail-trade__btn"
          btnStyle="dark"
          @click.native.stop="openPopup"
          v-if="popupOpen"
        />
        <a
          href="#"
          class="detail-trade__btn detail-trade__btn--dark"
          @click.prevent="requestExchange"
          v-else
        >
          交換
        </a>
        <a href="#" class="detail-trade__btn detail-trade__btn--light">聊聊</a>
      </div>
    </div>
    <Popup :visible="isOpenPopup" @hide="isOpenPopup = false" v-if="popupOpen" class="exchange__popup" popupWidth="30%">
      <article class="seek-new">
        <header class="seek-new__header">
          <h2 class="seek-new__tit fs-4">我要交換</h2>
        </header>
        <form class="seek-new__form">
          <h3 class="seek-new__form__tit">選擇交換方式：</h3>
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
            <a class="seek-new__btn seek-new__btn--dark" href="#" @click.prevent="seek">交換</a>
          </div>
        </form>
      </article>
    </Popup>
  </aside>

</template>

<script>
import { seekNew } from "@/request/api";
import Popup from '@/components/ui/Popup';
import Btn from '@/components/ui/Btn';
export default {
  name: 'DetailTrade',
  props: {
    bookId: Number,
    bookDesc: Object,
    // 是否有 popup
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
    // 整理交易資訊
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
  components: {
    Popup,
    Btn,
  },
  methods: {
    // 按下交換前先檢查
    checkLogin() {
      if(!$cookies.get('isLogin') || $cookies.get('isLogin') === '0'){
        alert('請先登入');
        this.$router.push('/login/signin');
      }
    },
    // 開啟 popup window
    openPopup() {
      this.checkLogin();
      this.isOpenPopup = true;
    },
    // 提出交換
    seek() {
      const seekData = JSON.stringify({
        SeekUserId: parseInt(this.$cookies.get('user').id),
        SeekBookId: this.bookId,
        Trademode: this.tradeMode,
        SeekToAddress: this.getAddress.address,
        SeekToName: this.getAddress.name,
        SeekedUserId: this.bookDesc.userId,
      })
      seekNew(seekData)
        .then(res => {
          console.log(res);
          this.isOpenPopup = false;
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 直接交換 for 交易請求
    requestExchange() {
      this.$emit('exchange', this.bookDesc.bookId)
    }
  }
}
</script>

<style lang="stylus">
.detail-trade
  padding 1em
  height 100%

  &__tit
    margin-bottom 1em

  &__list
    color $text-secondary

  &__item
    margin-top 6px
    margin-bottom 6px

  &__btn-group
    margin-top 1.5em
    border-top 1px solid $shadow

  &__btn
    display block
    text-align center
    padding-top .6em
    padding-bottom .6em
    border-radius 3px
    margin-top 1em
    &--dark
      background-color $accent
      color $light
    &--light
      background-color $gray
      color $text-secondary
.seek-new
  padding 1em
  &__btn
    display inline-block
    padding 6px 1em
    margin-left 6px
    border-radius 3px
    &--light
      background-color $gray
      color $text-secondary
    &--dark
      background-color $accent
      color $light
  &__form
    color $text-secondary
  &__input-group
    margin-top 6px
    margin-bottom 6px
</style>
