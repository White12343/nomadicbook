<template>
  <section class="ask-manage mt-6">
    <div class="ask-manage__cntr">
      <v-row>
        <v-col
          v-for="(item, index) in askData"
          :key="index"
          cols="12"
          sm="12"
          md="6"
          lg="3"
        >
          <AskCard class="ask-manage__item" :ask-data="item" />
        </v-col>
      </v-row>

    </div>


  </section>
</template>

<script>

import { getAskBookList } from "@/request/api";
import AskCard from '@/components/trademanage/ask/AskCard';

export default {
  name: 'AskManage',
  data() {
    return {
      askData: [],
      isOpenPopup: false,
    }
  },
  components: {
    AskCard,
  },
  created() {
    let vm = this;
    getAskBookList(this.$cookies.get('user').id)
      .then(res => {
        vm.askData = res.data;
      })
      .catch(error => {
        console.log(error);
      })

  }

}
</script>

<style lang="stylus">
</style>
