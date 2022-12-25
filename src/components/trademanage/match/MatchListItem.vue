<template>
  <div>
    <div class="match-list-item__cntr">
      <v-row
        justify="center"
        align="center"
      >
        <v-col
          cols="12"
          sm="5"
          md="5"
          lg="5"
        >
          <v-row>
            <v-col
              cols="12"
              sm="5"
              md="5"
              lg="5"
              class="d-flex justify-space-between flex-column"
            >
              <router-link :to="{
                name: 'Detail',
                params: {
                  id: matchData.seek.seekBookId,
                }
              }">
                <v-img
                  class="mx-auto"
                  :src="`http://35.236.167.85/photo/${matchData.seek.seekBookPhoto}.jpg`"
                ></v-img>
              </router-link>
              <ConsignmentBtn

                v-if="!hideBtn"
                :isSent="matchData.seek.seekSend"
                :seekId="matchData.seekId"
              />
            </v-col>

            <v-col
              cols="12"
              sm="7"
              md="7"
              lg="7"
            >
              <article class="match-list__cntr">
                <header class="match-list__heaer">
                  <router-link class="match-list__link" :to="{
                    name: 'Detail',
                    params: {
                      id: matchData.seek.seekBookId,
                    }
                  }">
                    <h3 class="match-list__tit">{{matchData.seek.seekBookName}}</h3>
                  </router-link>

                  <h4 class="match-list__subtit">{{matchData.seek.seekAuthor}}</h4>
                </header>
                <div class="d-flex align-center">
                  {{matchData.seek.seekUserName}}

                </div>
                <p class="match-list__desc">{{matchData.seek.seekCondition}}</p>
                <ul>
                  <li><b>交易日期：</b>{{matchData.seek.seekDate}}</li>
                  <li><b>交易資訊：</b>{{matchData.seek.seekToAddress + ' ' + matchData.seek.seekToName}}</li>
                  <li v-if="!hideRating" class="d-flex align-center"><b>評價：</b>
                    <v-rating
                      v-if="matchData.seek.evaluation"
                      :value="matchData.seek.evaluation"
                      class="d-flex align-center"
                      color="warning"
                      background-color="warning"
                      empty-icon="mdi-star-outline"
                      half-icon="mdi-star-half"
                      half-increments
                      readonly
                      dense
                      size="16"
                    ></v-rating>
                  </li>

                </ul>
              </article>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="12"
          sm="2"
          md="2"
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
          <Message class="btn" :seekId="matchData.seekId" :userId="matchData.seek.seekUserId"/>
        </v-col>

        <v-col
          cols="12"
          sm="5"
          md="5"
          lg="5"
        >
          <v-row>
            <v-col
              cols="12"
              sm="5"
              md="5"
              lg="5"
              class="d-flex justify-space-between flex-column"
            >
              <router-link :to="{
                name: 'Detail',
                params: {
                  id: matchData.seeked.seekBookId,
                }
              }">
                <v-img
                  class="mx-auto"
                  :src="`http://35.236.167.85/photo/${matchData.seeked.seekBookPhoto}.jpg`"
                ></v-img>
              </router-link>
              <ReceiveBtn v-if="!hideBtn" :isSent="matchData.seek.seekReceive" :seekId="matchData.seekId"/>
            </v-col>

            <v-col
              cols="12"
              sm="7"
              md="7"
              lg="7"
            >
              <article class="match-list__cntr">
                <header class="match-list__heaer">
                  <router-link class="match-list__link" :to="{
                    name: 'Detail',
                    params: {
                      id: matchData.seeked.seekBookId,
                    }
                  }">
                    <h3 class="match-list__tit">{{matchData.seeked.seekBookName}}</h3>
                  </router-link>

                  <h4 class="match-list__subtit">{{matchData.seeked.seekAuthor}}</h4>
                </header>
                <div class="d-flex align-center">
                  {{matchData.seeked.seekUserName}}
                </div>
                <p class="match-list__desc">{{matchData.seeked.seekCondition}}</p>
                <ul>
                  <li><b>交易日期：</b>{{matchData.seeked.seekDate}}</li>
                  <li><b>交易資訊：</b>{{matchData.seeked.seekToAddress + ' ' + matchData.seeked.seekToName}}</li>
                  <li v-if="!hideRating" class="d-flex align-center"><b>評價：</b>
                    <v-rating
                      v-if="matchData.seeked.evaluation"
                      :value="matchData.seeked.evaluation"
                      class="d-flex align-center"
                      color="warning"
                      background-color="warning"
                      empty-icon="mdi-star-outline"
                      half-icon="mdi-star-half"
                      half-increments
                      readonly
                      dense
                      size="16"
                    ></v-rating>
                  </li>
                </ul>
              </article>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-expansion-panel-header expand-icon="mdi-menu-down">
      <v-subheader class="match-list-item__more-tit">查看詳情</v-subheader>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <h3 class="text-h5 font-weight-bold mt-3 ml-4 mb-1">詳細交易資訊</h3>
      <v-divider></v-divider>
      <Match :match-data="matchData"/>
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
  &__link
    color #000 !important
    &:hover
      text-decoration underline

.match-list-item
  &__cntr
    padding 2em
  &__more-tit
    height auto
    justify-content flex-end
</style>

