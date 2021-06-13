<template>
  <section class="seek-manage">
    <!-- 顯示自己對對方要求交換的書，連結到對方產品頁 -->
    <header class="seek-manage__header">
      <h2 class="seek-manage__tit">我的徵求</h2>
    </header>
    <div class="seek-manage__cntr">
      <BookCard v-for="(item, key) in pdData" :key="key" :card-data="item" />
    </div>

  </section>
</template>

<script>
import { getSeekBookList } from "@/request/api";
import BookCard from '@/components/book/BookCard';

export default {
  name: 'SeekManage',
  data() {
    return {
      pdData: [],
    }
  },
  components: {
    BookCard,
  },
  created() {
    let vm = this;
    getSeekBookList()
      .then(res => {
        vm.pdData = res.data;
      })
      .catch(error => {
        console.log(error);
      })
  },
}
</script>

<style lang="stylus">
.seek-manage
  &__cntr
    display flex
    flex-wrap wrap
</style>
