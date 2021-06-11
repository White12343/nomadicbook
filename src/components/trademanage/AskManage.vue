<template>
  <section class="ask-manage">
    <header class="ask-manage__header">
      <h2 class="ask-manage__tit">請求交換</h2>
    </header>
    <SlideList>
      <AskCard v-for="(item, index) in askData" :key="index" :ask-data="item" />
    </SlideList>
  </section>
</template>

<script>
import SlideList from '../book/SlideList';
import AskCard from './ask/AskCard';
export default {
  name: 'AskManage',
  data() {
    return {
      askData: [],
    }
  },
  components: {
    SlideList,
    AskCard,
  },
  created() {
    const path = '/static/json/ask.json';
    let vm = this;
    this.$http.get(path).then(res => {
      vm.askData = res.data;
    })

  }

}
</script>

<style>

</style>
