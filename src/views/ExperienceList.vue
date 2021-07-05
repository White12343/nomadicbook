<template>
  <section class="experience-list">
    <header class="experience-list__head mb-6">
      <!-- <h2 class="experience-list__tit mb-2">
        心得列表
      </h2>
      <v-divider></v-divider> -->
    </header>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="12"
        v-for="(item, i) in getPageBook(page)"
        :key="i"
      >
        <ExpCard :card-data="item"/>

        <v-divider
          v-if="i < getPageBook(page).length - 1"
          class="mt-6 mb-6"></v-divider>
      </v-col>

    </v-row>
    <div class="text-center my-6" v-if="getPage">
      <v-pagination
        v-model="page"
        :length="getPage"
        :total-visible="7"
        @input="goPage"
      ></v-pagination>
    </div>
  </section>
</template>

<script>
import { getExperienceList } from "@/request/api";
import ExpCard from '@/components/home/ExpCard';
export default {
  data() {
    return {
      page: 1,
      each: 4,
      expData: [],
    }
  },
  components: {
    ExpCard,
  },
  created() {
    getExperienceList()
      .then(res => {
        this.expData = res.data;
        if(this.$route.query.page) {
          this.page = parseInt(this.$route.query.page);
        }
      })
      .catch(error => {
        console.log(error);
      })
  },
  computed: {

    total() {
      if(!this.expData){
        return 0;
      }
      return this.expData.length;
    },
    getPage() {
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
      return this.expData.filter((item, i) => i >= min && i <= max);
    },
    goPage() {
      this.$router.push({
        name: 'ExperienceList',
        query: {
          page: this.page,
        }
      })
    }
  }
}
</script>

<style>

</style>
