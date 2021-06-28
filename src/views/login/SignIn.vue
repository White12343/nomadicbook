<template>
  <div class="signin mx-auto">
    <h2 class="signin__tit">登入</h2>
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

      <v-text-field
        v-model="password"
        :counter="18"
        validate-on-blur
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="rules"
        :type="show ? 'text' : 'password'"
        name="input-10-1"
        label="請輸入密碼"
        hint="密碼至少 8 個字符，至少 1 個字母和 1 個數字，且不得超出 18 個字符"
        @click:append="show = !show"
        autocomplete
      ></v-text-field>
      <router-link class="signin__link" to="/login/forget">忘記密碼？</router-link>
      <v-btn
        block
        :disabled="!valid"
        color="primary"
        class="my-4"
        @click="signIn"
      >
        登入
      </v-btn>
      <h4 class="signin__signup-link fs-6 text-center">還沒有帳號？<router-link class="signin__link" to="/login/signup">註冊</router-link></h4>

    </v-form>

  </div>
</template>

<script>
import { userSignin } from "@/request/api";
export default {
  name: 'SignIn',
  inject: ['reload'],
  data() {
    return {
      show: false,
      rules: [
        v => !!v || '此為必填欄位',
        v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,18}$/.test(v) || '密碼至少 8 個字符，至少 1 個字母和 1 個數字，且不得超出 18 個字符',
      ],
      valid: true,
      emailRules: [
        v => !!v || '此為必填欄位',
        v => /.+@.+\..+/.test(v) || '請輸入正確格式',
      ],

      mail: '',
      password: '',
      from: '',
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if(from.name === 'Signin' || from.name === 'Signup'){
        vm.fromname = 'Home';
        return;
      }
      vm.from = from.name;
    })
  },
  methods: {
    signIn() {
      if(!this.$refs.form.validate()){
        return;
      }
      const signInData = {
        Email: this.mail,
        Password: this.password,
      };
      userSignin(signInData)
        .then(res => {
          this.$cookies.set('isLogin', '1', '1d');
          const user = {
            id: res.data.userId,
            nickName: res.data.nickName,
            token: res.data.authenticate,
          }
          this.$cookies.set('user', user, '1d');
          this.$store.commit("changeLoginState");
          if(this.from){
            if(this.from === 'Booth' || this.from === 'OffShelf'){
              this.$router.push(
                {
                  name: this.from,
                  params: {
                    id: res.data.userId,
                  }
                }
              );
            }else if(this.from === 'SignIn' || this.from === 'SignUp') {
              this.$router.push({name: 'Home'});
            }else{
              this.$router.push({name: this.from});
            }
          }else {
            this.$router.push({name: 'Home'});
          }
        })
        .catch(error => {
          console.log(error);
          alert('登入失敗，請確認帳號密碼後重試。');
          this.resetValidation();
        })
    },
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
  }
}
</script>

<style lang="stylus" scoped>
.signin


  &__signup-link
    color $paragraph-dark
    margin-top 1em



</style>
