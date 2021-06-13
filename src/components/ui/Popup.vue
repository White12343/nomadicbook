<template>
  <div class="popup">
    <!-- <a href="#" class="popup__btn" :class='btnStyle' @click.stop.prevent="show">{{ title }}</a> -->
    <div class="popup__bg" v-if="isOpen">
      <div class="popup__window" v-if="isOpen" ref="main">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    show() {
      this.isOpen = true;
      document.addEventListener("click", this.hidePanel);
    },
    hide() {
      this.isOpen = false;
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
.popup
  &__bg
    position fixed
    top 0
    left 0
    background-color rgba(0,0,0,.7)
    width 100vw
    height 100vh
  &__window
    position fixed
    left 50%
    top 50%
    transform translate(-50%, -50%)
    width 80%
    height 70vh
    background-color #fff
    border 2px solid $bg-dark


</style>
