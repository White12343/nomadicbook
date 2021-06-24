<template>
  <article class="publish-day">
    <header class="publish-day__head">
      <h2 class="publish-day__tit text-h4 mb-2">
        最新出版
      </h2>
      <v-divider></v-divider>
    </header>
    <v-carousel
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
      hide-delimiters
    >
      <v-carousel-item
        v-for="i in page"
        :key="i"
      >
        <v-sheet
          height="100%"
        >
          <v-row
            class="fill-height"
            align="center"
          >
            <v-col
              cols="12"
              lg="3"
              v-for="item, index in getPageBook(i)"
              :key="index"
            >
              <BookCard
                :card-data="item"
              />
            </v-col>

          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </article>
</template>

<script>
import { getPublishDayList } from "@/request/api";
import BookCard from '@/components/book/BookCard';
export default {
  name: 'PublishDay',
  data() {
    return {
      bookData: [],
      each: 4,
    }
  },
  components: {
    BookCard,
  },
  created() {
    getPublishDayList({
      max: 20
    })
      .then(res => {
        this.bookData = res.data;
      })
      .catch(error => {
        console.log(error);
      })
  },
  computed: {
    total() {
      if(!this.bookData){
        return 0;
      }
      return this.bookData.length;
    },
    page() {
      return Math.ceil(this.total / this.each);
    }
  },
  methods: {
    getPageBook(page) {
      if(page <= 0 || page > this.page){
        return;
      }
      let index = page - 1;
      let min = index * this.each;
      let max = min + (this.each - 1);
      if(max >= this.total) {
        max = this.total;
      }
      return this.bookData.filter((item, i) => i >= min && i <= max);
    }
  }
}
</script>

<style>

</style>
