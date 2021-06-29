<template>
  <article class="exp-card">
    <v-row
      justify="center"

    >
      <v-col
        cols="12"
        lg="3"
      >
        <BookCard
          :card-data="cardData"
          class="ml-3"
        />
      </v-col>
      <v-col
        cols="12"
        lg="9"
      >
        <h3 class="exp__book-name text-h5">
          <router-link class="exp__link" :to="{
              name: 'Detail',
              params: {
                id: cardData.bookId,
              }
            }">
            {{cardData.bookName}}
          </router-link>
        </h3>

        <h4 class="exp__book-name fs-6 mt-1 mr-3">{{cardData.userName}}</h4>

        <h4 class="exp__book-name fs-6 mt-1">{{cardData.experienceDay}}</h4>
        <p class="exp__desc fs-5 mt-3 mr-3">
          {{cardData.experience}}
        </p>
      </v-col>
    </v-row>
  </article>
</template>

<script>
import BookCard from '@/components/book/BookCard';
export default {
  props: ['cardData'],
  components: {
    BookCard,
  },
}
</script>

<style lang="stylus">
.exp__link
  color $dark !important
  &:hover
    text-decoration underline
</style>
