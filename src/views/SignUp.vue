<template>
  <div class="signup mx-auto">
    <h2 class="signup__tit">註冊</h2>
    <form class="signup__form">
      <input type="text" class="signup__mail" placeholder="Mail" v-model.lazy="mail" autocomplete>
      <p class="check__mail" v-if="!verificationMailResult">請輸入正確 mail 格式</p>
      <input type="password" class="signup__password" placeholder="密碼" v-model.lazy="password" autocomplete>
      <p class="check__password" v-if="!verificationPasswordResult">密碼至少 8 個字符，至少 1 個字母和 1 個數字，且不得超出 18 個字符</p>
      <input type="password" class="signup__password" placeholder="確認密碼" v-model.lazy="passwordCheck" autocomplete>
      <p class="check__password" v-if="!isPasswordCheck">請輸入相同密碼</p>
      <input type="submit" class="signup__btn" value="註冊" @click="signUp">
      <h4 class="signup__signin-link fs-6 text-center">已經有帳號？<router-link class="signin__link" to="/signin">登入</router-link></h4>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      mail: '',
      password: '',
      passwordCheck: '',
      verificationMailResult: true,
      verificationPasswordResult: true,
      isPasswordCheck: true,
    }
  },
  watch: {
    mail(newValue) {
      this.testEmail(newValue);
    },
    password(newValue) {
      this.testPassword(newValue);
    },
    passwordCheck(newValue) {
      this.checkPassword(newValue);
    }
  },
  methods: {
    signUp() {
      if(this.mail === '' || this.password === '' || this.passwordCheck === ''){
        this.testEmail(this.mail);
        this.testPassword(this.password);
        this.checkPassword(this.passwordCheck)
        return;
      }

      if(!this.verificationMailResult || !this.verificationPasswordResult || !this.isPasswordCheck){
        return;
      }
      console.log('註冊');
    },
    testEmail(newValue) {
      this.verificationMailResult = /^([\w\.\-]){1,64}\@([\w\.\-]){1,64}$/.test(newValue);
    },
    testPassword(newValue) {
      // 至少八個字符，至少一個字母和一個數字
      this.verificationPasswordResult = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,18}$/.test(newValue);
    },
    checkPassword(newValue) {
      this.isPasswordCheck = (newValue === this.password);
    }
  }
}
</script>

<style lang="stylus" scoped>

.signup
  width 300px
  padding 1em
  border 2px solid $dark
  margin-top 60px

  &__mail, &__password, &__btn
    display block
    width 100%
    padding 6px
    border-radius 3px
    border 2px solid $dark
    margin-top 1em

  &__btn
    box-shadow 2px 2px 5px $gray

    &:active
      box-shadow 0px 0px 5px $gray

  &__signin-link
    color $paragraph-dark
    margin-top 1em


.check
  &__mail, &__password
    color $danger
    margin 0
    font-size $font-sizes-xs
</style>
