<template>
  <div class="member">
    <nav class="member__nav">
      <router-link class="member__link"
        :class="{'member__link--active': item.path === nowPath}"
        v-for="item, index in mamberNav"
        :key="index"
        :to="item.path"
        @click.native="changePath(item.path)"
      >
        {{ item.title }}
      </router-link>
    </nav>
    <div class="member__cntr">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Member',
  data() {
    return {
      mamberNav: [
        {
          path: '/member/booth',
          title: '我的攤位',
        },
        {
          path: '/member/seek',
          title: '我的徵求',
        },
        {
          path: '/member/ask',
          title: '別人要求',
        },
        {
          path: '/member/match',
          title: '交易媒合',
        },
        {
          path: '/uploadpd',
          title: '上架新書',
        }
      ],
      nowPath: '/member/booth',
    }
  },
  methods: {
    changePath(path) {
      this.nowPath = path;
    }
  }
}
</script>

<style lang="stylus">
.member
  display flex
  &__nav
    min-width 20%
    background-color $light
    margin-right 1em
    padding 1em
    box-shadow 0 0 5px $gray
  &__link
    display block
    background-color $light
    color $headline-dark
    border 2px solid $bg-dark
    border-radius 5px
    text-align center
    margin-bottom 1em
    padding 3px
    transition all .3s
    &:hover, &--active
      background-color $dark
      color $headline-light


  &__cntr
    flex-grow 2
    box-shadow 0 0 5px $gray
    background-color $light
</style>
