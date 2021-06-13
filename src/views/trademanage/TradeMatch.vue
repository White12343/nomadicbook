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
import { getMatchDetail } from "@/request/api";
export default {
  name: 'TradeMatch',
  data() {
    return {
      matchData: {},
    }
  },
  created() {
    let vm = this;
    getMatchDetail()
      .then(res => {
        vm.matchData = res.data[0];
      })
      .catch(error => {
        // response 攔截器會先執行，除非你漏接了，才會進到 catch
        console.log(error);
      })
  },
}
</script>

<style lang="stylus">

</style>
