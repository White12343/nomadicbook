<template>

  <section class="match-manage">
    <!--
      ## 交易媒合連結
      1. 左邊出現我方要交換的書，右邊出現對方要交換的書，中間用箭頭指示
      2. 底下直接有交易確認和交易資訊的按鈕
      3. 點交易資訊會進到交易媒合頁面
    -->
    <header class="match-manage__header">
      <h2 class="match-manage__tit">交易媒合</h2>
    </header>
    <div class="match-manage__cntr">
      <Match
        v-for="(item, index) in matchData"
        :key="index"
        :match-data="item"
        class="match-manage__item"
      />
    </div>


  </section>
</template>

<script>
import { getMatchList } from "@/request/api";
import Match from '@/components/trademanage/match/Match';
export default {
  name: 'MatchManage',
  data() {
    return {
      matchData: [],
    }
  },
  created() {
    let vm = this;
    getMatchList(this.$cookies.get('user').id)
      .then(res => {
        vm.matchData = res.data;
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      })
  },
  components: {
    Match,
  },
}
</script>

<style lang="stylus">
.match-manage
  background-color $light
  padding 1em
  &__cntr
    display flex
    flex-wrap wrap
  &__item
    width 48%
    margin-right 1%
    margin-left 1%
    margin-top 2em
    transition all .3s
    &:hover
      box-shadow 0px 0px 5px $shadow
</style>
