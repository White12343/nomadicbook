<template>
  <article class="book-info">
    <header class="book-info__head">
      <h2 class="book-info__tit fs-4">{{ bookDesc.bookName }}</h2>
    </header>
    <div class="book-info__user">
      <h4 class="book-info__user-name mr-3">{{ bookDesc.userName }}</h4>
      <v-rating
        v-if="bookDesc.evaluation"
        class="text-center mr-3"
        :value="bookDesc.evaluation"
        color="warning"
        background-color="warning"
        empty-icon="mdi-star-outline"
        half-icon="mdi-star-half"
        half-increments
        readonly
        dense
        size="16"
      ></v-rating>
      <h4 class="text-center grey--text mr-3" v-else>還沒有任何評價</h4>
      <router-link
        class="book-info__stall-btn"
        :to="{
          name: 'Booth',
          params: {
            id: bookDesc.userId,
          }
        }"

      >查看攤位</router-link>
    </div>
    <div class="book-info__cntr">
      <ul class="book-info__list">
        <li class="book-info__list-item">作者：{{ bookDesc.author }}</li>
        <li class="book-info__list-item">出版社：{{ bookDesc.publishingHouse }}</li>
        <li class="book-info__list-item">出版日：{{ bookDesc.publishDate }}</li>
        <li class="book-info__list-item">規格：{{`${bookDesc.bookWidth} x ${bookDesc.bookLong} x ${bookDesc.bookHigh} cm`}}</li>


      </ul>

      <p class="book-info__desc mt-3">
        {{ bookDesc.experience }}
      </p>
    </div>
  </article>
</template>

<script>
export default {
  name: 'BookInfo',
  props: {
    bookId: Number,
    bookDesc: Object,
  },
  data() {
    return {}
  },
  methods: {},
  components: {
  }
}
</script>

<style lang="stylus">
.book-info
  flex-grow 1
  padding 1em
  &__tit
    padding-bottom 6px
    border-bottom 1px solid $shadow
  &__user
    display flex
    align-items center
    margin-top 1em
    margin-bottom 1em

  &__cntr
    color $text-secondary

  &__user-name, &__stall-btn
    display block
    color $headline-dark

  &__user-photo
    width 2em

  &__stall-btn
    color $text-link
    &:hover
      text-decoration underline
</style>
