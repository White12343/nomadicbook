<template>
  <article class="book-desc">
    <header class="book-desc__header">
      <h2 class="book-desc__tit">{{ cntrTitle }}</h2>
    </header>
    <p class="book-desc__cntr">
      {{ cntr }}
    </p>
  </article>


</template>

<script>
export default {
  name: 'BookCntr',
  props: ['cntrTitle', 'cntr']

}
</script>

<style>

</style>
