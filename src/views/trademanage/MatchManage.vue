<template>

  <section class="match-manage mt-6">
    <!--
      ## 交易媒合連結
      1. 左邊出現我方要交換的書，右邊出現對方要交換的書，中間用箭頭指示
      2. 底下直接有交易確認和交易資訊的按鈕
      3. 點交易資訊會進到交易媒合頁面
    -->
    <div class="match-manage__cntr">
      <v-row>
        <v-col
          v-for="(item, index) in matchData"
          :key="index"
          cols="12"
          sm="12"
          md="12"
          lg="6"
        >
          <Match
            :match-data="item"
            class="match-manage__item"
          />
        </v-col>
      </v-row>
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
</style>
