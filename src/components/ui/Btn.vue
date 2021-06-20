<template>
  <a href="#" class="btn" :class='btnStyle' @click.prevent="check">{{ desc }}</a>
</template>

<script>
export default {
  name: 'Btn',
  props: ['desc', 'btnStyle'],
  methods: {
    check() {
      this.$emit('check');
    }
  }

}
</script>

<style lang="stylus" scoped>


.btn
  display block
  border 2px solid $accent
  text-align center
  padding .6em 0
  margin 1em 0
  border-radius 3px
  transition all .3s

.dark
  background-color $accent
  color $light
.light
  background-color $gray
  color $text-secondary
  &:hover
    background-color $accent
    color $headline-light

</style>
