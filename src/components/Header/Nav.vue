<template>
  <nav class="menu">
    <div class="menu__cntr mx-auto">
      <!-- <router-link
        class="menu__link"
        @click.prevent
        :to="{name: 'BookList'}"
      >
        全部
      </router-link> -->
      <v-btn
        text
        tile
        :to="{name: 'BookList'}"
      >全部</v-btn>
      <v-menu
        open-on-hover
        offset-y
        tile
        eager
        v-for="nav, i in navItems"
        :key="i"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            tile
            class="nav__btn"
            v-bind="attrs"
            v-on="on"
          >
            {{nav.name}}
          </v-btn>
        </template>
        <v-list dense subheader>
          <v-list-item
            v-for="(item, index) in nav.medium"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item>
                <v-list-item-title class="font-bold">{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list-item-content>

          </v-list-item>
        </v-list>

      </v-menu>

    </div>
  </nav>
</template>

<script>
import { getCategory, getCategoryDetail } from "@/request/api";
export default {
  name: 'Nav',
  data() {
    return {
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      navItems: [
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
  },
  created() {
    this.navItems.forEach(item => {
      getCategory({
        mainId: item.id
      })
        .then(res => {
          res.data.forEach(key => {
            this.navItems[item.id - 1].medium.push({
              name: key,
              items: [],
            })
            // this.getCategoryDetail(item.id);
          })
        })
        .catch(error => {
          console.log(error);
        })
    })

  },
  methods: {
    getCategoryDetail(id) {
      // this.navItems[id - 1].medium.forEach(item => {
      //   getCategoryDetail({
      //     mainId: id,
      //     bigName: item.name
      //   })
      //     .then(res => {
      //       item.items = res.data;
      //     })
      //     .catch(error => {
      //       console.log(error);
      //     })
      // })
    }
  }
}
</script>

<style lang="stylus" scoped>
.menu
  background-color $bg-light
  box-shadow 0 3px 5px $shadow
  margin-bottom 2em
  &__cntr
    max-width 1200px
  &__link
    padding .6em 1em
    display block
    border 1px solid #333
.font-bold
  font-weight bold

</style>
