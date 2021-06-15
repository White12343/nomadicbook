<template>
  <section class="upload-pd mx-auto">
    <header class="upload-pd__header">
      <h2 class="upload-pd__tit" v-if="this.$route.query.id">更新您的二手書</h2>
      <h2 class="upload-pd__tit" v-else>上架您的二手書</h2>
    </header>
    <UploadForm :book-id="this.$route.query.id"/>
  </section>

</template>

<script>
import UploadForm from '@/components/member/uploadpd/UploadForm';

export default {
  name: 'UploadPd',
  data() {
    return {

    }
  },
  components: {
    UploadForm,
  }
}
</script>

<style lang="stylus" scoped>
.upload-pd
  // width 900px
  background-color $light
  padding 1em


</style>
