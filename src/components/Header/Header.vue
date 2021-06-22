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
                <v-menu
                  offset-y
                  open-on-hover
                  nudge-left="60"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      small
                      v-bind="attrs"
                      v-on="on"
                      color="primary"
                    >
                      <v-icon dark>
                        mdi-account
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <!-- <v-list-item>
                      <v-list-item-title>
                        {{user.nickName}}
                      </v-list-item-title>
                    </v-list-item> -->
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
              </div>
              <div class="header__signin-btn" v-else>
                <router-link class="header__link header__nav-item nav__link" to="/login/signin">登入</router-link>
                <router-link class="header__link header__nav-item nav__link" to="/login/signup">註冊</router-link>
              </div>
            </nav>
          </v-col>
        </v-row>
      </v-container>
      <!-- <div class="header__base container mx-auto">
        <h1 class="header__tit fs-1">
          <router-link class="header__link" to="/">遊牧書籍</router-link>
        </h1>
        <div class="header__search">
          <form class="search__form">
            <input type="text" class="search__query">
            <v-text-field
              solo
              label="搜尋"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </form>
        </div>
        <nav class="header__nav">
          <div class="header__signin-btn" v-if="isLogin === '1'">
            <v-icon color="white" dense >mdi-account</v-icon>
            <router-link class="header__link header__nav-item nav__link" to="/member">
              {{user.nickName}}
            </router-link>
            <a
              href="#"
              class="header__link header__nav-item nav__link"
              @click.prevent="signOut"
            >
              登出
            </a>
          </div>
          <div class="header__signin-btn" v-else>
            <router-link class="header__link header__nav-item nav__link" to="/login/signin">登入</router-link>
            <router-link class="header__link header__nav-item nav__link" to="/login/signup">註冊</router-link>
          </div>
        </nav>
      </div> -->
    </header>
    <Menu />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Menu from '@/components/header/Menu';
export default {
  name: 'Header',
  data () {
    return {

      items: [
        {
          title: '攤位頁',
          path: '/member/booth',
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
    }
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
