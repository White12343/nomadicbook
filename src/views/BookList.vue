<template>
  <section class="book-list mx-auto">
    <header class="book-list__header">
      <h2 class="book-list__tit">列表頁</h2>
    </header>
    <div class="book-list__cntr">
      <BookCard
        v-for="(item, key) in pdData"
        :key="key"
        :card-data="item"
        class="book-list__item"
        :class="{'mr-0': (key % 5) === 4}"
      />
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
  &__item
    width 19%
    margin-right 1.25%
    margin-top 1em
</style>
