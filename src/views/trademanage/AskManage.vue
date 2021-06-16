<template>
  <section class="ask-manage">
    <!--
      ## 顯示對方對我的要求
      1. 顯示被要求的書
      2. 顯示查看對方攤位的連結
        - 點擊會產生彈跳視窗可以直接看對方有相同交易方式的書列表
        - 點擊列表的書之後會在右方生成產品介紹，並有按鈕可以直接交易媒合
     -->
    <header class="ask-manage__header">
      <h2 class="ask-manage__tit">請求交換</h2>
    </header>
    <div class="ask-manage__cntr">
      <AskCard class="ask-manage__item" v-for="(item, index) in askData" :key="index" :ask-data="item" />
    </div>

  </section>
</template>

<script>

import { getAskBookList } from "@/request/api";
import AskCard from '@/components/trademanage/ask/AskCard';

export default {
  name: 'AskManage',
  data() {
    return {
      askData: [],
    }
  },
  components: {
    AskCard,
  },
  created() {
    let vm = this;
    getAskBookList()
      .then(res => {
        vm.askData = res.data;
      })
      .catch(error => {
        console.log(error);
      })

  }

}
</script>

<style lang="stylus">
.ask-manage
  background-color $light
  padding 1em
  &__cntr
    display flex
    flex-wrap wrap
  &__item
    width 20%
    margin-top 1em
    box-shadow 0 0 3px $gray
    transition all .3s
    &:hover
      box-shadow 2px 2px 3px $gray
</style>
