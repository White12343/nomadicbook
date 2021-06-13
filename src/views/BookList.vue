<template>
  <section class="book-list mx-auto">
    <header class="book-list__header">
      <h2 class="book-list__tit">列表頁</h2>
    </header>
    <div class="book-list__cntr">
      <BookCard v-for="(item, key) in pdData" :key="key" :card-data="item" />
    </div>
  </section>
</template>

<script>
import { getBookList } from "@/request/api";
import BookCard from '../components/book/BookCard';
export default {
  name: 'BookList',
  data() {
    return {
      pdData: []
    }
  },
  created() {
    let vm = this;
    getBookList()
      .then(res => {
        vm.pdData = res.data;
      })
      .catch(error => {
        console.log(error);
      })
  },
  components: {
    BookCard,
  }
}
</script>

<style lang="stylus" scoped>
.book-list
  &__cntr
    display flex
    flex-wrap wrap

</style>
