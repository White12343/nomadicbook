<template>
  <div class="form__input-group">
    <label :for="nameId">{{ title }}: </label>
    <input type="text" class="form__input" :id="nameId">
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: ['nameId', 'title']

}
</script>

<style lang="stylus" scoped>
.form__input-group
  margin-bottom 1em
</style>
