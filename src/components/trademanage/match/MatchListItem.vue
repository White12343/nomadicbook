<template>
  <div><Message :seekId="matchData.seekId" :userId="matchData.seek.seekUserId"/>
    <v-expansion-panel-header>
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
                :src="`http://35.236.167.85/photo/${matchData.seek.seekBookPhoto}.jpg`"
              ></v-img>
              <ConsignmentBtn :isSent="matchData.seek.seekSend" :seekId="matchData.seekId"/>
            </v-col>

            <v-col
              cols="12"
              sm="7"
              md="7"
              lg="7"
            >
              <article class="match-list__cntr">
                <header class="match-list__heaer">
                  <h3 class="match-list__tit">{{matchData.seek.seekBookName}}</h3>
                  <h4 class="match-list__subtit">{{matchData.seek.seekAuthor}}</h4>
                </header>
                <div class="d-flex align-center">
                  {{matchData.seek.seekUserName}}
                  <v-rating
                    v-if="matchData.seek.evaluation"
                    :value="matchData.seek.evaluation"
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
                <p class="match-list__desc">{{matchData.seek.seekCondition}}</p>
                <ul>
                  <li><b>交易日期：</b>{{matchData.seek.seekDate}}</li>
                  <li><b>交易資訊：</b>{{matchData.seek.seekToAddress + ' ' + matchData.seek.seekToName}}</li>

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
                :src="`http://35.236.167.85/photo/${matchData.seeked.seekBookPhoto}.jpg`"
              ></v-img>
              <ReceiveBtn :isSent="matchData.seek.seekReceive" :seekId="matchData.seekId"/>
            </v-col>

            <v-col
              cols="12"
              sm="7"
              md="7"
              lg="7"
            >
              <article class="match-list__cntr">
                <header class="match-list__heaer">
                  <h3 class="match-list__tit">{{matchData.seeked.seekBookName}}</h3>
                  <h4 class="match-list__subtit">{{matchData.seeked.seekAuthor}}</h4>
                </header>
                <div class="d-flex align-center">
                  {{matchData.seeked.seekUserName}}
                  <v-rating
                    v-if="matchData.seeked.evaluation"
                    :value="matchData.seeked.evaluation"
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
                <p class="match-list__desc">{{matchData.seeked.seekCondition}}</p>
                <ul>
                  <li><b>交易日期：</b>{{matchData.seeked.seekDate}}</li>
                  <li><b>交易資訊：</b>{{matchData.seeked.seekToAddress + ' ' + matchData.seeked.seekToName}}</li>
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
      <Match :match-data="matchData" :record="true"/>
    </v-expansion-panel-content>
  </div>
</template>

<script>
import Match from '@/components/trademanage/match/Match';
import ConsignmentBtn from '@/components/trademanage/match/ConsignmentBtn';
import ReceiveBtn from '@/components/trademanage/match/ReceiveBtn';
import Message from '@/components/trademanage/match/Message';
export default {
  name: 'MatchList',
  inject: ['reload'],
  props: {
    matchData: {
      type: Object,
      default: [],
    },
  },
  data() {
    return {
    }
  },
  components: {
    Match,
    ConsignmentBtn,
    ReceiveBtn,
    Message,
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

