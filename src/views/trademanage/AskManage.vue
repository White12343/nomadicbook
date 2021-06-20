<template>
  <section class="ask-manage">
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
      isOpenPopup: false,
    }
  },
  components: {
    AskCard,
  },
  created() {
    let vm = this;
    getAskBookList(this.$cookies.get('user').id)
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
    width 23%
    margin-top 1em
    margin-left 1%
    margin-right 1%
    transition all .3s
    &:hover
      box-shadow 0px 0px 5px $shadow
</style>
