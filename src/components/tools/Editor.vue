<template>
  <vue-editor class="editor"
    v-model="content"
    :editor-toolbar="customToolbar" @text-change="$emit('input', content)"/>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: { VueEditor },
  props: ["value"],
  data: () => ({
    content: null,
    customToolbar: [
      [{ header: [false, 1, 2, 3, 4, 5, 6] }],
      ["bold", "italic", "underline"], // toggled buttons
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" }
      ],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      ["clean"] // remove formatting button
    ]
  }),
  watch: {
    value(val) {
      this.content = val
    }
  },
  created() {
    this.content = this.value;
  },
  // updated() {
  //   console.log('u');
  //   this.content = this.value;
  // }
};
</script>

<style lang="stylus">
.editor
  height 200px
  margin-bottom 100px
</style>
