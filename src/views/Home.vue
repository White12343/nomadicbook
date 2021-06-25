<template>
  <section class="home">
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="3"
        lg="3"
      >
        <SideList :openFilter="false"/>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="9"
        lg="9"
      >

        <Banner />
        <Exp />
        <NewBook />
        <PublishDay />
      </v-col>
    </v-row>

  </section>
</template>

<script>
import SideList from '@/components/home/SideList';
import Banner from '@/components/home/Banner';
import Exp from '@/components/home/Exp';
import NewBook from '@/components/home/NewBook';
import PublishDay from '@/components/home/PublishDay';
export default {
  data() {
    return {
    }
  },
  components: {
    SideList,
    Banner,
    Exp,
    NewBook,
    PublishDay,
  },

}
</script>

<style>

</style>
