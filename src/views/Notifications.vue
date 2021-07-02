<template>
  <div>
    <Editor v-model="content"/>

    {{content}}
  </div>
</template>

<script>
import Editor from '@/components/tools/Editor';

export default {
  components: { Editor },

  data: () => ({
    content: "213",
  }),
};
</script>

<style lang="stylus">
</style>
