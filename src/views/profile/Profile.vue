<template>
  <article class="profile">
    <header class="profile__header">
      <h2 class="profile__tit">個人資料</h2>
    </header>
    <v-avatar
      color="grey lighten-2"
      size="160"
      class="d-block my-6"
    >
      <img
        src="https://cdn.vuetifyjs.com/images/john.jpg"
        alt="John"
      >
    </v-avatar>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="name"
        :counter="8"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>


      <h3 class="upload-form__tit mt-6">交易方式</h3>
      <small class="red--text" v-if="this.isOpenTradeMode">請至少選擇一種交易方式</small>
      <!-- <AddressSelect title="店到店" nameId="Store"/> -->
      <AddressSelect title="宅配 ( 郵寄、黑貓 )" nameId="Delivery" :openInput="true" @getVal="getAddress" @isOpenTrade="isDeliveryOpen"/>
      <AddressSelect title="面交" nameId="FaceTrade" :openInput="true" :openRemark="true" @getVal="getTradeAddress" @isOpenTrade="isFaceOpen"/>
      <IMailBoxSelect title="i 郵箱" nameId="MailBox" @getVal="getIMailAddress" @isOpenTrade="isMailBoxOpen"/>
      <div class="d-flex justify-end">
        <v-btn
          :disabled="!valid"
          color="primary"
          @click="updateProfile"
        >
          保存
        </v-btn>
      </div>
    </v-form>
  </article>
</template>

<script>
import { mapState } from "vuex";
import AddressSelect from '@/components/member/uploadpd/form/AddressSelect';
import IMailBoxSelect from '@/components/member/uploadpd/form/IMailBoxSelect';
export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || '此為必填欄位',
      v => (v && v.length <= 8) || '名稱不得超出 8 個字符',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || '請輸入正確格式',
    ],
    tradeModeOpen: {
      delivery: false,
      face: false,
      stroe: false,
      mailBox: false,
    },
    faceTrade: {
      City: '',
      Area: '',
      Road: '',
      Path: '',
      Detail: '',
    },
    homeAddress: '',
    mailBox: {
      Address: '',
      Name: '',
    },
  }),

  methods: {
    updateProfile () {
      if(this.isOpenTradeMode){
        return;
      }
      if(!this.$refs.form.validate()){
        return;
      }
    },
    isDeliveryOpen(val) {
      this.tradeModeOpen.delivery = val;
    },
    isFaceOpen(val) {
      this.tradeModeOpen.face = val;
    },
    isMailBoxOpen(val) {
      this.tradeModeOpen.mailBox = val;
    },
    getTradeAddress(val) {
      this.faceTrade.City = val.city;
      this.faceTrade.Area = val.area;
      this.faceTrade.Road = val.road;
      this.faceTrade.Path = val.path;
      this.faceTrade.Detail = val.detail;
    },
    getAddress(val) {
      this.homeAddress = val.city + val.area + val.road + val.path;
    },
    getIMailAddress(val) {
      console.log(val);
      this.mailBox.Address = val.Address;
      this.mailBox.Name = val.Name;
    },
  },

  components: {
    AddressSelect,
    IMailBoxSelect,
  },

  computed: {
    ...mapState([
      'isLogin',
      'user',
    ]),
    isOpenTradeMode() {
      return !this.tradeModeOpen.stroe &&
        !this.tradeModeOpen.face &&
        !this.tradeModeOpen.mailBox &&
        !this.tradeModeOpen.delivery;
    },
  },
  created() {
    this.name = this.user.nickName;
  }
}
</script>

<style>

</style>
