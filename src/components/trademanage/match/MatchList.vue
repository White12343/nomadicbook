<template>
  <section class="match-list">
    <v-row justify="center" class="my-6">
      <v-expansion-panels tile>
        <v-expansion-panel
          v-for="(item,i) in matchData"
          :key="i"
        >
          <MatchListItem :matchData="item" :hideBtn="hideBtn" :hideRating="hideRating"/>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </section>
</template>

<script>
import Match from '@/components/trademanage/match/Match';
import MatchListItem from '@/components/trademanage/match/MatchListItem';
export default {
  name: 'MatchList',
  inject: ['reload'],
  props: {
    matchData: {
      type: Array,
      default: [],
    },
    hideBtn: {
      type: Boolean,
      default: false,
      require: false,
    },
    hideRating: {
      type: Boolean,
      default: false,
      require: false,
    }
  },
  data() {
    return {
    }
  },
  components: {
    Match,
    MatchListItem,
  },
  methods: {

  }
}
</script>

<style lang="stylus">
.match-list
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
