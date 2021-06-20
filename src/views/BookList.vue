<template>
  <section class="book-list mx-auto">
    <header class="book-list__header">
      <h2 class="book-list__tit">列表頁</h2>
    </header>
    <div class="book-list__body">
      <aside class="book-list__aside aside-nav">
        <article class="aside-nav__cntr" v-for="item , index in menuJsonData.sub" :key="index">
          <header class="aside-nav__header">
            <h3 class="aside-nav__tit fs-5">
              <router-link
                class="aside-nav__tit-link"
                :to="{
                  name: 'BookList',
                  params: {
                    mainId: item.id,
                  }
                }"
              >{{item.name}}</router-link>
            </h3>
          </header>
          <nav class="aside-nav__desc">
            <router-link class="aside-nav__link"
              :to="{
                name: 'BookList',
                params: {
                  mainId: item.id,
                  bigCategory: subItem
                }
              }"
              v-for="subItem, subIndex in item.medium"
              :key="subIndex"
            >
              {{subItem}}
            </router-link>
          </nav>
        </article>
      </aside>
      <div class="book-list__cntr" v-if="pdData[0]">
        <BookCard
          v-for="(item, key) in pdData"
          :key="key"
          :card-data="item"
          class="book-list__item"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { getBookList, getCategory } from "@/request/api";
import BookCard from '../components/book/BookCard';
export default {
  name: 'BookList',
  data() {
    return {
      pdData: [],
      menuJsonData: {
        name: '總分類',
        sub: [
          {
            name: '中文書',
            id: 1,
            medium: []
          },
          {
            name: '簡體書',
            id: 2,
            medium: []
          },
          {
            name: '外文書',
            id: 3,
            medium: []
          },
        ]
      }

    }
  },
  computed: {
    category() {
      return {
        mainId: this.$route.params.mainId,
        bigCategory: this.$route.params.bigCategory
      }
    },
  },
  watch: {
    "category": {
      handler: function(val) {
        this.getBookListData(val);
      },
      deep: true,
    },
  },
  created() {
    this.getBookListData(this.category);
    this.menuJsonData.sub.forEach(item => {
      getCategory({
        mainId: item.id
      })
        .then(res => {
          item.medium = res.data;
        })
        .catch(error => {
          console.log(error);
        })
    })
  },
  components: {
    BookCard,
  },
  methods: {
    getBookListData(val) {
      let vm = this;
      getBookList(val)
        .then(res => {
          vm.pdData = res.data;
        })
        .catch(error => {
          vm.pdData = [];
          console.log(error);
        })
    }
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
    height 100%
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
    &-link
      color $text-primary
  &__cntr
    margin-bottom 1em
  &__link
    display block
</style>
