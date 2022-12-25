<template>
  <div class="form__input-group" data-app>
    <v-switch
      v-model="isOpen"
      :label="title"
      :id="nameId"
      @change="openTrade"
      v-if="isOptional"
    ></v-switch>
    <h4 v-if="addressValue">{{getAddress}}</h4>
    <h4 v-if="faceTrade">{{getFaceTrade}}</h4>


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
          :items="roadArr"
          label="路名"
          v-model="address.road"
          :id="(nameId + 'Road')"
          :disabled="!isOpen"
          @change="sentData"
        ></v-select>
      </v-col>
    </v-row>

    <div class="form__input-wrap">
      <v-text-field
        label="地址"
        v-model="address.path"
        :disabled="!isOpen"
        v-if="openInput"
        maxlength="50"
        @change="sentData"
      ></v-text-field>
      <v-text-field
        class="ml-1"
        label="備註"
        v-model="address.detail"
        :disabled="!isOpen"
        v-if="openRemark"
        maxlength="50"
        @change="sentData"
      ></v-text-field>
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
    addressValue: {
      type: Object,
      default: null,
      required: false
    },
    faceTrade: {
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
  created() {
    if(!this.isOptional){
      this.isOpen = true;
      this.openTrade();
    }

    getCity()
      .then(res => {
        this.cityArr = res.data;
      })
      .catch(error => {
        console.log(error);
      })
  },
  computed: {
    getAddress() {
      if(!this.address.city){
        return this.addressValue.name + ' ' + this.addressValue.address;
      }
      return this.address.city + this.address.area + this.address.road + this.address.path + this.address.detail;
    },
    getFaceTrade() {
      if(!this.address.city){
        return this.faceTrade.FaceTradeCity +
          this.faceTrade.FaceTradeArea +
          this.faceTrade.FaceTradeRoad +
          this.faceTrade.FaceTradePath +
          this.faceTrade.FaceTradeDetail;
      }
      return this.address.city + this.address.area + this.address.road + this.address.path + this.address.detail;
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
  methods: {
    openTrade() {
      this.$emit('isOpenTrade', this.isOpen);
    },
    getAreaArr() {
      this.address.area = '';
      this.address.road = '';
      this.addressValue = '';
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
</style>
