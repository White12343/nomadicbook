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
                <p class="exp__desc fs-5 mt-6">
                  {{item.experience}}
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
      expData: [
        {
          author: "傑夫．貝佐斯",
          bookId: 30,
          bookName: "創造與漫想：亞馬遜創辦人貝佐斯親述，從成長到網路巨擘的選擇、經營與夢想【《賈伯斯傳》作者艾薩克森 Walter Isaacson 導讀】",
          bookPhoto: "20210624025323300",
          condition: "破損,泛黃",
          conditionNum: 9,
          experience: "很好看，值得多看",
          experienceDay: "2021-04-30",
        }
      ],
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
