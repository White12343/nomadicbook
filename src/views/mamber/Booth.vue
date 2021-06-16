<template>
  <section class="booth">
    <header class="booth__header">
      <h2 class="booth__tit">我的攤位</h2>
    </header>

    <div class="booth__cntr">
      <BoothCard class="booth__item" v-for="(item, key) in pdData" :key="key" :booth-data="item" />
    </div>

  </section>
</template>

<script>
import { getBoothBookList } from "@/request/api";
import BoothCard from '@/components/member/booth/BoothCard'
export default {
  name: 'Booth',
  data() {
    return {
      pdData: [],
    }
  },
  components: {
    BoothCard,
  },
  created() {
    let vm = this;
    getBoothBookList()
      .then(res => {
        vm.pdData = res.data;
      })
      .catch(error => {
        console.log(error);
      })
  },

}
</script>

<style lang="stylus">
.booth
  background-color $light
  padding 1em
  &__cntr
    display flex
    flex-wrap wrap
  &__item
    width 20%
    margin-top 1em
    box-shadow 0 0 3px $gray
    transition all .3s
    &:hover
      box-shadow 2px 2px 3px $gray

</style>
