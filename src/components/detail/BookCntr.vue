<template>
  <article class="book-desc">
    <header class="book-desc__header mb-3">
      <h2 class="book-desc__tit">{{ cntrTitle }}</h2>
    </header>
    <!-- 資安問題 -->
    <p class="book-desc__cntr" v-html="cntr">
    </p>
  </article>


</template>

<script>
export default {
  name: 'BookCntr',
  props: ['cntrTitle', 'cntr']

}
</script>

<style lang="stylus">
.book-desc
  padding 1em

</style>
