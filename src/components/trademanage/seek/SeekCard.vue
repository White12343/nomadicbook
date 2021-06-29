<template>
  <article class="seek-card">
    <BookCard :card-data="bookData"/>
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
    }
  },
  methods: {
    refusal() {
      putRefusal(this.seekData.seekId)
        .then(res => {
          alert('已拒絕')
          this.reload();
        })
        .catch(error => {
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
