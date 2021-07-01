<template>
  <section class="match-list">
    <v-row justify="center" class="my-6">
      <v-expansion-panels tile light>
        <v-expansion-panel
          v-for="(item,i) in matchData"
          :key="i"
        >
          <MatchListItem :matchData="item"/>
          <!-- <v-expansion-panel-header>
            <v-row
              justify="center"
              align="center"
            >
              <v-col
                cols="12"
                lg="5"
              >
                <v-row align="center">
                  <v-col
                    cols="12"
                    sm="5"
                    md="5"
                    lg="5"
                  >
                    <v-img
                      class="mx-auto"
                      max-width="150"
                      :src="`http://35.236.167.85/photo/${item.seek.seekBookPhoto}.jpg`"
                    ></v-img>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="7"
                    md="7"
                    lg="7"
                  >
                    <article class="match-list__cntr">
                      <header class="match-list__heaer">
                        <h3 class="match-list__tit">{{item.seek.seekBookName}}</h3>
                        <h4 class="match-list__subtit">{{item.seek.seekAuthor}}</h4>
                      </header>
                      <div class="d-flex align-center">
                        {{item.seek.seekUserName}}
                        <v-rating
                          v-if="item.seek.evaluation"
                          :value="item.seek.evaluation"
                          class="ml-2"
                          color="warning"
                          background-color="warning"
                          empty-icon="mdi-star-outline"
                          half-icon="mdi-star-half"
                          half-increments
                          readonly
                          dense
                          size="16"
                        ></v-rating>
                      </div>
                      <p class="match-list__desc">{{item.seek.seekCondition}}</p>
                      <ul>
                        <li><b>交易日期：</b>{{item.seek.seekDate}}</li>
                        <li><b>交易資訊：</b>{{item.seek.seekToAddress + ' ' + item.seek.seekToName}}</li>

                      </ul>
                    </article>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="12"
                lg="2"
                class="text-center"
              >
                <v-icon
                  size="100"
                  class="mx-auto"
                  disabled
                >
                  mdi-arrow-left-right-bold
                </v-icon>
              </v-col>

              <v-col
                cols="12"
                lg="5"
              >
                <v-row align="center">
                  <v-col
                    cols="12"
                    sm="5"
                    md="5"
                    lg="5"
                  >
                    <v-img
                      class="mx-auto"
                      max-width="150"
                      :src="`http://35.236.167.85/photo/${item.seeked.seekBookPhoto}.jpg`"
                    ></v-img>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="7"
                    md="7"
                    lg="7"
                  >
                    <article class="match-list__cntr">
                      <header class="match-list__heaer">
                        <h3 class="match-list__tit">{{item.seeked.seekBookName}}</h3>
                        <h4 class="match-list__subtit">{{item.seeked.seekAuthor}}</h4>
                      </header>
                      <div class="d-flex align-center">
                        {{item.seeked.seekUserName}}
                        <v-rating
                          v-if="item.seeked.evaluation"
                          :value="item.seeked.evaluation"
                          class="ml-2"
                          color="warning"
                          background-color="warning"
                          empty-icon="mdi-star-outline"
                          half-icon="mdi-star-half"
                          half-increments
                          readonly
                          dense
                          size="16"
                        ></v-rating>
                      </div>
                      <p class="match-list__desc">{{item.seeked.seekCondition}}</p>
                      <ul>
                        <li><b>交易日期：</b>{{item.seeked.seekDate}}</li>
                        <li><b>交易資訊：</b>{{item.seeked.seekToAddress + ' ' + item.seeked.seekToName}}</li>
                      </ul>
                    </article>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <h3 class="match-list__tit mt-3 ml-4">詳細交易資訊</h3>
            <v-divider></v-divider>
            <Match :match-data="item"/>
          </v-expansion-panel-content> -->
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
    hasBtn: {
      type: Boolean,
      default: true,
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
