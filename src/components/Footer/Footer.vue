<template>
  <v-footer
    color="grey darken-2"
    class="footer"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col
        class="grey darken-4 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>by 李翊銘、蘇柔安</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      links: [],
    }),
  }
</script>

<style lang="stylus">

.footer
  margin-top 1em
</style>
