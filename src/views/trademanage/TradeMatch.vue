<template>
  <section class="trade-match">
    <header class="trade-match__header">
      <h2 class="trade-match__tit">交易媒合</h2>
    </header>
    <div class="trade-match__icon">

    </div>
    <article class="trade-match__cntr">
      <h3 class="trade-match__subtit fs-4">交易資訊</h3>
      <div class="trade-match__desc">
        <div class="trade-match__list">
          <h4 class="trade-match__list__tit fs-5">自己</h4>
          <ul class="trade-match__list__cntr">
            <li class="trade-match__item">日期：{{matchData.seekDate}}</li>
            <li class="trade-match__item">名字：{{matchData.seekUserName}}</li>
            <li class="trade-match__item">書名：{{matchData.seekBookName}}</li>
            <li class="trade-match__item">交易方式：{{matchData.tradeMode}}</li>
            <li class="trade-match__item">交易資訊：{{matchData.seekToAddress}}</li>
            <li class="trade-match__item">手機：{{matchData.seekCellphone}}</li>
          </ul>
        </div>
        <div class="trade-match__list">
          <h4 class="trade-match__list__tit fs-5">對方</h4>
          <ul class="trade-match__list__cntr">
            <li class="trade-match__item">日期：{{matchData.seekedDate}}</li>
            <li class="trade-match__item">名字：{{matchData.seekedUserName}}</li>
            <li class="trade-match__item">書名：{{matchData.seekedBookName}}</li>
            <li class="trade-match__item">交易方式：{{matchData.tradeMode}}</li>
            <li class="trade-match__item">交易資訊：{{matchData.seekedToAddress}}</li>
            <li class="trade-match__item">手機：{{matchData.seekedCellphone}}</li>
          </ul>
        </div>
      </div>
      <div class="trade-match__check-btns">
        <Btn class="trade-match__check-btn" @check="sent" desc="確認" btn-style="dark"/>
      </div>
    </article>

  </section>
</template>

<script>

import { getMatchDetail } from "@/request/api";
import Btn from '@/components/ui/Btn';
export default {
  name: 'TradeMatch',
  data() {
    return {
      matchData: {},
    }
  },
  components: {
    Btn,
  },
  created() {
    let vm = this;
    getMatchDetail(this.$route.params.id)
      .then(res => {
        vm.matchData = res.data;
      })
      .catch(error => {
        console.log(error);
      })
  },
  methods: {
    sent() {
      console.log('送出確認');
    }
  }
}
</script>

<style lang="stylus">
.trade-match
  background-color $light
  padding 1em
  &__desc
    display flex
  &__list
    width 50%
  &__check-btns
    display flex
  &__check-btn
    width 20%
</style>
