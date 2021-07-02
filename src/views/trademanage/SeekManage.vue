<template>
  <section class="seek-manage mt-6">
    <!-- <v-overlay :value="isLoading" z-index="0"></v-overlay> -->
    <div class="text-center" v-if="isLoading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <!-- 顯示自己對對方要求交換的書，連結到對方產品頁 -->
    <div class="seek-manage__cntr" v-else>
      <v-row v-if="pdData.length">
        <v-col
          v-for="(item, key) in pdData"
          :key="key"
          cols="12"
          sm="12"
          md="6"
          lg="3"
        >
          <SeekCard class="seek-manage__item" :seekData="item" />
        </v-col>
      </v-row>
      <v-subheader v-else>目前還沒有提出徵求</v-subheader>

    </div>

  </section>
</template>

<script>
import { getSeekBookList } from "@/request/api";
import SeekCard from '@/components/trademanage/seek/SeekCard';

export default {
  name: 'SeekManage',
  data() {
    return {
      pdData: [],
      isLoading: true,
    }
  },
  components: {
    SeekCard,
  },
  created() {
    let vm = this;
    getSeekBookList(this.$cookies.get('user').id)
      .then(res => {
        vm.pdData = res.data;
        this.isLoading = false;
      })
      .catch(error => {
        console.log(error);
        this.isLoading = false;
      })
  },
}
</script>

<style lang="stylus">
</style>
