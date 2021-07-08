<template>
  <article class="ask-card">
    <BookCard :card-data="bookData" :photoHeight="'280px'" :seekStatus="askData.seekStatus"/>
    <div class="ask-card__desc mb-3">
      <ul>
        <li><v-icon class="mr-1">mdi-calendar-range</v-icon>{{askData.seekDate}}</li>
        <li><v-icon class="mr-1">mdi-handshake</v-icon>{{tradeMode}}</li>
      </ul>
    </div>
    <div class="ask-card__cntr">

      <v-row justify="center">
        <v-col
          cols="12"
          sm="12"
          md="6"
          lg="6"
        >
          <v-btn
            block
            outlined
            color="red white--text"
            @click="refusal"
            :disabled="isClickRefusal"
            :loading="isClickRefusal"
          >
            拒絕
          </v-btn>
        </v-col>

        <v-col
          cols="12"
          sm="12"
          md="6"
          lg="6"
        >
          <template>
            <div class="text-center">
              <v-dialog
                v-model="dialog"
                width="1200"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    block
                    color="primary"
                    class="ask-card__btn"
                    :disabled="!askData.seekStatus"
                    v-bind="attrs"
                    v-on="on"
                  >
                    去選書
                  </v-btn>
                </template>

                <v-card
                  class="stall overflow-hidden"
                >
                  <v-card-title class="stall__header text-h5 grey lighten-2">
                    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                    對方攤位
                  </v-card-title>

                  <v-card-text v-if="pdData.length !== 0">
                    <v-navigation-drawer
                      v-model="drawer"
                      absolute
                      bottom
                      temporary
                    >
                      <v-list
                        nav
                        dense
                      >
                        <v-list-item-group
                          color="primary"
                        >
                          <v-list-item-title class="ml-2 black--text text-h6">
                            書攤列表
                          </v-list-item-title>
                          <v-divider class="mb-3"></v-divider>
                          <v-list-item
                            v-for="(item, i) in pdData"
                            :key="i"
                            @click.prevent="bookDetail(item.bookId)"
                          >
                            <v-list-item-content>
                              <v-list-item-title v-text="item.bookName"></v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-navigation-drawer>
                    <BookPic :book-photo="pdDetail.bookPhotos" :book-name="pdDetail.bookName"/>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="12"
                        md="9"
                        lg="9"
                      >
                        <BookInfo
                          :bookDesc="pdDetail"
                          :popupOpen="false"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="3"
                        lg="3"
                      >
                        <DetailTrade
                          :book-id="parseInt(pdDetail.bookId)"
                          :bookDesc="pdDetail"
                          :popupOpen="false"
                          class="ask-detail__trade"
                          @exchange="requestExchange"
                        />

                      </v-col>
                    </v-row>
                    <BookCntr cntr-title="書況" :cntr="pdDetail.condition" />
                    <BookCntr cntr-title="簡介" :cntr="pdDetail.introduction" />
                  </v-card-text>
                  <v-card-text v-else class="text-center my-6">
                    目前對方還沒有書喔
                  </v-card-text>
                </v-card>
              </v-dialog>
            </div>
          </template>
        </v-col>

      </v-row>

    </div>
  </article>

</template>

<script>
import { mapState } from "vuex";
import { getBookDetail, getAskBoothBookList, selectedBook, putRefusal } from "@/request/api";
import BookCard from '@/components/book/BookCard';
import AskStall from '@/components/trademanage/ask/AskStall';
import BookPic from '@/components/detail/BookPic';
import BookInfo from '@/components/detail/BookInfo';
import BookCntr from '@/components/detail/BookCntr';
import DetailTrade from '@/components/detail/DetailTrade';

export default {
  inject: ['reload'],
  props: ['askData'],
  data() {
    return {
      isOpenPopup: false,
      dialog: false,
      pdData: [],
      pdDetail: {},
      drawer: true,
      isClickRefusal: false,
    }
  },
  watch: {
    group () {
      this.drawer = false
    },
  },
  components: {
    BookCard,
    AskStall,

    BookPic,
    BookInfo,
    BookCntr,
    DetailTrade,
  },
  created() {
    let vm = this;
    getAskBoothBookList(this.askData.seekUserId, this.askData.tradeMode)
      .then(res => {
        vm.pdData = res.data;
        vm.bookDetail(vm.pdData[0].bookId)
      })
      .catch(error => {
        console.log(error);
      })
  },
  computed: {
    ...mapState([
      'isLogin',
      'user',
    ]),
    bookData() {
      return {
        bookId: this.askData.seekBookId,
        bookName: this.askData.seekBookName,
        bookPhoto: this.askData.seekBookPhoto,
        conditionNum: this.askData.conditionNum,
        condition: this.askData.condition,
      }
    },
    tradeMode() {
      let str = '';
      switch(this.askData.tradeMode) {
        case 1:
          str = '7-11';
          break;
        case 2:
          str = '宅配 ( 郵寄、黑貓 )';
          break;
        case 3:
          str = 'i郵箱';
          break;
        case 4:
          str = '面交';
          break;

      }
      return str;
    }
  },
  methods: {
    bookDetail(id) {
      let vm = this;
      getBookDetail(id)
        .then(res => {
          vm.pdDetail = res.data;
        })
        .catch(error => {
          console.log(error);
        })
    },
    requestExchange(id) {
      const exchangeData = {
        bookId: id,
        tradeMode: this.askData.tradeMode
      }
      selectedBook(this.askData.seekId, exchangeData)
        .then(res => {

          alert(res.data);
          this.dialog = false;
          this.reload();
        })
        .catch(error => {
          console.log(error);
        })
    },
    refusal() {
      this.isClickRefusal = true;
      putRefusal(this.askData.seekId, this.user.id)
        .then(res => {
          console.log(res);
          this.reload();
        })
        .catch(error => {
          this.isClickRefusal = false;
          console.log(error);
        })
    }
  }
}
</script>

<style lang="stylus">
// .stall
//   position relative !important
//   &__header
//     position fixed
//     top 0
//     left 0
//     right 0

</style>
