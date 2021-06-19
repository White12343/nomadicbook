<template>
  <div class="form__input-group">
    <input type="checkbox" :name="nameId" :id="nameId" v-model="isOpen" @change="openTrade" v-if="isOptional">
    <label :for="nameId">{{ title }}: </label>
    <select
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
      :name="nameId + 'Road'"
      :id="(nameId + 'Road')"
      v-model="address.detail"
      :disabled="!isOpen"
      @change="sentData"
    >
      <option value="" disabled>請選擇</option>
      <option v-for="value, index in roadArr" :key="index" :value="value">{{ value.mailboxName + "(" + value.mailboxAddress + ")"}}</option>
    </select>
    <input type="text" v-if="openInput" v-model="address.path" :disabled="!isOpen" placeholder="地址" @change="sentData">
    <input type="text" v-if="openRemark" v-model="address.detail" :disabled="!isOpen" placeholder="備註" @change="sentData">
  </div>
</template>

<script>
import { getCity, getArea, getIMailBox } from "@/request/api";
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
      getIMailBox({
        City: this.address.city,
        Area: this.address.area
      })
        .then(res => {
          this.roadArr = res.data;
          console.log(res.data);
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

<style>

</style>
