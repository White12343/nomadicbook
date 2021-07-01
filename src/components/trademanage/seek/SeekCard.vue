<template>
  <article class="seek-card">
    <BookCard :card-data="bookData" :photoHeight="'280px'"/>
    <div class="seek-card__desc mb-3">
      <ul>
        <li><small>{{seekData.seekDate}}</small></li>
        <li><small>{{tradeMode}}</small></li>
      </ul>
    </div>
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

          <v-btn
            block
            color="primary"
            class="seek-card__btn"
            :to="{
              name: 'Detail',
              params: {
                id: bookData.bookId,
              }
            }"
          >
            產品細節
          </v-btn>
        </v-col>

      </v-row>
  </article>

</template>

<script>
import { putRefusal } from "@/request/api";
import BookCard from '@/components/book/BookCard';

export default {
  props: ['seekData'],
  inject: ['reload'],
  data() {
    return {
      isClickRefusal: false,
    }
  },
  components: {
    BookCard,
  },
  computed: {
    bookData() {
      return {
        bookId: this.seekData.seekBookId,
        bookName: this.seekData.seekBookName,
        bookPhoto: this.seekData.seekBookPhoto,
        conditionNum: this.seekData.conditionNum,
        condition: this.seekData.condition,
      }
    },
    tradeMode() {
      let str = '';
      switch(this.seekData.tradeMode) {
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
    refusal() {
      this.isClickRefusal = true;
      putRefusal(this.seekData.seekId)
        .then(res => {
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
.seek-card
  min-height 100%
</style>
