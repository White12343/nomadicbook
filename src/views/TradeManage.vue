<template>
  <div class="trade-manage">
    <!-- 顯示自己對對方要求交換的書，連結到對方產品頁 -->
    <SeekManage />

    <!--
      ## 顯示對方對我的要求
      1. 顯示被要求的書
      2. 顯示查看對方攤位的連結
        - 點擊會產生彈跳視窗可以直接看對方有相同交易方式的書列表
        - 點擊列表的書之後會在右方生成產品介紹，並有按鈕可以直接交易媒合
     -->
    <AskManage />

    <!--
      ## 交易媒合連結
      1. 左邊出現我方要交換的書，右邊出現對方要交換的書，中間用箭頭指示
      2. 底下直接有交易確認和交易資訊的按鈕
      3. 點交易資訊會進到交易媒合頁面
    -->
    <MatchManage />

  </div>


</template>

<script>
import SeekManage from '../components/trademanage/SeekManage';
import MatchManage from '../components/trademanage/MatchManage';
import AskManage from '../components/trademanage/AskManage';

export default {
  name: 'TradeManage',
  data() {
    return {

    }
  },
  components: {
    SeekManage,
    MatchManage,
    AskManage,
  },

}
</script>

<style lang="stylus">
.trade-manage
  &__cntr
    overflow hidden
  &__list
    display flex
    flex-wrap nowrap


</style>
