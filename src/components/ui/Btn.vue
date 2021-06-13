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
  padding 6px 0
  border-radius 5px
  background-color $bg-dark
  color $headline-light

.dark
  background-color $bg-dark
  color $headline-light
.light
  background-color $bg-light
  color $headline-dark

</style>
