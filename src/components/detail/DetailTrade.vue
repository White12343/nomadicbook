<template>
  <aside class="detail-trade">
    <header class="detail-trade__header">
      <h3 class="detail-trade__tit">

        <v-icon>mdi-handshake</v-icon>
        交換方式
      </h3>
    </header>
    <div class="detail-trade__cntr">
      <ul class="detail-trade__list">
        <li class="detail-trade__item" v-if="bookDesc.storeAddress">
          <v-icon>mdi-check-bold</v-icon>
          7-11
        </li>
        <li class="detail-trade__item" v-if="bookDesc.homeAddress">
          <v-icon>mdi-check-bold</v-icon>
          宅配 ( 郵寄、黑貓 )
        </li>
        <li class="detail-trade__item" v-if="bookDesc.mailBoxAddress">
          <v-icon>mdi-check-bold</v-icon>
          i郵箱
        </li>
        <li class="detail-trade__item" v-if="bookDesc.faceTradeArea">
          <v-icon>mdi-check-bold</v-icon>
          面交
        </li>
      </ul>
      <div class="detail-trade__btn-group">
        <v-btn
          color="primary"
          block
          @click.stop="openPopup"
          v-if="popupOpen"
          :disabled="isSelf"
        >
          我要交換
        </v-btn>
        <v-btn
          color="primary"
          block
          @click.prevent="requestExchange"
          v-else
          :disabled="isSelf"
        >
          交換
        </v-btn>
        <!-- <a href="#" class="detail-trade__btn detail-trade__btn--light">聊聊</a> -->
      </div>
    </div>
    <v-dialog
      v-model="dialog"
      max-width="350"
    >
      <v-card>
        <v-card-title class="text-h5">
          我要交換
        </v-card-title>

        <v-card-text>
          <v-radio-group v-model="tradeMode">
            <v-radio
              v-if="bookDesc.storeAddress"
              label="7-11"
              :value="1"
            ></v-radio>
            <v-radio
              v-if="bookDesc.homeAddress"
              label="宅配 ( 郵寄、黑貓 )"
              :value="2"
            ></v-radio>
            <v-radio
              v-if="bookDesc.mailBoxAddress"
              label="i郵箱"
              :value="3"
            ></v-radio>
            <v-radio
              v-if="bookDesc.faceTradeArea"
              label="面交"
              :value="4"
            ></v-radio>
          </v-radio-group>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            outlined
            @click="dialog = false"
          >
            取消
          </v-btn>

          <v-btn
            color="primary"
            @click.prevent="seek"
          >
            交換
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </aside>

</template>

<script>
import { seekNew, chosen } from "@/request/api";
import Popup from '@/components/ui/Popup';
import Btn from '@/components/ui/Btn';
export default {
  name: 'DetailTrade',
  inject: ['reload'],
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
      dialog: false,
      isOpenPopup: false,
      tradeMode: 0,
      isSelf: true,
    }
  },
  created() {
  },
  updated() {
    if($cookies.get('isLogin') && $cookies.get('isLogin') === '1'){
      if(this.$cookies.get('user').id == this.bookDesc.userId){
        this.isSelf = true;
      }else {
        this.checkChosen();
      }

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
      this.dialog = true;
    },
    // 提出交換
    seek() {
      this.dialog = false;
      const seekData = {
        SeekUserId: parseInt(this.$cookies.get('user').id),
        SeekBookId: this.bookId,
        Trademode: this.tradeMode,
        SeekToAddress: this.getAddress.address,
        SeekToName: this.getAddress.name,
        SeekedUserId: this.bookDesc.userId,
      }
      seekNew(seekData)
        .then(res => {
          console.log(res);
          this.reload();
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 直接交換 for 交易請求
    requestExchange() {
      this.$emit('exchange', this.bookDesc.bookId)
    },
    checkChosen() {
      chosen({
        userId: this.$cookies.get('user').id,
        bookId: this.bookId
      })
        .then(res => {
          this.isSelf = res.data;
        })
        .catch(error => {
          console.log(error);
        })
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
