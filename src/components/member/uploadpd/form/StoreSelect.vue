<template>
  <div class="form__input-group">
    <v-switch
      v-model="isOpen"
      :label="title"
      :id="nameId"
      @change="openTrade"
      v-if="isOptional"
    ></v-switch>
    <h4 v-if="addressValue && addressValue.name">{{getAddress}}</h4>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="4">
        <v-select
          class="mr-1"
          :items="cityArr"
          label="城市"
          v-model="address.city"
          :id="(nameId + 'City')"
          :disabled="!isOpen"
          @change="getAreaArr"
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="12" sm="4">
        <v-select
          class="mr-1"
          :items="areaArr"
          label="地區"
          v-model="address.area"
          :id="(nameId + 'Area')"
          :disabled="!isOpen"
          @change="getRoadArr"
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="12" sm="4">
        <v-select
          :items="getRoadDetailArr"
          label="地址"
          v-model="address.detail"
          :id="(nameId + 'Road')"
          :disabled="!isOpen"
          @change="sentData"
        ></v-select>
      </v-col>
    </v-row>

    <input type="text" v-if="openInput" v-model="address.path" :disabled="!isOpen" placeholder="地址" @change="sentData">
    <input type="text" v-if="openRemark" v-model="address.detail" :disabled="!isOpen" placeholder="備註" @change="sentData">
  </div>
</template>

<script>
import { getStoreCity, getStoreArea, getStoreAddress } from "@/request/api";
export default {
  name: 'AddressSelect',
  props: {
    title: {
      type: String,
      default: "交易方式",
      // 是否必填
      required: true
    },
    addressValue: {
      type: Object,
      default: null,
      required: false
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
    },
    hasDefault: {
      type: Boolean,
      default: false,
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
  watch: {
    hasDefault(val) {
      this.isOpen = val;
      if(this.isOpen){
        this.openTrade();
      }
    }
  },
  computed: {
    getRoadDetailArr() {
      let arr = [];
      this.roadArr.forEach(item => {
        arr.push(`${item.shopName}門市(${item.shopAddress})`)
      })
      return arr;
    },
    getAddress() {
      if(!this.address.city){
        return this.addressValue.name + '(' + this.addressValue.address+')';
      }
      return this.address.detail;
    },
  },
  created() {
    if(!this.isOptional){
      this.isOpen = true;
      this.openTrade();
    }
  },
  methods: {
    openTrade() {
      this.$emit('isOpenTrade', this.isOpen);
      getStoreCity()
        .then(res => {
          this.cityArr = res.data;
        })
        .catch(error => {
          console.log(error);
        })
    },
    getAreaArr() {
      this.address.area = '',
      this.address.detail = '',
      getStoreArea({
        city: this.address.city
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
      getStoreAddress({
        city: this.address.city,
        area: this.address.area
      })
        .then(res => {
          this.roadArr = res.data;
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        })
    },
    sentData() {
      let arr = this.address.detail.split('(');
      let mailBoxDetail = {
        Name: arr[0],
        Address: arr[1].split(")")[0],
      }
      this.$emit('getVal', mailBoxDetail);
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
