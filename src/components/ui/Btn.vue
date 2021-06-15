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
  border 2px solid $bg-dark
  text-align center
  padding 3px 0
  border-radius 5px
  background-color $bg-dark
  color $headline-light
  transition all .3s

.dark
  background-color $dark
  color $headline-light
.light
  background-color $light
  color $headline-dark
  &:hover
    background-color $dark
    color $headline-light

</style>
