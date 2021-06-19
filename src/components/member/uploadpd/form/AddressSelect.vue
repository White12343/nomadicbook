<template>
  <div class="form__input-group">
    <input type="checkbox" :name="nameId" :id="nameId" v-model="isOpen" @change="openTrade" v-if="isOptional">
    <label :for="nameId">{{ title }}: </label>
    <div class="select__group">
      <select
        class="select__input"
        :name="nameId + 'City'"
        :id="(nameId + 'City')"
        v-model="address.city"
        :disabled="!isOpen"
        @change="getAreaArr"
      >
        <option value="" disabled>請選擇</option>
        <option v-for="value, index in cityArr" :value="value" :key="index">{{ value }}</option>
      </select>
      <select
        class="select__input ml-1"
        :name="nameId + 'Area'"
        :id="(nameId + 'Area')"
        v-model="address.area"
        :disabled="!isOpen"
        @change="getRoadArr"
      >
        <option value="" disabled>請選擇</option>
        <option v-for="value, index in areaArr" :key="index" :value="value">{{ value }}</option>
      </select>
      <select
        class="select__input ml-1"
        :name="nameId + 'Road'"
        :id="(nameId + 'Road')"
        v-model="address.road"
        :disabled="!isOpen"
        @change="sentData"
      >
        <option value="" disabled>請選擇</option>
        <option v-for="value, index in roadArr" :key="index" :value="value">{{ value }}</option>
      </select>
    </div>
    <div class="form__input-wrap">
      <input class="form__input" type="text" v-if="openInput" v-model="address.path" :disabled="!isOpen" placeholder="地址" @change="sentData">
      <input class="form__input ml-1" type="text" v-if="openRemark" v-model="address.detail" :disabled="!isOpen" placeholder="備註" @change="sentData">
    </div>
  </div>
</template>

<script>
import { getCity, getArea, getRoad } from "@/request/api";
export default {
  name: 'AddressSelect',
  props: {
    title: {
      type: String,
      default: "交易方式",
      // 是否必填
      required: true
    },
    nameId: {
      type: String,
      default: "0",
      required: true
    },
    openInput: {
      type: Boolean,
      default: false,
      required: false
    },
    openRemark: {
      type: Boolean,
      default: false,
      required: false
    },
    isOptional: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data() {
    return {
      isOpen: false,
      cityArr: [],
      areaArr: [],
      roadArr: [],
      address: {
        city: '',
        area: '',
        road: '',
        path: '',
        detail: '',
      },
    }
  },
  created() {
    if(!this.isOptional){
      this.isOpen = true;
      this.openTrade();
    }
  },
  methods: {
    openTrade() {
      getCity()
        .then(res => {
          this.cityArr = res.data;
        })
        .catch(error => {
          console.log(error);
        })
    },
    getAreaArr() {
      this.address.area = '',
      this.address.road = '',
      getArea({
        City: this.address.city
      })
        .then(res => {
          this.areaArr = res.data;
        })
        .catch(error => {
          console.log(error);
        })
    },
    getRoadArr() {
      this.address.road = '';
      getRoad({
        City: this.address.city,
        area: this.address.area
      })
        .then(res => {
          this.roadArr = res.data;
        })
        .catch(error => {
          console.log(error);
        })
    },
    sentData() {
      this.$emit('getVal', this.address);
    }
  }


}
</script>

<style lang="stylus">

.form
  &__input-group
    margin-bottom 1em
  &__input-wrap
    display flex

  &__input
    display block
    width 100%
    border 1px solid $dark
    padding 6px
    margin-top .6em
    margin-bottom 1em
  &__btn
    background-color $accent
    padding 6px
    color $light
    cursor pointer
.select
  &__group
    display flex
    width 100%
  &__input
    display block
    width 100%
    padding 6px 0
</style>
