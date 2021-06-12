<template>
  <div class="trade-btn">
    <a href="#" class="trade-btn__btn" :class='btnStyle' @click.stop.prevent="show">{{ title }}</a>
    <div class="trade-btn__popup-bg" v-if="isOpenTradeForm"></div>
    <div class="trade-btn__popup" v-if="isOpenTradeForm" ref="main">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TradeBtn',
  props: ['title', 'btnStyle'],
  data() {
    return {
      isOpenTradeForm: false,
    }
  },
  methods: {
    show() {
      this.isOpenTradeForm = true;
      document.addEventListener("click", this.hidePanel);
    },
    hide() {
      this.isOpenTradeForm = false;
      document.removeEventListener("click", this.hidePanel);
    },
    hidePanel (e) {
      if (this.$refs.main && !this.$refs.main.contains(e.target)) {
        this.hide()
      }
    },

  }
}
</script>

<style lang="stylus" scoped>
.trade-btn
  &__btn
    display block
    border 2px solid $bg-dark
    text-align center
    padding 6px 0
    border-radius 5px
    background-color $bg-dark
    color $headline-light

  &__popup
    position fixed
    left 50%
    top 50%
    transform translate(-50%, -50%)
    width 80%
    height 70vh
    background-color #fff
    border 2px solid $bg-dark

    &-bg
      position fixed
      top 0
      left 0
      background-color rgba(0,0,0,.7)
      width 100vw
      height 100vh


.dark
  background-color $bg-dark
  color $headline-light
.light
  background-color $bg-light
  color $headline-dark
</style>
