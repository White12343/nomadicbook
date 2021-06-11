<template>
  <section class="match-manage">
    <header class="match-manage__header">
      <h2 class="match-manage__tit">交易媒合</h2>
    </header>
    <SlideList>
      <Match v-for="(item, index) in matchData" :key="index" :match-data="item"/>
    </SlideList>

  </section>
</template>

<script>
import SlideList from '../book/SlideList';
import Match from './match/Match';
export default {
  name: 'MatchManage',
  data() {
    return {
      matchData: [],
    }
  },
  created() {
    const path = '/static/json/match.json';
    let vm = this;
    this.$http.get(path).then(res => {
      vm.matchData = res.data;
    })
  },
  components: {
    SlideList,
    Match,
  },
}
</script>

<style>

</style>
