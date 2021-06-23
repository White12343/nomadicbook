<template>
  <article class="booth-card">
    <v-badge
      color="light-green"
      :content="BoothData.seekNum"
      :value="BoothData.seekNum"
    >
      <BookCard :card-data="BoothData"/>
    </v-badge>
    <div v-if="isSelf">
      <router-link
        :to="{ path: '/uploadpd', query: {id: BoothData.bookId}}"
      >
        <v-btn
          fab
          dark
          small
          class="booth-card__btn booth-card__edit"
          color="primary"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </router-link>
      <v-btn
        fab
        dark
        small
        class="booth-card__btn booth-card__off-shelf"
        color="red"
        v-if="!isOff"
        @click="offShelf"
      >
        <v-icon>mdi-archive-arrow-down</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        class="booth-card__btn booth-card__off-shelf"
        color="light-green"
        v-else
        @click="onShelf"
      >
        <v-icon>mdi-archive-arrow-up</v-icon>
      </v-btn>
    </div>


  </article>
</template>

<script>
import { setOffShelf, setOnShelf } from "@/request/api";
import BookCard from '@/components/book/BookCard';
export default {
  name: 'BoothCard',
  props: {
    BoothData: Object,
    isOff: {
      type: Boolean,
      default: false,
      require: false,
    },
    isSelf: {
      type: Boolean,
      default: false,
      require: true,
    }
  },
  data() {
    return {
    }
  },
  components: {
    BookCard,
  },
  computed: {
  },
  methods: {
    offShelf() {
      let vm = this;
      setOffShelf(this.BoothData.bookId)
        .then(res => {
          vm.$emit('resetShelf')
        })
        .catch(error => {
          console.log(error);
        })
    },
    onShelf() {
      let vm = this;
      setOnShelf(this.BoothData.bookId)
        .then(res => {
          vm.$emit('resetShelf')
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

}
</script>

<style lang="stylus">
.booth-card
  background-color $light
  position relative
  &:hover
    .booth-card__btn
      display block
  &__btn
    display none
    position absolute
    left 50%
    transform translateX(-50%)
  &__edit
    top 20%
  &__off-shelf
    top 40%
</style>
