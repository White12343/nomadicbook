<template>
  <div class="popup">
    <div class="popup__bg" v-if="isOpen">
      <div class="popup__window" v-if="isOpen" ref="main" :style="{'width': popupWidth, 'height': popupHeight}">
        <a href="#" class="close-btn" @click.prevent="hide">X</a>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    visible: {
      type: Boolean,
    },
    popupWidth: {
      type: String,
      require: false,
      default: '80%',
    },
    popupHeight: {
      type: String,
      require: false,
      default: 'auto',
    }
  },
  // props: ['visible', 'popupSize'],
  data() {
    return {
      isOpen: false,
    }
  },
  watch: {
    visible(val) {
      if(val){
        this.show();
      }else {
        this.hide();
      }
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
      this.$emit("hide");
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
  position relative
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
    background-color #fff
    border-radius 5px

.close-btn
  position absolute
  top -5px
  right -5px
  background-color $shadow
  color $text-secondary
  display block
  font-size $font-sizes-xs
  width 20px
  height @width
  line-height @width
  text-align center
  border-radius 50%
  transition all .3s
  &:hover
    background-color #ccc
</style>
