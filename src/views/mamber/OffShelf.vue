<template>
  <section class="off-shelf">
  <div class="booth__cntr mt-6">
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
        lg="3"
        v-for="(item, key) in getPageBook(page)" :key="key" >
        <BoothCard
          class="booth__item"
          :booth-data="item"
          :isOff="true"
          @resetShelf="getShelf"
          :isSelf="isSelf"
        />
      </v-col>
    </v-row>

    <div class="text-center mt-6">
      <v-pagination
        v-model="page"
        :length="getPage"
        :total-visible="7"
        @input="goPage"
      ></v-pagination>
    </div>
  </div>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    color="primary"
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="white"
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        關閉
      </v-btn>
    </template>
  </v-snackbar>
</section>
</template>

<script>
import { mapState } from "vuex";
import { getBoothBookList } from "@/request/api";
import BoothCard from '@/components/member/booth/BoothCard'
export default {
  name: 'OffShelf',
  data() {
    return {
      page: 1,
      each: 8,
      isSelf: false,
      pdData: [],
      snackbar: false,
      text: '重新下架成功',
      timeout: 2000,
    }
  },
  components: {
    BoothCard,
  },
  computed: {

    ...mapState([
      'isLogin',
      'user',
    ]),
    getPdData() {

      let arr = [];
      this.pdData.forEach(item => {
        if(!item.bookStatus){
          arr.push(item);
        }
      })

      return arr;
    },
    total() {
      if(!this.getPdData){
        return 0;
      }
      return this.getPdData.length;
    },
    getPage() {
      return Math.ceil(this.total / this.each);
    }
  },
  created() {
    if(this.user) {
      if(parseInt(this.$route.params.id) === parseInt(this.user.id)) {
        this.isSelf = true;
      }
    }
    let vm = this;
    getBoothBookList(this.$route.params.id)
      .then(res => {
        vm.pdData = res.data;
        if(this.$route.query.page) {
          this.page = parseInt(this.$route.query.page);
        }
      })
      .catch(error => {
        console.log(error);
      })
  },
  methods: {
    getShelf() {
      let vm = this;
      getBoothBookList(this.$route.params.id)
        .then(res => {
          vm.snackbar = true;
          vm.pdData = res.data;
        })
        .catch(error => {
          console.log(error);
        })
    },
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
      return this.getPdData.filter((item, i) => i >= min && i <= max);
    },
    goPage() {

      this.$router.push({
        name: 'OffShelf',
        params: {
          id: this.user.id,
        },
        query: {
          page: this.page,
        }
      })
    }
  }
}
</script>

<style lang="stylus">

</style>
