<template>
  <section class="forget">
    <header class="forget__header">
      <h2 class="forget__tit">忘記密碼</h2>
    </header>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >

      <v-text-field
        v-model="mail"
        :rules="emailRules"
        label="E-mail"
        required
        autocomplete
        validate-on-blur
      ></v-text-field>
      <small class="msg__desc grey--text" v-if="isSent">{{msg}}</small>
      <v-btn
        block
        :disabled="isClick || !valid"
        :loading="isClick"
        color="primary"
        class="my-4"
        @click="sentPassword"
      >
        送出
      </v-btn>
      <h4 class="signup__signin-link fs-6 text-center"><router-link class="signin__link" to="/login/signin">回到登入</router-link></h4>
      <h4 class="signin__signup-link fs-6 text-center">還沒有帳號？<router-link class="signin__link" to="/login/signup">註冊</router-link></h4>

    </v-form>
  </section>
</template>

<script>
import { forgetPassword } from "@/request/api";
export default {
  name: 'ForgetPassword',
  data() {
    return {
      isClick: false,
      valid: true,
      emailRules: [
        v => !!v || '此為必填欄位',
        v => /.+@.+\..+/.test(v) || '請輸入正確格式',
      ],
      isSent: false,
      msg: '',
      mail: '',
    }
  },
  methods: {
    sentPassword() {
      if(!this.$refs.form.validate()){
        return;
      }
      this.isClick = true;
      let mail = JSON.stringify(this.mail);
      forgetPassword(mail)
        .then(res => {
          this.isSent = true;
          this.isClick = false;
          this.msg = res.data;
        })
        .catch(error => {
          console.log(error);
          this.isSent = true;
          this.isClick = false;
          this.msg = '查無此 mail，請再次確認輸入是否正確';
        })
    }
  }
}
</script>

<style>

</style>
