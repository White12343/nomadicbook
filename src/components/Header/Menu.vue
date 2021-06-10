<template>
  <nav class="menu">
    <div class="menu__cntr container mx-auto">
      <a class="menu__link text-center" href="#"
        v-for="(item, key) in menuJsonData"
        :key="key"
        :class="{'divider': key !== (menuJsonData.length - 1)}"
      >
        {{ item.name }}
        <nav class="submenu">
          <router-link class="submenu__link text-center" to="/booklist"
            v-for="(subItem, subKey) in item.sub" :key="subKey"
          >
            {{ subItem.name }}
          </router-link>
        </nav>
      </a>
    </div>

  </nav>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      menuJsonData: [
        {
          name: '書籍',
          sub: [
            {
              name: 'item1',
            },
            {
              name: 'item2',
            },
            {
              name: 'item3',
            },
          ]
        },
        {
          name: '小説',
          sub: [
            {
              name: 'item1',
            },
            {
              name: 'item2',
            },
            {
              name: 'item3',
            },
          ]
        },
        {
          name: '漫畫',
          sub: [
            {
              name: 'item',
            },
            {
              name: 'item',
            },
            {
              name: 'item',
            },
          ]
        },
        {
          name: '教科書',
          sub: [
            {
              name: 'item',
            },
            {
              name: 'item',
            },
            {
              name: 'item',
            },
          ]
        },
        {
          name: '工具書',
          sub: [
            {
              name: 'item',
            },
            {
              name: 'item',
            },
            {
              name: 'item',
            },
          ]
        },
      ]

    }
  }
}
</script>

<style lang="stylus" scoped>
.menu
  background-color $light
  padding 1em
  box-shadow 0 0 5px $gray
  margin-bottom 2em
  &__cntr
    display flex
    align-items center

  &__link
    display block
    position relative
    width 20%
    color $paragraph-dark
    transition all .3s
    &:hover
      color $stroke
      font-weight bold
      .submenu__link
        display block

.divider
  border-right 2px solid $headline-dark

.submenu
  position absolute
  width 100%
  display block
  &__link
    display none
    color $paragraph-dark
    font-weight normal
    background-color $light
    transition all .3s

</style>
