<template>
  <div class="banner mt-6 mb-6">
    <v-carousel
      cycle
      height="200"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
      >
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
        items: [
          {
            src: '/static/img/banner/2.jpg',
          },
          {
            src: '/static/img/banner/3.jpg',
          },
          {
            src: '/static/img/banner/4.jpg',
          },
          {
            src: '/static/img/banner/5.jpg',
          },
          {
            src: '/static/img/banner/6.jpg',
          },
        ],
      }
    },
  }
</script>

<style>

</style>
