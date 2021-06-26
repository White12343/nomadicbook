<template>
  <section class="record">
    <v-row justify="center my-6">
      <v-expansion-panels tile light>
        <v-expansion-panel
          v-for="(item,i) in records"
          :key="i"
        >
          <v-expansion-panel-header>
            <v-row align="center">
              <v-col
                cols="12"
                sm="2"
                md="2"
                lg="2"
              >
                <v-img
                  class="mx-auto"
                  max-width="150"
                  :src="`http://35.236.167.85/photo/${item.seeked.seekBookPhoto}.jpg`"
                ></v-img>
              </v-col>

              <v-col
                cols="12"
                sm="10"
                md="10"
                lg="10"
              >
                <article class="record__cntr">
                  <header class="record__heaer">
                    <h3 class="mb-3">交易日期：{{item.seeked.seekDate}}</h3>
                    <h3 class="record__tit">{{item.seeked.seekBookName}}</h3>
                    <h4 class="record__subtit">{{item.seeked.seekAuthor}}</h4>
                  </header>
                  <p class="record__desc">{{item.seeked.seekCondition}}</p>
                  <h5>交易資訊：{{item.seeked.seekToAddress + ' ' + item.seeked.seekToName}}</h5>
                </article>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-divider></v-divider>
            <h3 class="record__tit mt-3 ml-4">詳細資訊</h3>
            <Match :match-data="item" :record="true" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </section>
</template>

<script>
import { getRecord } from "@/request/api";
import Match from '@/components/trademanage/match/Match';
export default {
  name: 'Record',
  data: () => ({
    records: [],
  }),
  created() {
    getRecord(this.$cookies.get('user').id)
      .then(res => {
        this.records = res.data;
      })
      .catch(error => {
        console.log(error);
      })
  },
  components: {
    Match,
  }
}
</script>

<style lang="stylus">
.record
  &__tit
    font-weight bold
    font-size 1.3em
  &__subtit
    color $text-secondary
  &__cntr
    line-height 1.7
</style>
