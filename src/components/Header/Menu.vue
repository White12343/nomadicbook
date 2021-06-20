<template>
  <nav class="menu">
    <div class="menu__cntr container mx-auto">
      <router-link class="menu__link" href="#"
        @click.prevent
        :to="{name: 'BookList'}"
      >
        {{ menuJsonData.name }}
        <!-- <nav class="submenu">
          <router-link href="#"
            class="submenu__link"
            @click.prevent
            v-for="(subItem, subKey) in item.sub" :key="subKey"
            :to="{
              name: 'BookList',
              params: {
                mainId: subItem.id,
              }
            }"
          >
            {{ subItem.name }}
            <nav class="medium-menu">
              <router-link class="medium-menu__link"
                :to="{
                  name: 'BookList',
                  params: {
                    mainId: subItem.id,
                    bigCategory: mediumItem
                  }
                }"
                v-for="(mediumItem, mediumKey) in subItem.medium" :key="mediumKey"
              >
                {{ mediumItem }}
              </router-link>
            </nav>
          </router-link>
        </nav> -->
      </router-link>

      <router-link class="menu__link" href="#"
        @click.prevent
        v-for="(item, key) in menuJsonData.sub"
        :key="key"
        :to="{
          name: 'BookList',
          params: {
            mainId: item.id
          }
        }"
      >
        {{ item.name }}
        <nav class="submenu">
          <router-link href="#"
            class="submenu__link"
            @click.prevent
            v-for="(subItem, subKey) in item.medium" :key="subKey"
            :to="{
              name: 'BookList',
              params: {
                mainId: item.id,
                bigCategory: subItem
              }
            }"
          >
            {{ subItem }}
          </router-link>
        </nav>
      </router-link>


    </div>

  </nav>
</template>

<script>
import { getCategory } from "@/request/api";
export default {
  name: 'Menu',
  data() {
    return {
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
  created() {
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

  }
}
</script>

<style lang="stylus" scoped>
.menu
  background-color $bg-light
  box-shadow 0 3px 5px $shadow
  margin-bottom 2em
  &__cntr
    display flex
    align-items center

  &__link
    display block
    position relative
    width 8%
    color $text-secondary
    transition all .3s
    padding 6px 0
    &:hover
      color $stroke
      font-weight bold
      .submenu
        display block

.divider
  border-right 2px solid $text-primary

.submenu
  position absolute
  top 100%
  width 100%
  display none
  background-color $light
  box-shadow 1px 3px 5px $shadow
  border-top 3px solid $primary
  z-index $front
  &__link
    display block
    position relative
    color $text-secondary
    font-weight normal
    background-color $light
    transition all .3s
    padding 3px 6px
    &:hover
      background-color $bg-light
      color $text-primary
      .medium-menu
        display block

.medium-menu
  position absolute
  top 0
  left 100%
  display none
  background-color $light
  box-shadow 1px 3px 5px $shadow
  width 100%
  &__link
    display block
    color $text-secondary
    font-weight normal
    background-color $light
    transition all .3s
    padding 3px 6px
    &:hover
      background-color $bg-light
      color $text-primary

</style>
