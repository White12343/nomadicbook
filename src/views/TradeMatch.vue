<template>
  <section class="trade-match">
    <header class="trade-match__header">
      <h2 class="trade-match__tit">交易媒合</h2>
    </header>
    <div class="trade-match__icon">
      
    </div>
    <article class="trade-match__cntr">
      <h3 class="trade-match__subtit">交易資訊</h3>
      <p class="trade-match__desc">
        內容
      </p>
    </article>
  </section>
</template>

<script>
export default {
  name: 'TradeMatch',
  data() {
    return {
      matchData: {},
    }
  },
  created() {
    const path = '/static/json/matchdetail.json';
    let vm = this;
    this.$http.get(path).then(res => {
      vm.matchData = res.data[0];
    })
  },
}
</script>

<style lang="stylus">

</style>
