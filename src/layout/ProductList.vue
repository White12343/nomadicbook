<template>
  <div>
    <p>Loading {{ isLoading }}</p>
    <button @click="Loaded">Reverse</button>
  </div>
</template>

<script>
// 若不是用 default，js 檔引用時需要用 {} 個別將要使用的函式寫出來
import { mapState, mapMutations } from "vuex";

export default {
  name: 'ProductList',
  data() {
    return {

    }
  },
  computed: {

    ...mapState([
      'isLoading',
    ]),


  },
  methods: {
    ...mapMutations([
      'Loaded',
    ])
  }


}
</script>

<style>

</style>
