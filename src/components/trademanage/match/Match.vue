<template>
  <article class="match-card">
    <div class="match-card__cntr">
      <div class="match-card__item match-card__self">
        <BookCard :card-data="selfBook"/>
      </div>
      <div class="match-card__item match-card__other-side">
        <BookCard :card-data="otherSideBook"/>
      </div>
    </div>
    <div class="match-card__btns">
      <a href="#" @click.prevent class="match-card__btn match-card__btn--dark">寄出</a>
      <!-- <router-link class="match-card__btn match-card__btn--dark mr-1" :to="{
          name: 'MatchDetail',
          params: {
            id: matchData.seekId,
          }
        }">收到</router-link> -->
        <router-link class="match-card__btn match-card__btn--light mr-1" :to="{
          name: 'MatchDetail',
          params: {
            id: matchData.seekId,
          }
        }">交易資訊</router-link>
    </div>

  </article>

</template>

<script>
import BookCard from '@/components/book/BookCard';
export default {
  name: 'Match',
  props: ['matchData'],
  components: {
    BookCard,
  },
  computed: {
    selfBook() {
      return {
        bookId: this.matchData.seekBookId,
        bookName: this.matchData.seekBookName,
        bookPhoto: this.matchData.seekBookPhoto,
      }
    },
    otherSideBook() {
      return {
        bookId: this.matchData.seekedBookId,
        bookName: this.matchData.seekedBookName,
        bookPhoto: this.matchData.seekedBookPhoto,
      }
    }
  }
}
</script>

<style lang="stylus">
.match-card
  min-width 25%
  background-color #fff
  &__cntr
    display flex
    justify-content space-between
  &__item
    width 48%

  &__self
    margin-right 1em
  &__btns
    margin-right 1em
    display flex
    flex-direction row-reverse
  &__btn
    display block
    width 30%
    text-align center
    padding .6em 0
    margin 1em 0
    border-radius 3px
    transition all .3s
    &--light
      background-color $gray
      color $text-secondary
    &--dark
      background-color $accent
      color $headline-light

</style>
