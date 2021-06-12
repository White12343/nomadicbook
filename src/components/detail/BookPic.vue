<template>

  <div class="carousel">
    <div class="carousel__pics">
      <figure class="carousel__pic text-center" v-for="(item, index) in bookPhoto" :key="index">
        <img :src="item" :alt="bookName" class="carousel__img img-reset" width="266" height="400">
      </figure>
    </div>

  </div>
</template>

<script>
export default {
  name: 'BookPic',
  props: ['bookPhoto', 'bookName'],

}
</script>

<style lang="stylus">
.carousel
  overflow hidden
  border 2px solid $bg-dark
  &__pics
    display flex
    flex-wrap nowrap
  &__pic
    background-color $light
    min-width 100%



</style>
