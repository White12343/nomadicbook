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
            :src="`http://35.236.167.85/photo/${userData.userPhoto}.jpg`"
            alt="John"
          >
        </v-avatar>
        <h3 class="mb-6 fs-4 text-center">{{userData.nickName}} 的書攤</h3>
        <h4 class="mb-6 fs-5 text-center">{{userData.email}}</h4>
        <router-link
          v-if="isSelf"
          class="member__link"
          to="/setting"
        >
          <v-btn block>
            修改個人資料
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
import { getUserDetail } from "@/request/api";
export default {
  name: 'Member',
  data() {
    return {
      isSelf: false,
      userData: {},
      mamberNav: [
        {
          path: '/member/booth',
          title: '修改個人資料',
        },
      ],
      nowPath: '/member/booth',
    }
  },
  created() {
    if(parseInt(this.$route.params.id) === parseInt(this.user.id)) {
      this.isSelf = true;
    }
    getUserDetail(this.$route.params.id)
      .then(res => {
        console.log(res);
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
</style>
