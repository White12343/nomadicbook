<template>
  <v-app>
    <div id="app">
      <Header />
        <v-container>
      <main class="main">
          <router-view v-if="isRouterAlive"/>
      </main>
        </v-container>

    </div>
  </v-app>
</template>

<script>
import Header from './components/header/Header';


export default {
  name: 'App',
  provide(){
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true,
    }
  },
  components: {
    Header,
  },
  methods: {
    reload () {
      console.log('reload occure')
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true
      });
    },
  },
}
</script>

<style lang="stylus">
#app
  position relative
  background-image url('/static/img/bg.png')
  // background-color #f0f0f0
.background
  width 100%
  height 160px
  position absolute
  bottom 0
  overflow hidden
  z-index -1
  &::before
    content ''
    display block
    width 0
    height 0
    border-style solid
    border-width 80px 0 80px 100vw
    border-color transparent transparent transparent rgb(231, 247, 255)
  &::after
    content ''
    display block
    height 80px
    width 100vw
    background-color rgb(231, 247, 255)
    position absolute
    bottom 0

</style>
