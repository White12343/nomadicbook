<template>
  <div class="form__input-group">
    <label :for="nameId">{{ title }}: </label>
    <input type="text" class="form__input" :id="nameId" @change="sentValue" v-model="inputValue">
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: ['nameId', 'title'],
  data() {
    return {
      inputValue: null,
    }
  },
  methods: {
    sentValue() {
      this.$emit('getValue', this.inputValue);
    }
  }
}
</script>

<style lang="stylus" scoped>
.form__input-group
  margin-bottom 1em
</style>
