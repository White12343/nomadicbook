<template>
  <div class="form__input-group">
    <input type="checkbox" :name="nameId" :id="nameId" v-model="isOpen">
    <label :for="nameId">{{ title }}: </label>
    <select :name="nameId + 'City'" :id="(nameId + 'City')" v-model="address.city" :disabled="!isOpen">
      <option value="" disabled>請選擇</option>
      <option value="台北市">台北市</option>
    </select>
    <select :name="nameId + 'Area'" :id="(nameId + 'Area')" v-model="address.area" :disabled="!isOpen">
      <option value="" disabled>請選擇</option>
      <option value="蘆洲區">蘆洲區</option>
    </select>
    <select :name="nameId + 'Road'" :id="(nameId + 'Road')" v-model="address.road" :disabled="!isOpen">
      <option value="" disabled>請選擇</option>
      <option value="長榮路">長榮路</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'AddressSelect',
  props: ['title', 'nameId'],
  data() {
    return {
      isOpen: false,
      address: {
        city: '',
        area: '',
        road: '',
      },
    }
  }

}
</script>

<style>

</style>
