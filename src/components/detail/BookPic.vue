<template>
  <div class="carousel">
    <div class="carousel__pics" :style="slide">
      <figure class="carousel__pic text-center" v-for="(item, index) in bookPhoto" :key="index">
        <img :src="`http://35.236.167.85/photo/${item}.jpg`" :alt="bookName" class="carousel__img img-resp" width="266" height="400">
      </figure>
    </div>
    <div class="carousel__pagination">
      <a href="#"
        class="carousel__pagination__item"
        :class="{'carousel__pagination__item-active': slideIndex === (item - 1)}"
        v-for="item in slideLimit"
        :key="item"
        @click.prevent="goto(item)"
      ></a>
    </div>
    <a href="#"
      class="carousel__btn carousel__prev"
      v-show="slideIndex > 0"
      @click.prevent="prev"
    >
      &#060;
    </a>
    <a href="#"
      class="carousel__btn carousel__next"
      v-show="slideIndex < slideLimit - 1"
      @click.prevent="next"
    >
      &#062;
    </a>

  </div>
</template>

<script>
export default {
  name: 'BookPic',
  props: {
    'bookPhoto': Array,
    'bookName': String,
  },
  data() {
    return {
      slideIndex: 0,
    }
  },
  computed: {
    slide() {
      return {
        transform: `translateX(-${this.slideIndex}00%)`
      }
    },
    slideLimit() {
      if(!this.bookPhoto){
        return 0;
      }
      return this.bookPhoto.length;

    }
  },
  methods: {
    next() {
      if(this.slideIndex >= (this.slideLimit - 1)){
        return;
      }
      this.slideIndex++;
    },
    prev() {
      if(this.slideIndex <= 0){
        return;
      }
      this.slideIndex--;
    },
    goto(index) {
      this.slideIndex = index - 1;
    }
  }

}
</script>

<style lang="stylus">
.carousel
  position relative
  overflow hidden
  &__pics
    display flex
    flex-wrap nowrap
    transition all .5s
  &__pic
    background-color $light
    min-width 100%
    padding 1em

  &__btn
    display block
    position absolute
    top 50%
    transform translateY(-50%)
    background-color rgba(0,0,0,.3)
    padding 6px 12px
    color $headline-light
    transition all .3s
    &:hover
      background-color rgba(0,0,0,.5)

  &__next
    right 0
  &__prev
    left 0
  &__pagination
    position absolute
    left 50%
    transform translateX(-50%)
    bottom 2%
    display flex
    &__item
      display block
      width 10px
      height 10px
      background-color rgba(255, 255, 255, .5)
      transition all .3s
      border-radius 50%
      margin 0 3px
      &:hover
        background-color rgba(255, 255, 255, .9)
      &-active
        background-color rgba(255, 255, 255, .9)


</style>
