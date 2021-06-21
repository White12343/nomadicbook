<template>
  <div class="header">
    <header class="header__main">
      <v-container>
        <v-row justify="space-between" align="center">
          <v-col col="12" lg="2">
            <h1 class="header__tit fs-1">
              <router-link class="header__link" to="/">遊牧書籍</router-link>
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
      margin-left 1em
  &__signin-btn
    display flex
    justify-content space-between

  &__link
    color $light

.nav
  &__link
    &:hover
      text-decoration underline
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
