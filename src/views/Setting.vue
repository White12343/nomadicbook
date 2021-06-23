<template>
  <section class="profile">
    <v-row>
      <!-- nav -->
      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="3"
      >
      <nav class="profile__nav">

        <router-link class="profile__link"
          to="/setting/profile"
        >
          <v-btn block class="mb-6">
            修改個人資料
          </v-btn>
        </router-link>
        <router-link class="profile__link"
          to="/setting/password"
        >
          <v-btn block class="mb-6">
            更改密碼
          </v-btn>
        </router-link>
      </nav>
      </v-col>
      <!-- 個人攤位 -->
      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="9"
      >
        <div class="profile__cntr">
          <router-view></router-view>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: 'Setting',
  data() {
    return {
    }
  },
}
</script>

<style>

</style>
