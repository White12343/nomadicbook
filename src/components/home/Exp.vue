<template>
  <article class="exp">
    <header class="exp__head">
      <h2 class="exp__tit text-h4 mb-2">
        最新心得
      </h2>
      <v-divider></v-divider>
    </header>
    <v-carousel
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
      interval="100000"
      hide-delimiters
    >
      <v-carousel-item
        v-for="(item, i) in expData"
        :key="i"
      >
        <v-sheet
          height="100%"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
          <ExpCard :card-data="item"/>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </article>
</template>

<script>
import { getExperienceList } from "@/request/api";
import BookCard from '@/components/book/BookCard';
import ExpCard from '@/components/home/ExpCard';
export default {
  name: 'Exp',
  data() {
    return {
      expData: [],
    }
  },
  components: {
    BookCard,
    ExpCard,
  },
  created() {
    getExperienceList({
      max: 5
    })
      .then(res => {
        this.expData = res.data;
      })
      .catch(error => {
        console.log(error);
      })
  }

}
</script>

<style>

</style>
