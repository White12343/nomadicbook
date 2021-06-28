<template>
  <article class="match-card">
    <v-row
      justify="space-between"
    >
      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="6"
      >
        <h3>自己的書</h3>
        <v-row align="center">
          <v-col
            cols="12"
            sm="12"
            md="4"
            lg="4"
          >
            <BookCard :card-data="selfBook"/>
            <v-dialog
              v-model="consignmentCheck"
              max-width="250"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  block
                  color="primary"
                  :disabled="matchData.seek.seekSend"
                  v-if="!record"
                  v-bind="attrs"
                  v-on="on"
                >
                  寄出
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="text-h5">
                  注意
                </v-card-title>
                <v-card-text>
                  請確認是否已寄出，確認後會通知對方您已寄出書籍。
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="grey darken-1"
                    text
                    @click="consignmentCheck = false"
                  >
                    取消
                  </v-btn>

                  <v-btn
                    color="primary"
                    text
                    @click="consignment"
                  >
                    確認
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="8"
            lg="8"
          >
            <v-list
            >
              <v-list-item
                v-for="(item, i) in selfInfo"
                :key="i"
                three-line
                dense
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.text"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>

      </v-col>

      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="6"
      >

        <h3>對方的書</h3>
        <v-row align="center">
          <v-col
            cols="12"
            sm="12"
            md="4"
            lg="4"
          >
            <BookCard :card-data="otherSideBook"/>
            <v-dialog
              v-model="receiveCheck"
              max-width="250"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  block
                  color="primary"
                  :disabled="matchData.seek.seekReceive"
                  v-if="!record"
                  v-bind="attrs"
                  v-on="on"
                >
                  收到
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="text-h5">
                  收到書籍
                </v-card-title>
                <v-card-text>
                  這次交易您還滿意嗎？
                  <v-rating
                    class="mt-3"
                    v-model="evaluation"
                    color="warning"
                    background-color="warning"
                    empty-icon="mdi-star-outline"
                    half-icon="mdi-star-half"
                    half-increments
                    size="16"
                    @input="receipt"
                  ></v-rating>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="grey darken-1"
                    text
                    @click="receiveCheck = false"
                  >
                    取消
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="8"
            lg="8"
          >
            <v-list
            >
              <v-list-item
                v-for="(item, i) in otherInfo"
                :key="i"
                three-line
                dense
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.text"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

  </article>

</template>

<script>
import { putConsignment, putReceipt, rating } from "@/request/api";
import BookCard from '@/components/book/BookCard';
export default {
  name: 'Match',
  inject: ['reload'],
  props: {
    matchData: Object,
    record: {
      type: Boolean,
      default: false,
      require: false,
    }
  },
  data() {
    return {
      consignmentCheck: false,
      receiveCheck: false,
      evaluation: 0,
    }
  },
  components: {
    BookCard,
  },
  created() {

  },
  computed: {
    selfBook() {
      return {
        bookId: this.matchData.seek.seekBookId,
        bookName: this.matchData.seek.seekBookName,
        bookPhoto: this.matchData.seek.seekBookPhoto,
        conditionNum: this.matchData.seek.seekConditionNum,
        condition: this.matchData.seek.seekCondition,
      }
    },
    otherSideBook() {
      return {
        bookId: this.matchData.seeked.seekBookId,
        bookName: this.matchData.seeked.seekBookName,
        bookPhoto: this.matchData.seeked.seekBookPhoto,
        conditionNum: this.matchData.seeked.seekConditionNum,
        condition: this.matchData.seeked.seekCondition,
      }
    },
    tradeMode() {
      let mode = '';
      switch(this.matchData.tradeMode) {
        case 1:
          mode = '7-11'
          break;
        case 2:
          mode = '宅配 ( 郵寄、黑貓 )'
          break;
        case 3:
          mode = 'i 郵箱'
          break;
        case 4:
          mode = '面交'
          break;
      }
      return mode;
    },
    selfInfo() {
      return [
        {
          title: '日期',
          text: this.matchData.seek.seekDate,
          icon: 'mdi-calendar-range'
        },
        {
          title: '交易方式',
          text: this.tradeMode,
          icon: 'mdi-handshake'
        },
        {
          title: '交易資訊',
          text: this.matchData.seek.seekToAddress
          + this.matchData.seek.seekToName,
          icon: 'mdi-information'
        },
        {
          title: '名字',
          text: this.matchData.seek.seekName,
          icon: 'mdi-account'
        },
        {
          title: '手機',
          text: this.matchData.seek.seekCellphone,
          icon: 'mdi-cellphone'
        },
      ]
    },
    otherInfo() {
      return [
        {
          title: '日期',
          text: this.matchData.seeked.seekDate,
          icon: 'mdi-calendar-range'
        },
        {
          title: '交易方式',
          text: this.tradeMode,
          icon: 'mdi-handshake'
        },
        {
          title: '交易資訊',
          text: this.matchData.seeked.seekToAddress
          + this.matchData.seeked.seekToName,
          icon: 'mdi-information'
        },
        {
          title: '名字',
          text: this.matchData.seeked.seekName,
          icon: 'mdi-account'
        },
        {
          title: '手機',
          text: this.matchData.seeked.seekCellphone,
          icon: 'mdi-cellphone'
        },
      ]
    }

  },
  methods: {
    consignment() {
      this.consignmentCheck = false;
      putConsignment(this.matchData.seekId, this.$cookies.get('user').id)
        .then(res => {
          this.reload();
        })
        .catch(error => {
          console.log(error);
          alert('失敗');
        })

    },
    receipt() {
      this.receiveCheck = false;
      const data = {
        userId: this.$cookies.get('user').id,
        evaluation: this.evaluation,
      }
      rating(this.matchData.seekId, data)
        .then(res => {
          putReceipt(this.matchData.seekId, this.$cookies.get('user').id)
            .then(res => {
              this.reload();
            })
            .catch(error => {
              console.log(error);
              alert('失敗');
            })
        })
        .catch(error => {
          console.log(error);
        })

    },
  }
}
</script>

<style lang="stylus">
.match-card
  background-color #fff
  padding 1em
</style>
