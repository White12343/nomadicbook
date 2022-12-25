<template>
  <article class="match-card">
    <v-row
      justify="space-between"
    >
      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="6"
      >
        <!-- <h3 class="font-weight-bold">自己的書</h3> -->
        <v-list>
          <v-subheader>自己的書</v-subheader>
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

      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="6"
      >

        <!-- <h3 class="font-weight-bold">對方的書</h3> -->
        <v-list>
          <v-subheader>對方的書</v-subheader>
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

  </article>

</template>

<script>
import BookCard from '@/components/book/BookCard';
export default {
  name: 'Match',
  inject: ['reload'],
  props: {
    matchData: Object,
  },
  data() {
    return {
    }
  },
  components: {
    BookCard,
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

  }
}
</script>

<style lang="stylus">
.match-card
  background-color #fff
  padding 1em
.message
  &__body
    padding 0 1em
</style>
