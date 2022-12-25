<template>
  <section class="record">
    <div class="text-center" v-if="isLoading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else>
      <MatchList v-if="records.length" :match-data="records" :hideBtn="true"/>
    </div>
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
    isLoading: true,
  }),
  created() {
    getRecord(this.$cookies.get('user').id)
      .then(res => {
        this.records = res.data;
        this.isLoading = false;
      })
      .catch(error => {
        console.log(error);
        this.isLoading = false;
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
