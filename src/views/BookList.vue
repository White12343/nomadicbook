<template>
  <section class="book-list mx-auto">
    <header class="book-list__header">
      <h2 class="book-list__tit">列表頁</h2>
    </header>
    <div class="book-list__body">
      <aside class="book-list__aside aside-nav">
        <article class="aside-nav__cntr" v-for="item , index in menuJsonData[0].sub" :key="index">
          <header class="aside-nav__header">
            <h3 class="aside-nav__tit fs-5">{{item.name}}</h3>
          </header>
          <nav class="aside-nav__desc">
            <router-link class="aside-nav__link" to="/booklist"
              v-for="subItem, subIndex in item.medium"
              :key="subIndex"
            >
              {{subItem}}
            </router-link>
          </nav>
        </article>
      </aside>
      <div class="book-list__cntr">
        <BookCard
          v-for="(item, key) in pdData"
          :key="key"
          :card-data="item"
          class="book-list__item"
        />

          <!-- :class="{'mr-0': (key % 5) === 4}" -->
      </div>
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
      pdData: [],
      menuJsonData: [
        {
          name: '總分類',
          sub: [
            {
              name: '中文書',
              medium: [
                "文學小說",
                "輕小說",
                "漫畫",
                "商業理財",
                "心靈勵志",
                "人文",
                "語言",
                "藝術設計",
                "教科書"
              ]
            },
            {
              name: '外文書',
              medium: [
                "文學小說",
                "輕小說",
                "漫畫",
                "商業理財",
                "心靈勵志",
                "人文",
              ]
            },
            {
              name: '簡體書',
              medium: [
                "心靈勵志",
                "人文",
                "語言",
                "藝術設計",
                "教科書"
              ]
            },
          ]
        }
      ]
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
  &__body
    display flex
  &__aside
    min-width 20%
    margin-right 1em
    background-color $light
  &__cntr
    box-shadow 0px 0px 5px $shadow
    background-color $light
    padding 1em
    display flex
    flex-wrap wrap
  &__item
    width 23%
    margin-right 1%
    margin-left 1%
    margin-bottom 1em
    transition all .3s
    &:hover
      box-shadow 0px 0px 5px $shadow
.aside-nav
  &__tit
    font-weight bold
    border-bottom 2px solid $shadow
    margin-bottom .6em
  &__cntr
    margin-bottom 1em
  &__link
    display block
</style>
