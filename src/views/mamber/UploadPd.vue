<template>
  <section class="upload-pd mx-auto">
    <header class="upload-pd__header">
      <h2 class="upload-pd__tit">上架您的二手書</h2>
    </header>
    <UploadForm />
  </section>

</template>

<script>
import UploadForm from '@/components/uploadpd/UploadForm';

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
