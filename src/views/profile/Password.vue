<template>
  <article class="password">
    <header class="password__header">
      <h2 class="password__tit">更改密碼</h2>
    </header>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="oldPassword"
        :counter="18"
        :rules="rules"
        validate-on-blur
        label="目前密碼"
        required
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        @click:append="show1 = !show1"
        autocomplete
      ></v-text-field>

      <v-text-field
        v-model.lazy="newPassword"
        :rules="rules"
        :counter="18"
        label="新密碼"
        validate-on-blur
        required
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show2 ? 'text' : 'password'"
        @click:append="show2 = !show2"
        autocomplete
      ></v-text-field>

      <v-text-field
        v-model.lazy="passwordCheck"
        :rules="checkRules"
        :counter="18"
        label="確認新密碼"
        validate-on-blur
        required
        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show3 ? 'text' : 'password'"
        @click:append="show3 = !show3"
        autocomplete
      ></v-text-field>

      <div class="d-flex justify-end">
        <v-btn
          :disabled="!valid || isClick"
          :loading="isClick"
          color="primary"
          @click="updateProfile"
        >
          保存
        </v-btn>
      </div>
    </v-form>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          關閉
        </v-btn>
      </template>
    </v-snackbar>
  </article>
</template>

<script>
import { setNewPassword } from "@/request/api";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isClick: false,
      snackbar: false,
      text: '',
      timeout: 2000,
      show1: false,
      show2: false,
      show3: false,
      valid: true,
      oldPassword: '',
      newPassword: '',
      passwordCheck: '',
      rules: [
        v => !!v || '此為必填欄位',
        v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,18}$/.test(v) || '密碼至少 8 個字符，至少 1 個字母和 1 個數字，且不得超出 18 個字符',
      ],
      checkRules: [
        v => !!v || '此為必填欄位',
        v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,18}$/.test(v) || '密碼至少 8 個字符，至少 1 個字母和 1 個數字，且不得超出 18 個字符',
        v => v === this.newPassword || '必須與新密碼相同'
      ],
    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'user',
    ]),
  },
  methods: {
    updateProfile () {
      if(!this.$refs.form.validate()){
        return;
      }
      if(this.newPassword !== this.passwordCheck){
        return;
      }
      this.isClick = true;
      setNewPassword(this.user.id, {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      })
        .then(res => {
          this.resetPassword();
          this.$refs.form.resetValidation();
          this.snackbar = true;
          this.text = res.data;
          this.isClick = false;
        })
        .catch(error => {
          this.snackbar = true;
          this.text = '失敗，請確認密碼是否正確';
          console.log(error);
          this.isClick = false;
        })
    },
    resetPassword() {
      this.oldPassword = '';
      this.newPassword = '';
      this.passwordCheck = '';
    },
  }
}
</script>

<style>

</style>
