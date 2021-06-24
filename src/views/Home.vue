<template>
  <section class="home">

    <Exp />
    <NewBook />
    <PublishDay />
  </section>
</template>

<script>
import Exp from '@/components/home/Exp';
import NewBook from '@/components/home/NewBook';
import PublishDay from '@/components/home/PublishDay';
export default {
  data() {
    return {
    }
  },
  components: {
    Exp,
    NewBook,
    PublishDay,
  },

}
</script>

<style>

</style>
