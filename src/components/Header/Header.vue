<template>
  <header class="header">
    <div class="header__base container mx-auto">
      <h1 class="header__tit fs-1">
        <router-link class="header__link" to="/">遊牧書籍</router-link>
      </h1>
      <div class="header__search">
        <form class="search__form">
          <input type="text" class="search__query">
          <button type="button" class="search__btn" @click.prevent>搜尋</button>
        </form>
      </div>
      <nav class="header__nav">
        <div class="header__signin-btn" v-if="isLogin === '1'">
          <router-link class="header__link header__nav-item nav__link" to="/member">{{user.nickName}}</router-link>
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

    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";

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



}
</script>

<style lang="stylus" scoped>
.header
  background-color $primary

  &__base
    padding-top .8em
    padding-bottom .8em
    display flex
    justify-content space-between
    align-items center

  &__nav
    display flex
    &-item
      margin-left 1em


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
    border-radius 3px
  &__btn
    padding 6px 1.2em
    background-color $accent
    border-radius 3px
    color $light
    &:hover
      background-color $accent-hover
    &:active
      background-color $accent-active

</style>
