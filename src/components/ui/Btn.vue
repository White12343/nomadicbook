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
  padding 3px 0
  border-radius 5px
  background-color $bg-dark
  color $headline-light
  transition all .3s

.dark
  background-color $accent
  color $headline-light
.light
  background-color $light
  color $text-primary
  &:hover
    background-color $accent
    color $headline-light

</style>
