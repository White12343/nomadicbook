<template>
  <div class="form__input-group">
    <label :for="nameId">{{ title }}: </label>
    <textarea class="form__input" :id="nameId" rows="5" cols="100"></textarea>
  </div>
</template>

<script>
export default {
  name: 'FormTextarea',
  props: ['nameId', 'title']

}
</script>

<style>

</style>
