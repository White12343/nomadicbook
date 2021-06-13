<template>
  <article class="match-card">
    <div class="match-card__cntr">
      <div class="match-card__self">
        <BookCard :card-data="selfBook"/>
      </div>
      <div class="match-card__other-side">
        <BookCard :card-data="otherSideBook"/>
      </div>
    </div>
    <div class="match-card__btns">
      <router-link class="match-card__btn match-card__btn--light" to="/manage/matchdetail">查看資訊</router-link>
      <a href="#" @click.prevent class="match-card__btn match-card__btn--dark">交易確認</a>
    </div>

  </article>

</template>

<script>
import BookCard from '../../book/BookCard';
export default {
  name: 'Match',
  props: ['matchData'],
  components: {
    BookCard,
  },
  computed: {
    selfBook() {
      return {
        id: this.matchData.SeekBookId,
        name: this.matchData.SeekBookName,
        imgUrl: this.matchData.SeekBookPhoto,
      }
    },
    otherSideBook() {
      return {
        id: this.matchData.SeekedBookId,
        name: this.matchData.SeekedBookName,
        imgUrl: this.matchData.SeekedBookPhoto,
      }
    }
  }
}
</script>

<style lang="stylus">
.match-card
  min-width 25%
  background-color #fff
  padding 1em
  &__cntr
    display flex
  &__self
    margin-right 1em
  &__btns
    text-align right
  &__btn
    border 2px solid $bg-dark
    padding 3px
    border-radius 5px
    &--light
      background-color $bg-light
      color $headline-dark
    &--dark
      background-color $bg-dark
      color $headline-light

</style>
