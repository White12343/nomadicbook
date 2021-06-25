<template>
  <section class="manage">
    <v-tabs>
      <v-tab
        :to="{
          path: 'seek',
        }"
      >
        我的徵求
      </v-tab>
      <v-tab
        :to="{
          path: 'ask',
        }"
      >別人徵求</v-tab>
      <v-tab
        :to="{
          path: 'match',
        }"
      >交易媒合</v-tab>
      <v-tab
        :to="{
          path: 'record',
        }"
      >歷史交易</v-tab>
    </v-tabs>
    <div class="manage__cntr">
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Manage',
}
</script>

<style>

</style>
