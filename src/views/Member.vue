<template>
  <div class="member">
    <nav class="member__nav">
      <router-link class="member__link" to="/member/uploadpd">上架</router-link>
      <router-link class="member__link" to="/manage">管理</router-link>
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
