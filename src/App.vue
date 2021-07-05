<template>
  <v-app>
    <div id="app">
      <Header />
        <!-- <v-container> -->
        <main class="main">
            <router-view v-if="isRouterAlive"/>
        </main>
        <!-- </v-container> -->
      <Footer class="app-footer"/>
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
  min-height calc(100vh - 154px - 72px)
  max-width 1200px
  margin 0 auto
  padding 1px

</style>
