<template>
  <section class="book-list mx-auto">
    <!-- <v-breadcrumbs :items="breadcrumbs" class="mb-6">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          :href="item.href"
          :disabled="item.disabled"
        >
          {{ item.text.toUpperCase() }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs> -->
    <div class="book-list__body">
      <v-row>
        <v-col
          cols="12"
          sm="12"
          md="3"
          lg="3"
          class="modify"
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

            <v-select
              :items="conditionNumList"
              item-text="text"
              item-value="value"
              label="新舊(以上)"
              v-model="conditionNum"
              clear-icon="mdi-close-circle-outline"
              clearable
            ></v-select>
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
                v-for="(item, key) in getPageBook(page)"
                :key="key"
              >
                <BookCard
                  :card-data="item"
                  class="book-list__item"
                />

              </v-col>
            </v-row>
          </div>
          <div class="text-center mt-6" v-if="getPage">
            <v-pagination
              v-model="page"
              :length="getPage"
            ></v-pagination>
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
  inject: ['reload'],
  data() {
    return {
      page: 1,
      each: 12,
      items: [
        {
          text: '9 成新',
          value: 9
        },
        {
          text: '8 成新',
          value: 8
        }
      ],
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
      conditionNum: 0,
      condition: [
        '近全新',
        '保存良好',
        '無劃記',
        '無泛黃',
        '無污損',
        '無摺角',
        '無碰撞',
        '無灰塵印',
        '無脫落缺頁',
        '無黃黑斑',
        '無大量黃黑斑',
        '膠膜未拆',
        '有附件',
        '未使用習題或著色本',
        '沒有書釘或膠貼'
      ],
      breadcrumbs: [
        {
          text: '全部',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '中文書',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: '心靈勵志',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
    }
  },
  computed: {
    conditionNumList() {
      let arr = [];
      for(let i = 9; i > 0; i--){
        arr.push({
          text: `${i} 成新`,
          value: i
        })
      }
      return arr;
    },
    category() {
      return {
        mainId: this.$route.params.mainId,
        bigCategory: this.$route.params.bigCategory
      }
    },
    numFilterList() {
      let arr = [...this.pdData];
      arr = arr.filter(item => item.conditionNum >= this.conditionNum);
      return arr;
    },
    filterList() {
      if(!this.filter.length){
        return this.numFilterList;
      }
      let arr = [...this.numFilterList];
      // let arr = [];
      // this.pdData.forEach(item => {
      //   if(item.condition) {
      //     arr.push(item);
      //   }
      // })
      if(this.conditionNum > 0) {
        this.filter.forEach(() => {
          arr = arr.filter(item => item.conditionNum >= this.conditionNum);
        })
      }
      this.filter.forEach(key => {
        arr = arr.filter(item => item.condition.includes(key));
      })
      return arr;
    },
    total() {
      if(!this.filterList){
        return 0;
      }
      return this.filterList.length;
    },
    getPage() {
      return Math.ceil(this.total / this.each);
    }
  },
  watch: {
    "category": {
      handler: function(val) {
        this.getBookListData(val);
      },
      deep: true,
    },
    $route() {
      this.reload();
    }
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
    },
    getPageBook(page) {
      if(page <= 0 || page > this.page){
        return;
      }
      let index = page - 1;
      let min = index * this.each;
      let max = min + (this.each - 1);
      if(max >= this.total) {
        max = this.total;
      }
      return this.filterList.filter((item, i) => i >= min && i <= max);
    }
  }
}
</script>

<style lang="stylus" scoped>

.font-bold
  font-weight bold
.modify
  margin-left -16px
  margin-right 16px
</style>
