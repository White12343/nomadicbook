<template>
  <nav class="menu">
    <div class="menu__cntr container mx-auto">
      <a class="menu__link" href="#"
        @click.prevent
        v-for="(item, key) in menuJsonData"
        :key="key"
        :class="{'divider': key !== (menuJsonData.length - 1)}"
      >
        {{ item.name }}
        <nav class="submenu">
          <!-- <router-link class="submenu__link" to="/booklist"
            v-for="(subItem, subKey) in item.sub" :key="subKey"
          >
            {{ subItem.name }}
          </router-link> -->
          <a href="#"
            class="submenu__link"
            @click.prevent
            v-for="(subItem, subKey) in item.sub" :key="subKey"
          >
            {{ subItem.name }}
            <nav class="medium-menu">
              <router-link class="medium-menu__link" to="/booklist"
                v-for="(mediumItem, mediumKey) in subItem.medium" :key="mediumKey"
              >
                {{ mediumItem }}
              </router-link>
            </nav>
          </a>
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
    width 10%
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
