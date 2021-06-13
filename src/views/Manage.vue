<template>
  <div class="manage">
    <nav class="manage__nav">
      <router-link class="manage__link" to="/manage/seek">我的徵求</router-link>
      <router-link class="manage__link" to="/manage/ask">別人要求</router-link>
      <router-link class="manage__link" to="/manage/match">交易媒合</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
