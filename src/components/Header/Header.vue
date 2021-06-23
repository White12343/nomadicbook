<template>
  <div class="header">
    <header class="header__main">
      <v-container>
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
              <form class="search__form">
                <v-text-field
                  solo
                  hide-details
                  label="搜尋"
                  prepend-inner-icon="mdi-magnify"
                ></v-text-field>
              </form>
            </div>
          </v-col>
          <v-col col="12" lg="2">
            <nav class="header__nav">
              <div class="header__signin-btn d-flex align-center justify-end" v-if="isLogin === '1'">
                <h4 class="header__nav-item mr-2">
                  {{user.nickName}}
                </h4>
                <!-- Dropdown -->

                <!-- open-on-hover -->
                <v-menu
                  offset-y
                  left
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2"
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
                    >
                      <v-list-item-title>
                        <router-link :to="item.path">
                          {{ item.title }}
                        </router-link>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- 登出 -->
                    <v-list-item>
                      <v-list-item-title>
                        <a
                          href="#"
                          @click.prevent="signOut"
                        >
                          登出
                        </a>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>

                <!-- Dropdown -->
                <v-menu
                  offset-y
                  left
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2"
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
                    <v-list width="500">
                      <template v-for="(item, index) in notifications">
                        <v-list-item
                          :key="index"
                        >
                          <v-list-item-title>
                            {{item.notify}}
                          </v-list-item-title>
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
              <div class="header__signin-btn" v-else>
                <router-link class="header__link header__nav-item nav__link" to="/login/signin">登入</router-link>
                <router-link class="header__link header__nav-item nav__link" to="/login/signup">註冊</router-link>
              </div>
            </nav>
          </v-col>
        </v-row>
      </v-container>
    </header>
    <Menu />
  </div>
</template>

<script>
import { getNotify, getNotifyNum } from "@/request/api";
import { mapState } from "vuex";
import Menu from '@/components/header/Menu';
export default {
  name: 'Header',
  data () {
    return {

      items: [
        {
          title: '攤位頁',
          path: {
            name: 'Booth',
            params: {
              id: '',
            }
          },
        },
        {
          title: '我的徵求',
          path: '/manage/seek',
        },
        {
          title: '別人徵求',
          path: '/manage/ask',
        },
        {
          title: '交易媒合',
          path: '/manage/match',
        },
      ],
      notifications: [],
      notifyNum: 0,
    }
  },
  created() {
    this.items[0].path.params.id = this.user.id;
    getNotifyNum(this.user.id)
      .then(res => {
        this.notifyNum = parseInt(res.data);
      })
      .catch(error => {
        console.log(error);
      })

  },
  computed: {
    ...mapState([
      'isLogin',
      'user',
    ]),
  },
  methods: {
    signOut() {
      $cookies.set('isLogin', '0');
      this.$router.push('/login/signin');
      this.$store.commit("changeLoginState");
    },
    getNotifications() {
      getNotify(this.user.id)
        .then(res => {
          this.notifications = res.data;
        })
        .catch(error => {
          this.notifications = [
            {
              notify: '沒有任何通知'
            }
          ]
          console.log(error);
        })
    }
  },
  components: {
    Menu,
  }



}
</script>

<style lang="stylus" scoped>
.header
  &__main
    background-color $primary

  &__base
    padding-top 6px
    padding-bottom 6px
    display flex
    justify-content space-between
    align-items center

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

</style>
