<template>
  <div class="header">
    <header class="header__main">
      <div class="header__base">
        <v-row justify="space-between" align="center">
          <v-col col="12" lg="3">
            <h1 class="header__tit fs-1">
              <router-link class="header__link" to="/">
                <v-icon large dark>
                  mdi-book-open-page-variant
                </v-icon>
               遊牧書籍
              </router-link>
            </h1>
          </v-col>
          <v-col col="12" lg="6">
            <div class="header__search">
                <v-text-field
                  solo
                  hide-details
                  label="搜尋"
                  prepend-inner-icon="mdi-magnify"
                  v-model="keyWord"
                  @change="searchBook"
                  prevent
                ></v-text-field>
            </div>
          </v-col>
          <v-col col="12" lg="2">
            <nav class="header__nav">
              <div class="header__signin-btn d-flex align-center justify-end" v-if="isLogin === '1'">
                <h4 class="header__nav-item mr-2">
                  {{user.nickName || ''}}
                </h4>
                <!-- Dropdown -->

                <!-- open-on-hover -->
                <v-menu
                  offset-y
                  left
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="ml-4"
                      fab
                      dark
                      text
                      small
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>
                        mdi-account
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, index) in items"
                      :key="index"
                      :to="item.path"
                    >
                      <v-list-item-title>
                        {{ item.title }}
                      </v-list-item-title>
                    </v-list-item>
                    <!-- 登出 -->
                    <v-list-item
                      @click.prevent="signOut"
                    >
                      <v-list-item-title>
                          登出
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>

                <!-- Dropdown -->
                <v-menu
                  offset-y
                  left
                  color="white"
                  max-height="530"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="ml-4"
                      fab
                      dark
                      text
                      small
                      v-bind="attrs"
                      v-on="on"
                      @click="getNotifications"
                    >
                      <v-badge
                        color="red"
                        :content="notifyNum"
                        :value="notifyNum"
                      >
                        <v-icon>
                          mdi-bell
                        </v-icon>
                      </v-badge>
                    </v-btn>
                  </template>
                  <template>
                    <v-list
                      width="500"
                    >
                      <v-list-item-title class="ml-4 text-h6">

                        <div class="d-flex align-center">
                          <v-icon class="mr-3">mdi-bell</v-icon>
                          通知
                        </div>
                      </v-list-item-title>
                      <v-divider></v-divider>
                      <template v-for="(item, index) in notifications">

                        <v-list-item
                          :key="index"
                        >
                          <v-list-item-content>
                            <div class="d-flex align-center">
                              <v-icon class="mr-3">mdi-alert-circle-outline</v-icon>
                              {{item.notify}}
                            </div>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider
                          v-if="index < notifications.length - 1"
                          :key="'divider' + index"
                        ></v-divider>
                      </template>
                    </v-list>
                  </template>
                </v-menu>
              </div>
              <div class="header__signin-btn d-flex align-center justify-end" v-else>
                <v-btn
                  dark
                  text
                  class="ml-4"
                  :to="{
                    name: 'SignIn'
                  }"
                >
                  登入
                </v-btn><v-btn
                  dark
                  text
                  class="ml-4"
                  :to="{
                    name: 'SignUp'
                  }"
                >
                  註冊
                </v-btn>
              </div>
            </nav>
          </v-col>
        </v-row>
      </div>
    </header>
    <!-- <Nav /> -->
    <Menu></Menu>
  </div>
</template>

<script>
import { getNotify, getNotifyNum } from "@/request/api";
import { mapState } from "vuex";
import Menu from '@/components/header/Menu';
import Nav from '@/components/header/Nav';
export default {
  name: 'Header',
  data () {
    return {
      notifications: [],
      notifyNum: 0,
      keyWord: '',
    }
  },
  created() {
    if(parseInt(this.isLogin)) {
      getNotifyNum(this.user.id)
        .then(res => {
          this.notifyNum = parseInt(res.data);
        })
        .catch(error => {
          // console.log(error.response);
        })

      this.getNotifyNumTimer();
    }
  },
  watch: {
    isLogin(val) {
      let state = parseInt(val);
      if(state) {
        this.getNotifyNumTimer();
      }else {
        clearInterval(this.notifyRefresh);
      }
    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'user',
    ]),
    items() {
      return [
        {
          title: '攤位頁',
          path: {
            name: 'Booth',
            params: {
              id: this.user.id,
            }
          },
        },
        {
          title: '交易管理',
          path: '/manage/seek',
        },
      ]
    }
  },
  methods: {
    signOut() {
      this.$cookies.set('isLogin', '0');
      this.$cookies.remove('user');
      this.$store.commit("changeLoginState");
      this.$router.push('/login/signin');
    },
    getNotifications() {
      if(parseInt(this.isLogin)) {
        getNotify(this.user.id)
          .then(res => {
            this.notifyNum = 0;
            this.notifications = res.data;
          })
          .catch(error => {
            this.notifications = [
              {
                notify: '沒有任何通知'
              }
            ]
          })
      }
    },
    searchBook() {
      if(this.$route.name === 'BookList'){
        let path = this.$route.fullPath;
        this.$router.push({
          path: path,
          query: {
            keyword: this.keyWord,
            page: 1,
          }
        })
      }else {
        this.$router.push({
          name: 'BookList',
          query: {
            keyword: this.keyWord,
          }
        })
      }
    },
    getNotifyNumTimer() {
      this.notifyRefresh = window.setInterval(() => {
        getNotifyNum(this.user.id)
          .then(res => {
            this.notifyNum = parseInt(res.data);
          })
          .catch(error => {
            if(error.response.status === 401) {
              clearInterval(this.notifyRefresh);
            }
          })
      }, 2000);
    }
  },
  components: {
    Menu,
    Nav,
  }



}
</script>

<style lang="stylus" scoped>
.header
  &__main
    background-color $primary


  &__base
    max-width 1200px
    margin 0 auto
    padding .6em 0

  &__nav
    &-item
      color $light
  &__signin-btn
    display flex
    justify-content space-between

  &__link
    color $light

.search
  &__query
    width 600px
    padding 6px
    border 1px solid $primary

  &__btn
    padding 6px 1.2em
    background-color $accent
    border-radius 3px
    color #f4f2eb
    cursor pointer
.notify
  background-color #fff !important

</style>
