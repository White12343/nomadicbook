<template>
  <div class="slide">
    <div class="slide__list" :style="{transform: 'translateX(0%)'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SlideList',
  props: [],
}
</script>

<style lang="stylus">
.slide
  overflow hidden
  &__list
    display flex
    flex-wrap nowrap
    transition all .5s

</style>
