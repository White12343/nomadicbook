<template>
  <header class="header">
    <div class="header__base container mx-auto">
      <h1 class="header__tit fs-1">
        <router-link class="header__link" to="/">遊牧書籍</router-link>
      </h1>
      <nav class="header__nav">
        <form class="search__form header__nav-item">
          <input type="text" class="search__query">
        </form>
        <router-link class="header__link header__nav-item nav__link" to="/signin">登入</router-link>
        <router-link class="header__link header__nav-item nav__link" to="/signup">註冊</router-link>
      </nav>

    </div>
  </header>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  },
  components: {
  },
  created() {
    console.log($cookies.get('isLogin'));
  },
  updated() {
    console.log($cookies.get('isLogin'));
  }



}
</script>

<style lang="stylus" scoped>
.header
  background-color $bg-dark
  box-shadow 0 0 3px $gray

  &__base
    padding-top 5px
    padding-bottom 5px
    display flex
    justify-content space-between
    align-items center

  &__nav
    display flex
    &-item
      margin-left 1em


  &__link
    color $headline-light

.nav
  &__link
    &:hover
      text-decoration underline

</style>
