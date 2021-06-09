<template>
  <div id="app">
    <Header />
    <Menu />
    <router-view/>
  </div>
</template>

<script>
import Header from './components/header/Header';
import Menu from './components/header/Menu';


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
