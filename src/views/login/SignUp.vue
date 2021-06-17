<template>
  <div class="signup mx-auto">
    <h2 class="signup__tit">註冊</h2>
    <form class="signup__form">
      <input type="text" class="signup__input" placeholder="暱稱" v-model.lazy="nickName" autocomplete>
      <p class="check__mail" v-if="!checkNickName.verificationResult">請輸入正確暱稱，至少 2 個字符，且不得超出 8 個字符</p>
      <p class="check__mail" v-if="checkNickName.isRepeat">此暱稱已被使用</p>
      <a href="#" @click.prevent="checkNickNameIsRepeat">檢查暱稱</a>
      <input type="text" class="signup__input signup__mail" placeholder="Mail" v-model.lazy="mail" autocomplete>
      <p class="check__mail" v-if="!checkMail.verificationResult">請輸入正確 mail 格式</p>
      <p class="check__mail" v-if="checkMail.isRepeat">此 Mail 已被註冊過</p>
      <a href="#" @click.prevent="checkMailIsRepeat">檢查 Mail</a>
      <input type="password" class="signup__input signup__password" placeholder="密碼" v-model.lazy="password" autocomplete>
      <p class="check__password" v-if="!verificationPasswordResult">密碼至少 8 個字符，至少 1 個字母和 1 個數字，且不得超出 18 個字符</p>
      <input type="password" class="signup__input signup__password" placeholder="確認密碼" v-model.lazy="passwordCheck" autocomplete>
      <p class="check__password" v-if="!isPasswordCheck">請輸入相同密碼</p>
      <input type="submit" class="signup__btn" value="註冊" @click.prevent="signUp">
      <h4 class="signup__signin-link fs-6 text-center">已經有帳號？<router-link class="signin__link" to="/login/signin">登入</router-link></h4>
    </form>
  </div>
</template>

<script>
import { userSignUp, checkNickName, checkMail } from "@/request/api";
export default {
  name: 'SignUp',
  data() {
    return {
      nickName: '',
      mail: '',
      password: '',
      passwordCheck: '',
      verificationPasswordResult: true,
      isPasswordCheck: true,
      checkNickName: {
        isCheck: false,
        isRepeat: false,
        verificationResult: true,
        // msg: '',
      },
      checkMail: {
        isCheck: false,
        isRepeat: false,
        verificationResult: true,
        // msg: '',
      }

    }
  },
  watch: {
    nickName(newValue) {
      this.testNickName(newValue);
      this.checkNickName.isCheck = false;
    },
    mail(newValue) {
      this.testEmail(newValue);
      this.checkMail.isCheck = false;
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
      // 如果沒填就全檢查一邊告知使用者
      if(this.nickName === '' || this.mail === '' || this.password === '' || this.passwordCheck === ''){
        this.testNickName(this.nickName);
        this.testEmail(this.mail);
        this.testPassword(this.password);
        this.checkPassword(this.passwordCheck)
        return;
      }
      // 如果沒按過檢查暱稱，就跳訊息告知
      if(!this.checkNickName.isCheck) {
        alert('請先檢查暱稱是否可用');
        return;
      }
      // 如果沒按過檢查mail，就跳訊息告知
      if(!this.checkMail.isCheck) {
        alert('請先檢查 Mail 是否可用');
        return;
      }
      // 檢查是否重複
      if(this.checkNickName.isRepeat || this.checkMail.isRepeat){
        alert('有重複');
        return;
      }
      // 檢查格式
      if(!this.checkNickName.verificationResult || !this.checkMail.verificationResult || !this.verificationPasswordResult || !this.isPasswordCheck) {
        alert('格式有誤');
        return
      }
      // {
      //   "Nickname": "lee",
      //   "Email": "abc@gmail.com",
      //   "Password": "test1234"
      // }
      const signUpData = JSON.stringify({
        Nickname: this.nickName,
        Email: this.mail,
        Password: this.password
      })
      userSignUp(signUpData)
        .then(res => {
          alert('註冊成功');
          this.$router.push('/login/signin');
        })
        .catch(error => {
          alert('註冊失敗');
        })
    },
    testNickName(newValue) {
      this.checkNickName.verificationResult = /^([\d\w\u4e00-\u9fa5,\.;\:"'?!\-]){2,8}$/.test(newValue);
    },
    testEmail(newValue) {
      this.checkMail.verificationResult = /^([\w\.\-]){1,64}\@([\w\.\-]){1,64}$/.test(newValue);
    },
    testPassword(newValue) {
      // 至少八個字符，至少一個字母和一個數字
      this.verificationPasswordResult = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,18}$/.test(newValue);
    },
    checkPassword(newValue) {
      this.isPasswordCheck = (newValue === this.password);
    },
    checkNickNameIsRepeat() {
      if(this.nickName === ''){
        return;
      }
      this.checkNickName.isCheck = true;
      checkNickName({
        Nickname: this.nickName
      })
        .then(res => {
          this.checkNickName.isRepeat = false;
        })
        .catch(error => {
          // this.checkNickName.msg = error.response.data;
          this.checkNickName.isRepeat = true;
        })
    },
    checkMailIsRepeat() {
      if(this.mail === ''){
        return;
      }
      this.checkMail.isCheck = true;
      checkMail({
        Email: this.mail
      })
        .then(res => {
          this.checkMail.isRepeat = false;
        })
        .catch(error => {
          console.log(error.response);
          this.checkMail.isRepeat = true;
        })
    },
  }
}
</script>

<style lang="stylus" scoped>

.signup
  width 300px
  padding 1em
  border 2px solid $dark
  margin-top 60px

  &__input, &__btn
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
