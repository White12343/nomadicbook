<template>
  <div class="member">
    <v-row>
      <!-- nav -->
      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="3"
      >
      <nav class="member__nav">
        <v-avatar
          color="grey lighten-2"
          size="160"
          class="mx-auto d-block mb-6"
        >
          <img
            :src="userPhoto || defaultPhoto"
            alt="個人頭貼"
          >
        </v-avatar>
        <article class="member__desc">
          <h3 class="mb-3 fs-4 text-center">{{userData.nickName}} 的書攤</h3>
          <div v-if="userData.evaluation" class="text-center mb-3">
            <v-rating
              class="text-center"
              :value="userData.evaluation"
              color="warning"
              background-color="warning"
              empty-icon="mdi-star-outline"
              half-icon="mdi-star-half"
              half-increments
              readonly
              size="16"
            ></v-rating>
            <small>已經有 {{userData.tradeNum}} 人評價</small>
          </div>
          <h4 class="mb-3 text-center grey--text" v-else>還沒有任何評價</h4>
          <h4 class="mb-3 fs-6 text-center">{{userData.email}}</h4>
          <p class="mb-3">{{userData.selfIntroduction}}</p>
        </article>

        <v-btn
          class="mt-6"
          block
          v-if="isSelf"
          to="/setting"
        >
          修改個人資料
        </v-btn>

      </nav>
      </v-col>
      <!-- 個人攤位 -->
      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="9"
      >
        <div class="member__cntr">
          <v-row justify="space-between">
            <v-col
              cols="12"
              xs="3"
              sm="3"
              md="3"
              lg="3"
            >
              <v-tabs>
                <v-tab :to="{
                  path: 'booth',
                }">
                    我的攤位
                </v-tab>
                <v-tab :to="{
                  path: 'offshelf',
                }">
                    下架書籍
                </v-tab>
              </v-tabs>
            </v-col>
            <v-col
              cols="12"
              xs="1"
              sm="1"
              md="1"
              lg="1"
            >
              <router-link
                to="/uploadpd"
                v-if="isSelf"
              >
                <v-btn color="primary">
                  上架
                </v-btn>
              </router-link>
            </v-col>
          </v-row>
          <router-view></router-view>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserBasic } from "@/request/api";
export default {
  name: 'Member',
  inject: ['reload'],
  data() {
    return {

      rating: 4.5,
      isSelf: false,
      userData: {},
      mamberNav: [
        {
          path: '/member/booth',
          title: '修改個人資料',
        },
      ],
      nowPath: '/member/booth',
      defaultPhoto: '/static/img/default-image.png'
    }
  },
  created() {
    if(this.user) {
      if(parseInt(this.$route.params.id) === parseInt(this.user.id)) {
        this.isSelf = true;
      }
    }
    getUserBasic(this.$route.params.id)
      .then(res => {
        this.userData = res.data;
      })
      .catch(error => {
        console.log(error);
      })
  },
  methods: {
    changePath(path) {
      this.nowPath = path;
    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'user',
    ]),
    userPhoto() {
      if(!this.userData.userPhoto){
        return '';
      }
      return `http://35.236.167.85/photo/${this.userData.userPhoto}.jpg`;
    }
  },
}
</script>

<style lang="stylus">
.member
  &__nav
    background-color $light
    padding 1em
  &__link
    color $dark !important
  &__desc
    padding 0 1.5em
    word-wrap break-word
</style>
