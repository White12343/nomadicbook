<template>

  <section class="match-manage mt-6">
    <div class="match-manage__cntr">
      <v-row>
        <v-col
          v-for="(item, index) in matchData"
          :key="index"
          cols="12"
          sm="12"
          md="12"
          lg="12"
        >
          <Match
            :match-data="item"
            class="match-manage__item"
          />
          <v-divider
            v-if="index < matchData.length - 1"
            class="match-manage__divider mt-6 mb-6"></v-divider>
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
// .match-manage
//   background-color #fff
//   padding 1em
.match-manage
  &__divider
    border-color rgba(0,0,0,.5) !important
    border-style dashed !important
</style>
