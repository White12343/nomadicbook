<template>
  <section class="notifications mx-auto">
    <div class="text-center" v-if="isLoading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div class="notifications__success" v-else>
      <h2 class="signin__tit">遊牧書籍通知</h2>
      <p class="my-6" v-if="isSuccess">
        信箱驗證成功，您可以直接進行登入，歡迎加入遊牧書籍！
      </p>
      <p class="my-6" v-else>
        信箱驗證失敗，請重新發送驗證信。
      </p>
      <v-btn
        block
        color="primary"
        :to="{
          name: 'SignIn',
        }"
      >
        回到登入
      </v-btn>
    </div>
  </section>
</template>

<script>

import { verify } from "@/request/api";
export default {
  data: () => ({
    isSuccess: false,
    isLoading: true,
  }),
  created() {
    verify(this.$route.params.id)
      .then(res => {
        this.isSuccess = true;
        this.isLoading = false;
      })
      .catch(error => {
        console.log(error);
        this.isSuccess = false;
        this.isLoading = false;
      })
  }
};
</script>

<style lang="stylus">
.notifications
  width 400px
  padding 1em 2em
  margin-top 60px
  box-shadow 2px 3px 10px $shadow
  background-color $light
</style>
