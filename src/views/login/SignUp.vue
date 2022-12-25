<template>
  <div class="signup mx-auto">
    <h2 class="signup__tit">註冊</h2>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        ref="nickName"
        v-model.lazy="nickName"
        :counter="8"
        :rules="nameRules"
        label="暱稱"
        required
        autocomplete
        @change="checkNickNameIsRepeat"
      ></v-text-field>
      <div class="check" v-if="nickNameCheck.start">
        <v-progress-circular
          :width="2"
          :size="16"
          color="gray"
          indeterminate
          v-if="nickNameCheck.isLoading"
        ></v-progress-circular>
        <div class="msg" v-else>
          <small class="msg__desc green--text" v-if="nickNameCheck.isCheck">此暱稱可以使用</small>
          <small class="msg__desc red--text" v-else>此暱稱已被使用</small>
        </div>
      </div>

      <v-text-field
        ref="mail"
        v-model.lazy="mail"
        :rules="emailRules"
        label="E-mail"
        required
        autocomplete
        validate-on-blur
        @change="checkMailIsRepeat"
      ></v-text-field>
      <div class="check" v-if="mailCheck.start">
        <v-progress-circular
          :width="2"
          :size="16"
          color="gray"
          indeterminate
          v-if="mailCheck.isLoading"
        ></v-progress-circular>
        <div class="msg" v-else>
          <small class="msg__desc green--text" v-if="mailCheck.isCheck">此 mail 可以使用</small>
          <small class="msg__desc red--text" v-else>此 mail 已被使用</small>
        </div>
      </div>


      <v-text-field
        v-model.lazy="password"
        :counter="18"
        validate-on-blur
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="rules"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="請輸入密碼"
        hint="密碼至少 8 個字符，至少 1 個字母和 1 個數字，且不得超出 18 個字符"
        @click:append="show1 = !show1"
        autocomplete
      ></v-text-field>
      <v-text-field
        v-model.lazy="passwordCheck"
        :counter="18"
        validate-on-blur
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="checkRules"
        :type="show2 ? 'text' : 'password'"
        name="input-10-1"
        label="請再次輸入密碼"
        hint="密碼至少 8 個字符，至少 1 個字母和 1 個數字，且不得超出 18 個字符"
        @click:append="show2 = !show2"
        autocomplete
      ></v-text-field>
      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            系統訊息
          </v-card-title>
          <v-card-text>{{systemMsg}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn
              v-if="systemCode === 200"
              @click="dialog = false"
            >
              取消
            </v-btn> -->
            <v-btn
              v-if="systemCode === 200"
              color="primary"
              :to="{
                name: 'SignIn',
              }"
            >
              前往登入
            </v-btn>
            <v-btn
              v-else
              color="primary"
              @click="dialog = false"
            >
              確認
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn
        block
        :disabled="isSignUp || !valid"
        :loading="isSignUp"
        color="primary"
        class="my-4"
        @click="signUp"
      >
        註冊
      </v-btn>
      <h4 class="signup__signin-link fs-6 text-center">已經有帳號？<router-link class="signin__link" to="/login/signin">登入</router-link></h4>

    </v-form>

  </div>
</template>

<script>
import { userSignUp, checkNickName, checkMail } from "@/request/api";
export default {
  name: 'SignUp',
  data() {
    return {
      isSignUp: false,
      dialog: false,
      systemCode: 0,
      systemMsg: '',
      show1: false,
      show2: false,
      rules: [
        v => !!v || '此為必填欄位',
        v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,18}$/.test(v) || '密碼至少 8 個字符，至少 1 個字母和 1 個數字，且不得超出 18 個字符',
      ],
      valid: true,
      emailRules: [
        v => !!v || '此為必填欄位',
        v => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(v) || '請輸入正確格式',
      ],
      nameRules: [
        v => !!v || '此為必填欄位',
        v => (v && v.length <= 8) || '名稱不得超出 8 個字符',
        v => (v && v.length >= 2) || '名稱不得低於 2 個字符',
      ],

      checkRules: [
        v => !!v || '此為必填欄位',
        v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,18}$/.test(v) || '密碼至少 8 個字符，至少 1 個字母和 1 個數字，且不得超出 18 個字符',
        v => v === this.password || '必須與新密碼相同'

      ],
      nickName: '',
      mail: '',
      password: '',
      passwordCheck: '',
      nickNameCheck: {
        start: false,
        isCheck: false,
        isLoading: true,
      },
      mailCheck: {
        start: false,
        isCheck: false,
        isLoading: true,
      },
    }
  },
  methods: {

    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    signUp() {
      if(!this.$refs.form.validate()){
        return;
      }
      if(this.nickNameCheck.isLoading || this.mailCheck.isLoading ) {
        alert('請等待確認');
        return;
      }
      if(!this.nickNameCheck.isCheck) {
        alert('暱稱重複');
        return;
      }
      if(!this.mailCheck.isCheck) {
        alert('mail 重複');
        return;
      }
      this.isSignUp = true;
      const signUpData = {
        Nickname: this.nickName,
        Email: this.mail,
        Password: this.password
      }
      userSignUp(signUpData)
        .then(res => {
          this.dialog = true;
          this.systemCode = 200;
          this.systemMsg = '註冊成功，請到信箱收取驗證信'
          this.isSignUp = false;
          // this.$router.push('/login/signin');
        })
        .catch(error => {
          this.dialog = true;
          this.isSignUp = false;
          this.systemCode = 404;
          this.systemMsg = '註冊失敗'
        })
    },
    checkNickNameIsRepeat() {
      this.nickNameCheck.start = false;
      if(!this.$refs.nickName.validate()){
        return;
      }
      this.nickNameCheck.start = true;
      this.nickNameCheck.isLoading = true;
      checkNickName({
        Nickname: this.nickName
      })
        .then(res => {
          this.nickNameCheck.isLoading = false;
          this.nickNameCheck.isCheck = true;
        })
        .catch(error => {
          this.nickNameCheck.isLoading = false;
          this.nickNameCheck.isCheck = false;
        })
    },
    checkMailIsRepeat() {
      this.mailCheck.start = false;
      if(!this.$refs.mail.validate()){
        return;
      }
      this.mailCheck.start = true;
      this.mailCheck.isLoading = true;
      checkMail({
        Email: this.mail
      })
        .then(res => {
          this.mailCheck.isLoading = false;
          this.mailCheck.isCheck = true;
        })
        .catch(error => {
          console.log(error.response);
          this.mailCheck.isLoading = false;
          this.mailCheck.isCheck = false;
        })
    },
  }
}
</script>

<style lang="stylus" scoped>

.signup



  &__signin-link
    color $paragraph-dark
    margin-top 1em


</style>
