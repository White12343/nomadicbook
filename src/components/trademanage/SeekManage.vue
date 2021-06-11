<template>
  <section class="seek-manage">
    <header class="seek-manage__header">
      <h2 class="seek-manage__tit">我的徵求</h2>
    </header>
    <SlideList>
      <BookCard v-for="(item, key) in pdData" :key="key" :card-data="item" />
    </SlideList>
  </section>
</template>

<script>
import SlideList from '../book/SlideList';
import BookCard from '../book/BookCard';

export default {
  name: 'SeekManage',
  data() {
    return {
      pdData: [],
    }
  },
  components: {
    SlideList,
    BookCard,
  },
  created() {
    const path = '/static/json/pd.json';
    let vm = this;
    this.$http.get(path).then(res => {
      vm.pdData = res.data;
    })
  },
}
</script>

<style lang="stylus">
.seek-manage
  &__cntr
    overflow hidden
  &__list
    display flex
    flex-wrap nowrap
    transition all .5s
</style>
