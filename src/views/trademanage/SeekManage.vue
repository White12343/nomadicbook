<template>
  <section class="seek-manage mt-6">
    <!-- 顯示自己對對方要求交換的書，連結到對方產品頁 -->
    <div class="seek-manage__cntr">
      <v-row>
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
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      })
  },
}
</script>

<style lang="stylus">
</style>
