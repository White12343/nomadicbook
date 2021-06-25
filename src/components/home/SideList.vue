<template>
  <aside class="side-list modify">
    <!-- 列表 -->
    <v-list>
      <v-list-group
        v-for="item in manu"
        :key="item.title"
        v-model="item.active"
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
    <!-- 篩選 -->
    <div class="filter p-1" v-if="openFilter">
      <v-checkbox
        v-for="item, index in condition"
        :key="index"
        v-model="filter"
        :label="item"
        :value="item"
        hide-details
      ></v-checkbox>
    </div>
  </aside>
</template>

<script>
import { getCategory } from "@/request/api";
export default {
  name: 'SideList',
  props: {
    openFilter: {
      type: Boolean,
      default: true,
      require: false,
    }
  },
  data() {
    return {
      manu: [
        {
          items: [],
          title: '中文書',
          active: true,
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
  // watch: {
  //   "category": {
  //     handler: function(val) {
  //       this.getBookListData(val);
  //     },
  //     deep: true,
  //   },
  // },
  created() {
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
}
</script>

<style lang="stylus">
.font-bold
  font-weight bold
.modify
  margin-left -16px
  margin-right 16px
</style>
