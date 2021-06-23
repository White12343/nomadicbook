<template>
  <section class="off-shelf">
  <div class="booth__cntr mt-6">
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
        lg="3"
        v-for="(item, key) in getPdData" :key="key" >
        <BoothCard
          class="booth__item"
          :booth-data="item"
          :isOff="true"
          @resetShelf="getShelf"
          :isSelf="isSelf"
        />
      </v-col>
    </v-row>
  </div>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
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
    }
  },
  created() {
    if(parseInt(this.$route.params.id) === parseInt(this.user.id)) {
      this.isSelf = true;
    }
    let vm = this;
    getBoothBookList(this.$route.params.id)
      .then(res => {
        vm.pdData = res.data;
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
    }
  }
}
</script>

<style lang="stylus">

</style>
