<template>
  <div id="app">
    <Header />
    <main class="main container mx-auto">
      <router-view/>
    </main>
    <!-- <div class="background"></div> -->
    
  </div>
</template>

<script>
import Header from './components/header/Header';


export default {
  name: 'App',
  data() {
    return { }
  },
  components: {
    Header,
  }
}
</script>

<style lang="stylus">
#app
  position relative
  background-image url('/static/img/bg.png')
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
