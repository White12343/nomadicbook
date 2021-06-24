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
      interval="10000"
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
            <v-row
              justify="center"
            >
              <v-col
                cols="12"
                lg="3"
              >
                <BookCard
                  :card-data="item"
                  class="ml-3"
                />
              </v-col>
              <v-col
                cols="12"
                lg="9"
              >
                <h3 class="exp__book-name text-h5">{{item.bookName}}</h3>
                <h4 class="exp__book-name fs-6 mt-1">{{item.experienceDay}}</h4>
                <p class="exp__desc fs-5 mt-6 mr-3">
                  {{item.experience}}
                  <!-- Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae amet placeat laborum! Qui minima alias excepturi odit, officia tenetur ea doloremque ratione nulla saepe incidunt repellendus nesciunt, omnis aut ipsa.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio tenetur nihil architecto! Provident, fugit asperiores labore dolorum sint quia earum amet saepe id aliquam rem dignissimos architecto sequi placeat ad. -->
                </p>
              </v-col>
            </v-row>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </article>
</template>

<script>
import { getExperienceList } from "@/request/api";
import BookCard from '@/components/book/BookCard';
export default {
  name: 'Exp',
  data() {
    return {
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
      expData: [],
    }
  },
  components: {
    BookCard,
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
