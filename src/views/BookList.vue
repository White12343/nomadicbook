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
import BookCard from '../components/book/BookCard';
export default {
  name: 'BookList',
  data() {
    return {
      pdData: []
    }
  },
  created() {
    const path = '/static/json/pd.json';
    let vm = this;
    this.$http.get(path).then(res => {
      vm.pdData = res.data;
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
