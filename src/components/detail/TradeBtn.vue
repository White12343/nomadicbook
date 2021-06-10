<template>
  <div class="trade-btn">
    <a href="#" class="trade-btn__btn trade-btn__btn-dark" @click.stop.prevent="show">我要交換</a>
    <form class="tarde-form" v-if="isOpenTradeForm" ref="main">
      <h2 class="tarde-form__tit">我要交換</h2>
      
      <input type="submit" value="送出" class="tarde-form__submit">
    </form>
  </div>
</template>

<script>
export default {
  name: 'TradeBtn',
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

<style lang="stylus">
.trade-btn
  width 48%
  &__btn
    display block
    border 2px solid $bg-dark
    text-align center
    padding 6px 0
    border-radius 5px
    background-color $bg-dark
    color $headline-light

.tarde-form
  position fixed
  left 50%
  top 50%
  transform translate(-50%, -50%)
  width 800px
  height 300px
  background-color #fff
  outline: 100vh solid rgba(0,0,0,.7);
  padding 1em
  border 2px solid $bg-dark
  &__tit
    font-weight bold


</style>
