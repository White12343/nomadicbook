<template>

  <section class="match-manage mt-6">


    <div class="text-center" v-if="isLoading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else>
      <MatchList v-if="matchData.length" :match-data="matchData"/>
    </div>
  </section>
</template>

<script>
import { getMatchList } from "@/request/api";
import Match from '@/components/trademanage/match/Match';
import MatchList from '@/components/trademanage/match/MatchList';
export default {
  name: 'MatchManage',
  data() {
    return {
      matchData: [],
      isLoading: true,
    }
  },
  created() {
    let vm = this;
    getMatchList(this.$cookies.get('user').id)
      .then(res => {
        vm.matchData = res.data;
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
  },
}
</script>

<style lang="stylus">
.match-manage
  &__divider
    border-color rgba(0,0,0,.5) !important
    border-style dashed !important
</style>
