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
      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <!-- <template v-slot:activator="{ on, attrs }">
          <v-btn
            block
            :disabled="!valid"
            color="primary"
            class="my-4"
            v-bind="attrs"
            v-on="on"
            @click="signIn"
          >
            登入
          </v-btn>
        </template> -->
        <v-card>
          <v-card-title class="text-h5">
            系統訊息
          </v-card-title>
          <v-card-text>{{errorMsg}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="errorCode === 403"
              @click="dialog = false"
            >
              取消
            </v-btn>
            <v-btn
              v-if="errorCode === 403"
              color="primary"
              @click="sentMail"
            >
              發送驗證信
            </v-btn>
            <v-btn
              v-if="errorCode === 404"
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
      dialog: false,
      errorMsg: '',
      errorCode: 0,
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
      if(from.name === 'Signin' || from.name === 'Signup' || from.name === 'ForgetPassword'){
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
          this.dialog = true;
          this.errorCode = error.response.status;
          switch(error.response.status) {
            case 403:
              this.errorMsg = '此帳號尚未驗證通過，請前往驗證。'
              break;
            case 404:
              this.errorMsg = '查無此帳號，請確認後重試。'
              break;
          }
          this.resetValidation();
        })
    },
    // 發送驗證信
    sentMail() {
      console.log(this.mail);
      this.dialog = false;

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
