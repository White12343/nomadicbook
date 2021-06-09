<template>
  <div id="app">
    <Header />
    <Menu />
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header/Header.vue';
import Menu from './components/Header/Menu.vue';


export default {
  name: 'App',
  data() {
    return { }
  },
  components: {
    Header,
    Menu,
  }
}
</script>

<style lang="stylus">


</style>
