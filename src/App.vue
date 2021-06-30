<template>
  <v-app>
    <div id="app">
      <Header />
        <!-- <v-container> -->
          <main class="main">
              <router-view v-if="isRouterAlive"/>
          </main>
        <!-- </v-container> -->
      <Footer />
    </div>
  </v-app>
</template>

<script>
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';



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
    Footer,
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
  background-image url('/static/img/bg.png')
.main
  min-height calc(100vh - 115px - 112px)
  max-width 1200px
  margin 0 auto

</style>
