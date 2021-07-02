<template>
  <section class="ask-manage mt-6">
    <!-- <v-overlay :value="isLoading" z-index="0"></v-overlay> -->
    <div class="text-center" v-if="isLoading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div class="ask-manage__cntr" v-else>
      <v-row v-if="askData.length">
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
      <v-subheader v-else>目前還沒有人徵求</v-subheader>

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
      isLoading: true,
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
        this.isLoading = false;
      })
      .catch(error => {
        console.log(error);
        this.isLoading = false;
      })

  }

}
</script>

<style lang="stylus">
</style>
