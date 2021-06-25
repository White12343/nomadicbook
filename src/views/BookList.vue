<template>
  <section class="book-list mx-auto">
    <div class="book-list__body">
      <v-row>
        <v-col
          cols="12"
          sm="12"
          md="3"
          lg="3"
        >
          <!-- <SideList/> -->
          <v-list>
            <v-list-group
              v-for="item in manu"
              :key="item.title"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title" class="font-bold"></v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="child in item.items"
                :key="child"
                :to="{
                  name: 'BookList',
                  params: {
                    mainId: item.id,
                    bigCategory: child
                  }
                }"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="child"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>
          <div class="filter p-1">
            <v-checkbox
              v-for="item, index in condition"
              :key="index"
              v-model="filter"
              :label="item"
              :value="item"
              hide-details
            ></v-checkbox>
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="9"
          lg="9"
        >
          <div class="book-list__cntr" v-if="pdData[0]">
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="4"
                lg="3"
                v-for="(item, key) in filterList"
                :key="key"
              >
                <BookCard
                  :card-data="item"
                  class="book-list__item"
                />
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script>
import { getBookList, getCategory, search } from "@/request/api";
import SideList from '@/components/home/SideList';
import BookCard from '../components/book/BookCard';
export default {
  name: 'BookList',
  data() {
    return {
      manu: [
        {
          items: [],
          title: '中文書',
          id: 1,
        },
        {
          items: [],
          title: '簡體書',
          id: 2,
        },
        {
          items: [],
          title: '外文書',
          id: 3,
        },
      ],
      pdData: [],
      filter: [],
      condition: [
        '破損',
        '包書套',
        '泛黃',
        '有做筆記',
      ],
    }
  },
  computed: {
    category() {
      return {
        mainId: this.$route.params.mainId,
        bigCategory: this.$route.params.bigCategory
      }
    },
    filterList() {
      if(!this.filter.length){
        return this.pdData;
      }
      let arr = [];
      this.pdData.forEach(item => {
        if(item.condition) {
          arr.push(item);
        }
      })
      this.filter.forEach(key => {
        arr = arr.filter(item => item.condition.includes(key));
      })
      return arr;
    }
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
    if(this.$route.query.keyword){
      search({
        keyWord: this.$route.query.keyword
      })
        .then(res => {
          this.pdData = res.data;
        })
        .catch(error => {
          console.log(error);
        })
    }else {
      this.getBookListData(this.category);
    }
    this.manu.forEach(item => {
      getCategory({
        mainId: item.id
      })
        .then(res => {
          item.items = res.data;
        })
        .catch(error => {
          console.log(error);
        })
    })
  },
  updated() {
    if(this.$route.query.keyword){
      search({
        keyWord: this.$route.query.keyword
      })
        .then(res => {
          this.pdData = res.data;
        })
        .catch(error => {
          console.log(error);
        })
    }else {
      this.getBookListData(this.category);
    }
  },
  components: {
    SideList,
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
  &__cntr
    display flex
    flex-wrap wrap
  // &__item
  //   width 23%
  //   margin-right 1%
  //   margin-left 1%
  //   margin-bottom 1em
  //   transition all .3s
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

.font-bold
  font-weight bold
</style>
