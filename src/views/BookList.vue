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
      pdData: [
        {
          id: '213546',
          name: 'The Midnight Library',
          author: 'Matt Haig',
          url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/7868/9781786892737.jpg',
        },
        {
          id: '546135',
          name: 'Jujutsu Kaisen, Vol. 4',
          author: 'Gege Akutami',
          url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/9747/9781974714803.jpg',
        },
        {
          id: '213546',
          name: 'The Midnight Library',
          author: 'Matt Haig',
          url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/7868/9781786892737.jpg',
        },
        {
          id: '546135',
          name: 'Jujutsu Kaisen, Vol. 4',
          author: 'Gege Akutami',
          url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/9747/9781974714803.jpg',
        },
        {
          id: '213546',
          name: 'The Midnight Library',
          author: 'Matt Haig',
          url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/7868/9781786892737.jpg',
        },
        {
          id: '546135',
          name: 'Jujutsu Kaisen, Vol. 4',
          author: 'Gege Akutami',
          url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/9747/9781974714803.jpg',
        },
      ]
    }
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
