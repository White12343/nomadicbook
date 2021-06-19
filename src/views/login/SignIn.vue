<template>
  <div class="signin mx-auto">
    <h2 class="signin__tit">登入</h2>

    <form class="signin__form">
      <input id="SignInMail" type="text" class="signin__mail" placeholder="請輸入信箱" v-model.lazy="mail" autocomplete>
      <p class="check__mail" v-if="!verificationMailResult">請輸入正確 mail 格式</p>
      <input type="password" class="signin__password" placeholder="請輸入密碼" v-model.lazy="password" autocomplete>
      <p class="check__password" v-if="!verificationPasswordResult">密碼至少 8 個字符，至少 1 個字母和 1 個數字，且不得超出 18 個字符</p>
      <input type="submit" class="signin__btn" value="登入" @click.prevent="signIn">
      <h4 class="signin__signup-link fs-6 text-center">還沒有帳號？<router-link class="signin__link" to="/login/signup">註冊</router-link></h4>
    </form>
  </div>
</template>

<script>
import { userSignin } from "@/request/api";
export default {
  name: 'SignIn',
  data() {
    return {
      mail: '',
      password: '',
      verificationMailResult: true,
      verificationPasswordResult: true,
      fromPath: '',
    }
  },
  watch: {
    mail(newValue) {
      this.testEmail(newValue);
    },
    password(newValue) {
      this.testPassword(newValue);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if(from.path === '/login/signin' || from.path === '/login/signup'){
        vm.fromPath = '/';
        return;
      }
      vm.fromPath = from.path;
    })
  },
  methods: {
    signIn() {
      if(this.mail === '' || this.password === ''){
        this.testEmail(this.mail);
        this.testPassword(this.password);
        return;
      }
      if(!this.verificationMailResult || !this.verificationPasswordResult){
        return;
      }
      const signInData = JSON.stringify({
        Email: this.mail,
        Password: this.password,
      });
      userSignin(signInData)
        .then(res => {
          this.$cookies.set('isLogin', '1', '1d');
          const user = {
            id: res.data.userId,
            nickName: res.data.nickName
          }
          this.$cookies.set('user', user, '1d');
          this.$store.commit("changeLoginState");
          this.$router.push(this.fromPath);
        })
        .catch(error => {
          console.log(error);
          alert('登入失敗，請確認帳號密碼後重試。');
        })
    },
    testEmail(newValue) {
      this.verificationMailResult = /^([\w\.\-]){1,64}\@([\w\.\-]){1,64}$/.test(newValue);
    },
    testPassword(newValue) {
      this.verificationPasswordResult = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,18}$/.test(newValue);
    }
  }
}
</script>

<style lang="stylus" scoped>
.signin
  width 350px
  padding 1em 2em
  margin-top 60px
  box-shadow 2px 3px 10px $shadow
  background-color $light
  &__tit
    margin-bottom 1em

  &__mail, &__password, &__btn
    display block
    width 100%
    padding 6px
    margin-top 1em

  &__mail, &__password
    border-bottom 1px solid $dark

  &__btn
    box-shadow 2px 2px 5px $shadow
    background-color $accent
    cursor pointer
    border-radius 3px
    color $light

    &:active
      box-shadow 0px 0px 5px $gray

  &__signup-link
    color $paragraph-dark
    margin-top 1em

.check
  &__mail, &__password
    color $danger
    margin 0
    font-size $font-sizes-xs


</style>
