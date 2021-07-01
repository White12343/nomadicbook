<template>
  <section class="record">
    <MatchList v-if="records.length" :match-data="records" :hideBtn="true"/>
  </section>
</template>

<script>
import { getRecord } from "@/request/api";
import Match from '@/components/trademanage/match/Match';
import MatchList from '@/components/trademanage/match/MatchList';
export default {
  name: 'Record',
  data: () => ({
    records: [],
  }),
  created() {
    getRecord(this.$cookies.get('user').id)
      .then(res => {
        this.records = res.data;
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      })
  },
  components: {
    Match,
    MatchList,
  }
}
</script>

<style lang="stylus">
.record
  &__tit
    font-weight bold
    font-size 1.2em
    height 66px
    textHiding(2)
  &__subtit
    color $text-secondary
  &__cntr
    line-height 1.7
</style>
