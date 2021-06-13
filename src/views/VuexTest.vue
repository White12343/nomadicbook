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
    // 1.
    ...mapState([
      'isLoading',
    ]),
    // 2.
    isloading() {
      // 透過$store取得狀態裡的isLoading
      return this.$store.state.isLoading;
    }


  },
  methods: {
    // 1.
    ...mapMutations([
      'Loaded',
    ]),
    // 2.
    testMethods() {
      // 提交改變狀態
      this.$store.commit("Loaded");
    }
  }


}
</script>

<style>

</style>
