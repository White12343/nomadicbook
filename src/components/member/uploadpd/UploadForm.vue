<template>
  <div class="upload-form">
    <v-form class="upload-form__cntr"
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <SelectImg class="upload-form__selectImg" @getImgFiles="getImgs" :limit="defaultPhoto.length"/>
      <!-- 預設圖片 -->
      <v-row>
        <v-col
          class="photo"
          v-for="item, index in defaultPhoto"
          :key="index"
          cols="12"
          sm="6"
          md="2"
          lg="2"
        >
          <v-img
            max-height="150"
            max-width="250"
            :src="`http://35.236.167.85/photo/${item.bookPhoto}.jpg`"
          ></v-img>
          <v-btn
            color="red"
            fab
            x-small
            class="white--text photo__remove-btn"
            @click="deletePhoto(item.bookPhotoId, index)"
          >
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="space-around">
        <v-col cols="12" md="6">
          <!-- ISBN -->
          <v-row align="center">
            <v-col
              cols="12"
              sm="9"
              md="8"
              lg="8"
            >
              <v-text-field label="ISBN" id="Isbn" v-model="uploadData.ISBN"></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="3"
              md="3"
              lg="3"
            >
              <v-btn
                color="primary"
                class="mr-4"
                @click="getDataByISBN"
                :disabled="isISBNBtnClick"
                :loading="isISBNBtnClick"
              >
                ISBN 自動帶入
              </v-btn>
            </v-col>
          </v-row>
          <!-- 出版日 -->
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="出版日期"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="defaultRules"
                required
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="menu = false"
              >
                取消
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(date)"
              >
                確認
              </v-btn>
            </v-date-picker>
          </v-menu>
          <!-- 書名 -->
          <v-text-field
            label="書名"
            id="BookName"
            v-model="uploadData.BookName"
            :rules="defaultRules"
            required
          ></v-text-field>
          <v-row align="center">
            <v-col class="d-flex" cols="12" sm="6">
              <!-- 作者 -->
              <v-text-field
                label="作者"
                id="Author"
                v-model="uploadData.Author"
                :rules="defaultRules"
                required
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <!-- 出版社 -->
              <v-text-field
                label="出版社"
                id="PublishingHouse"
                v-model="uploadData.PublishingHouse"
                :rules="defaultRules"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- 分類 -->
          <v-row align="center">
            <v-col class="d-flex" cols="12" sm="4">
              <v-select
                class="mr-1"
                :items="categoryNameArr"
                label="大分類"
                v-model="category.top"
                @change="getSubCategory"
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="4">
              <v-select
                class="mr-1"
                :items="subCategoryArr"
                label="中分類"
                @change="getBottomCategory"
                v-model="category.mid"
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="4">
              <v-select
                class="mr-1"
                :items="bottomCategoryArr"
                label="小分類"
                item-text="detailCategory"
                item-value="categoryId"
                v-model="category.bottom"
                :rules="defaultRules"
                required
              ></v-select>
            </v-col>
          </v-row>
          <!-- 書況 -->
          <v-row>
            <v-col
              cols="12"
              md="3"
            >
              <v-select
                v-model="condition"
                :items="conditionDegree"
                item-text="name"
                item-value="val"
                attach
                chips
                label="新舊"
                :rules="defaultRules"
                required
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              md="9"
            >
            <v-select
              v-model="conditionValue"
              :items="defaultCondition"
              attach
              chips
              label="書況(選填)"
              multiple
            ></v-select>

            </v-col>
          </v-row>

          <!-- 長寬高 -->
          <v-row align="center">
            <v-col class="d-flex" cols="12" sm="4">
              <v-text-field
                label="長(選填)"
                id="BookLong"
                v-model="uploadData.BookLong"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="4">
              <v-text-field
                label="寬(選填)"
                id="BookWidth"
                v-model="uploadData.BookWidth"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="4">
              <v-text-field
                label="高(選填)"
                id="BookHigh"
                v-model="uploadData.BookHigh"
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- 簡介 -->
          <!-- <v-textarea
            name="input-7-1"
            id="Introduction"
            label="簡介(選填)"
            v-model="uploadData.Introduction"
          ></v-textarea> -->
          <Editor v-model="uploadData.Introduction"/>
          <!-- 心得 -->
          <v-textarea
            name="input-7-1"
            id="experience"
            label="心得(選填)"
            v-model="experience"
            hint="填寫心得可以在首頁提高曝光率"
            :rules="expRules"
            required
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="6">

          <div class="upload-form__form-wrap">
            <!-- 姓名 -->
            <v-text-field
              label="姓名"
              id="TrueName"
              v-model="uploadData.TrueName"
              :rules="defaultRules"
              required
            ></v-text-field>
            <!-- 手機 -->
            <v-text-field
              label="手機"
              id="CellphoneNumber"
              v-model="uploadData.CellphoneNumber"
              :rules="phoneRules"
              required
            ></v-text-field>
            <!-- 地址 -->
            <h3 class="upload-form__tit">交易方式</h3>
            <small class="red--text" v-if="isOpenTradeMode">請至少選擇一種交易方式</small>
            <AddressSelect
              title="宅配 ( 郵寄、黑貓 )"
              nameId="Delivery"
              :openInput="true"
              @getVal="getAddress"
              @isOpenTrade="isDeliveryOpen"
              :addressValue="delivery"
              :hasDefault="delivery.default"
            />
            <AddressSelect
              title="面交"
              nameId="FaceTrade"
              :openInput="true"
              :openRemark="true"
              @getVal="getTradeAddress"
              @isOpenTrade="isFaceOpen"
              :faceTrade="faceTrade"
              :hasDefault="faceTrade.default"
            />

            <StoreSelect
              title="7-11 店到店"
              nameId="Store"
              @getVal="getStoreAddress"
              @isOpenTrade="isStoreBoxOpen"
              :addressValue="store"
              :hasDefault="store.default"
            />
            <IMailBoxSelect
              title="i 郵箱"
              nameId="MailBox"
              @getVal="getIMailAddress"
              @isOpenTrade="isMailBoxOpen"
              :addressValue="mailBox"
              :hasDefault="mailBox.default"
            />
          </div>

          <div class="upload-form__btn-group text-right">
            <v-btn class="mr-4" @click="$router.push(`/member/${$cookies.get('user').id}/booth`)">取消</v-btn>
            <v-btn
              color="primary"
              class="mr-4"
              v-if="!bookId"
              @click="upLoadBook"
              :disabled="isUpload"
              :loading="isUpload"

            >上架</v-btn>
            <v-btn
              color="primary"
              class="mr-4"
              v-else
              @click="updataBookData"
              :disabled="isUpload"
              :loading="isUpload"

            >更新</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import {
  getDataByISBNApi,
  getCategory,
  getCategoryDetail,
  getBookDetail,
  getUserDetail,
  deletePhotoByApi,
  getCategoryBelong,
  uploadProduct,
  putProduct,
} from "@/request/api";
import SelectImg from '@/components/member/uploadpd/form/SelectImg';
import AddressSelect from '@/components/member/uploadpd/form/AddressSelect';
import IMailBoxSelect from '@/components/member/uploadpd/form/IMailBoxSelect';
import StoreSelect from '@/components/member/uploadpd/form/StoreSelect';
import Editor from '@/components/tools/Editor';
import 'vue-date-pick/dist/vueDatePick.css';

export default {
  name: 'UploadFrom',
  props: ['bookId'],
  data() {
    return {
      isUpload: false,
      valid: true,
      date: '',
      menu: false,
      defaultCondition: [
        '近全新',
        '保存良好',
        '無劃記',
        '無泛黃',
        '無污損',
        '無摺角',
        '無碰撞',
        '無灰塵印',
        '無脫落缺頁',
        '無黃黑斑',
        '無大量黃黑斑',
        '膠膜未拆',
        '有附件',
        '未使用習題或著色本',
        '沒有書釘或膠貼'
      ],
      condition: '',
      conditionValue: [],
      experience: '',
      defaultRules: [
        v => !!v || '此為必填欄位',
      ],
      phoneRules: [
        v => !!v || '此為必填欄位',
        v => /^09[0-9]{8}$/.test(v) || '請填入正確手機號碼',
      ],
      expRules: [
        v => v.length <= 2000 || '請勿超過 2000 字',
      ],
      uploadData: {
        UserId: null,
        PublishDate: "",
        ISBN: "",
        BookName: "",
        Author: "",
        PublishingHouse: "",
        CategoryId: "",
        BookLong: null,
        BookWidth: null,
        BookHigh: null,
        Introduction: "",
        Condition: "",
        TrueName: "",
        CellphoneNumber: "",
        BookPhoto:[]
      },
      category: {
        top: '',
        mid: '',
        bottom: {
          id: '',
          name: '',
        },
      },
      categoryNameArr: [
        '中文書',
        '簡體書',
        '外文書',
      ],
      subCategoryArr: [],
      bottomCategoryArr: [],
      tradeModeOpen: {
        delivery: false,
        face: false,
        store: false,
        mailBox: false,
      },
      hasDefaultAddress: false,

      defaultPhoto: [],
      isISBNBtnClick: false,
      // 交易方式
      // 宅配
      delivery: {
        default: false,
        address: '',
        name: '',
      },
      // mailbox
      mailBox: {
        default: false,
        address: null,
        name: null,
      },
      // 7-11
      store: {
        default: false,
        address: null,
        name: null,
      },
      // 面交
      faceTrade: {
        default: false,
        FaceTradeCity: "",
        FaceTradeArea: "",
        FaceTradeRoad: "",
        FaceTradePath: "",
        FaceTradeDetail: "",
      }


    }
  },
  created() {
    if(this.bookId) {
      getBookDetail(this.bookId)
        .then(res => {
          this.uploadData.TrueName = res.data.trueName;
          this.uploadData.CellphoneNumber = res.data.cellphoneNumber;
          this.uploadData.BookName = res.data.bookName;
          this.uploadData.Author = res.data.author;
          this.uploadData.BookHigh = res.data.bookHigh;
          this.uploadData.BookId = res.data.bookId;
          this.uploadData.BookLong = res.data.bookLong;
          this.uploadData.BookWidth = res.data.bookWidth;
          this.categoryBelong(res.data.categoryId);
          this.condition = res.data.conditionNum;
          this.experience = res.data.experience;
          this.uploadData.Introduction = this.replaceIntroduction(res.data.introduction);
          this.uploadData.ISBN = res.data.isbn;
          this.uploadData.PublishingHouse = res.data.publishingHouse;
          this.conditionValue = res.data.condition.split(',');

          this.defaultCategory = res.data.categoryDetail;
          this.date = res.data.publishDate;

          this.defaultPhoto = res.data.bookPhotos;
          if(res.data.homeAddress){
            this.hasDefaultAddress = true;
            this.delivery.default = true;
            // this.tradeModeOpen.delivery = true;
            // 宅配
            this.delivery.address = res.data.homeAddress;
          }
          if(res.data.mailBoxAddress){
            this.hasDefaultAddress = true;
            this.mailBox.default = true;
            // this.tradeModeOpen.mailBox = true;
            // mail
            this.mailBox.address = res.data.mailBoxAddress;
            this.mailBox.name = res.data.mailBoxName;
          }
          if(res.data.storeAddress){
            this.hasDefaultAddress = true;
            this.store.default = true;
            // this.tradeModeOpen.store = true;
            // 7-11
            this.store.address = res.data.storeAddress;
            this.store.name = res.data.storeName;
          }
          if(res.data.faceTradeRoad){
            this.hasDefaultAddress = true;
            this.faceTrade.default = true;
            // this.tradeModeOpen.face = true;
            // 面交
            this.faceTrade.FaceTradeCity = res.data.faceTradeCity;
            this.faceTrade.FaceTradeArea = res.data.faceTradeArea;
            this.faceTrade.FaceTradeDetail = res.data.faceTradeDetail;
            this.faceTrade.FaceTradePath = res.data.faceTradePath;
            this.faceTrade.FaceTradeRoad = res.data.faceTradeRoad;
          }
        })
        .catch(error => {
          console.log(error);
        })
    }else {
      getUserDetail($cookies.get('user').id)
        .then(res => {
          this.uploadData.TrueName = res.data.trueName;
          this.uploadData.CellphoneNumber = res.data.cellphoneNumber;
          if(res.data.homeAddress){
            this.hasDefaultAddress = true;
            this.delivery.default = true;
            // this.tradeModeOpen.delivery = true;
            // 宅配
            this.delivery.address = res.data.homeAddress;
          }
          if(res.data.mailBoxAddress){
            this.hasDefaultAddress = true;
            this.mailBox.default = true;
            // this.tradeModeOpen.mailBox = true;
            // mail
            this.mailBox.address = res.data.mailBoxAddress;
            this.mailBox.name = res.data.mailBoxName;
          }
          if(res.data.storeAddress){
            this.hasDefaultAddress = true;
            this.store.default = true;
            // this.tradeModeOpen.store = true;
            // 7-11
            this.store.address = res.data.storeAddress;
            this.store.name = res.data.storeName;
          }
          if(res.data.faceTradeRoad){
            this.hasDefaultAddress = true;
            this.faceTrade.default = true;
            // this.tradeModeOpen.face = true;
            // 面交
            this.faceTrade.FaceTradeCity = res.data.faceTradeCity;
            this.faceTrade.FaceTradeArea = res.data.faceTradeArea;
            this.faceTrade.FaceTradeDetail = res.data.faceTradeDetail;
            this.faceTrade.FaceTradePath = res.data.faceTradePath;
            this.faceTrade.FaceTradeRoad = res.data.faceTradeRoad;
          }
        })
        .catch(error => {
          console.log(error);
        })
    }



  },
  computed: {
    getUserId() {
      return this.$store.state.user.id;
    },
    getFormData() {
      let formData = new FormData()
      formData.append('UserId', this.getUserId)
      formData.append('PublishDate', this.date)
      formData.append('Isbn', this.uploadData.ISBN)
      formData.append('BookName', this.uploadData.BookName)
      formData.append('Author', this.uploadData.Author)
      formData.append('PublishingHouse', this.uploadData.PublishingHouse)
      formData.append('CategoryId', this.category.bottom)
      if(this.uploadData.BookLong) {
        formData.append('BookLong', this.uploadData.BookLong)
      }
      if(this.uploadData.BookWidth) {
        formData.append('BookWidth', this.uploadData.BookWidth)
      }
      if(this.uploadData.BookHigh) {
        formData.append('BookHigh', this.uploadData.BookHigh)
      }
      formData.append('Introduction', this.uploadData.Introduction)
      formData.append('experience', this.experience)
      formData.append('Condition', this.conditionValue.join(','))
      formData.append('conditionNum', this.condition)
      // 店到店開放
      if(this.tradeModeOpen.store){
        formData.append('StoreAddress', this.store.address)
        formData.append('StoreName', this.store.name)
      }
      // i郵箱開放
      if(this.tradeModeOpen.mailBox){
        formData.append('MailBoxAddress', this.mailBox.address)
        formData.append('MailBoxName', this.mailBox.name)
      }
      // 宅配開放
      if(this.tradeModeOpen.delivery){
        formData.append('HomeAddress', this.delivery.address)
      }
      // 面交開放
      if(this.tradeModeOpen.face){
        formData.append('FaceTradeCity', this.faceTrade.FaceTradeCity)
        formData.append('FaceTradeArea', this.faceTrade.FaceTradeArea)
        formData.append('FaceTradeRoad', this.faceTrade.FaceTradeRoad)
        formData.append('FaceTradePath', this.faceTrade.FaceTradePath)
        formData.append('FaceTradeDetail', this.faceTrade.FaceTradeDetail)
      }
      formData.append('TrueName', this.uploadData.TrueName)
      formData.append('CellphoneNumber', this.uploadData.CellphoneNumber)
      this.uploadData.BookPhoto.forEach(el => {
        formData.append("BookPhoto", el);
      });
      return formData;
    },
    isOpenTradeMode() {
      return !this.tradeModeOpen.store &&
        !this.tradeModeOpen.face &&
        !this.tradeModeOpen.mailBox &&
        !this.tradeModeOpen.delivery;
    },
    conditionDegree() {
      let arr = [];
      for(let i = 9; i > 0; i--){
        arr.push({
          val: i,
          name: `${i} 成新`
        })
      }
      return arr;
    },
    getHomeAddress() {
      return this.faceTrade.FaceTradeCity +
        this.faceTrade.FaceTradeArea +
        this.faceTrade.FaceTradeRoad +
        this.faceTrade.FaceTradePath +
        this.faceTrade.FaceTradeDetail;
    },
    getIMailAddressAll() {
      return this.mailBox.name + this.mailBox.address;
    },


  },
  methods: {
    upLoadBook() {
      // if(!this.hasDefaultAddress){
        if(this.isOpenTradeMode){
          alert('請至少選擇一種交易方式')
          return;
        }
      // }
      if(!(this.defaultPhoto.length + this.uploadData.BookPhoto.length)) {
        alert('請至少上傳一張照片')
        return;
      }
      if(!this.condition) {
        alert('請選擇新舊程度')
      }
      if(!this.uploadData.TrueName){
        alert('請選擇填寫真實姓名(在交易達成後提供給對方交易資訊)')
      }
      if(!this.uploadData.CellphoneNumber){
        alert('請選擇填寫手機號碼(在交易達成後提供給對方交易資訊)')
      }
      if(!this.$refs.form.validate()){
        return;
      }
      this.isUpload = true;
      uploadProduct(this.getFormData)
        .then((res) => {
          alert('上架成功');
          this.isUpload = false;
          this.$router.push(`/member/${$cookies.get('user').id}/booth`);
        })
        .catch(error => {
          console.log(error);
          this.isUpload = false;
          alert('上架失敗，請確認資料是否有正確填寫');
        })
    },
    updataBookData() {
      // if(!this.hasDefaultAddress){
        if(this.isOpenTradeMode){
          alert('請至少選擇一種交易方式')
          return;
        }
      // }
      if(!(this.defaultPhoto.length + this.uploadData.BookPhoto.length)) {
        alert('請至少上傳一張照片')
        return;
      }
      if(!this.uploadData.TrueName){
        alert('請選擇填寫真實姓名(在交易達成後提供給對方交易資訊)')
      }
      if(!this.uploadData.CellphoneNumber){
        alert('請選擇填寫手機號碼(在交易達成後提供給對方交易資訊)')
      }
      if(!this.$refs.form.validate()){
        return;
      }
      this.isUpload = true;
      putProduct(this.bookId, this.getFormData)
        .then((res) => {
          alert(res.data);
          this.isUpload = false;
          this.$router.push(`/member/${$cookies.get('user').id}/booth`);
        })
        .catch(error => {
          console.log(error);
          alert('資料未修改');
          this.isUpload = false;
          this.$router.push(`/member/${$cookies.get('user').id}/booth`);
        })
    },
    getTradeAddress(val) {
      this.faceTrade.FaceTradeCity = val.city;
      this.faceTrade.FaceTradeArea = val.area;
      this.faceTrade.FaceTradeRoad = val.road;
      this.faceTrade.FaceTradePath = val.path;
      this.faceTrade.FaceTradeDetail = val.detail;
    },
    getAddress(val) {
      this.delivery.address = val.city + val.area + val.road + val.path;
    },
    getIMailAddress(val) {
      this.mailBox.address = val.Address;
      this.mailBox.name = val.Name;

    },
    getStoreAddress(val) {
      this.store.address = val.Address;
      this.store.name = val.Name;

    },
    getDataByISBN() {
      let vm = this;
      if(this.uploadData.ISBN){
        this.isISBNBtnClick = true;
        getDataByISBNApi({
          isbn: this.uploadData.ISBN,
        })
          .then(res => {
            vm.uploadData.Author = res.data.author;
            vm.uploadData.BookHigh = res.data.bookHigh;
            vm.uploadData.BookLong = res.data.bookLong;
            vm.uploadData.BookWidth = res.data.bookWidth;
            vm.uploadData.BookName = res.data.bookName;
            vm.categoryBelong(res.data.categoryId)
            vm.uploadData.Introduction = vm.replaceIntroduction(res.data.introduction);
            let publishDate = res.data.publishDate.split('/');
            vm.date = `${publishDate[0]}-${publishDate[1]}-${publishDate[2]}`;
            vm.uploadData.PublishingHouse = res.data.publishingHouse;
            vm.isISBNBtnClick = false;
          })
          .catch(error => {
            alert('系統忙碌中，請稍後再試。');
            console.log(error);
            this.isISBNBtnClick = false;
          })
      }

    },
    getImgs(val) {
      this.uploadData.BookPhoto = val
    },
    getSubCategory(val) {
      let vm = this;
      vm.category.mid = '';
      vm.category.bottom = '';
      getCategory({
        mainId: (this.categoryNameArr.indexOf(val) + 1),
      })
        .then(res => {
          vm.subCategoryArr = res.data;
        })
        .catch(error => {
          console.log(error);
        })
    },
    getBottomCategory(val) {
      let vm = this;
      vm.category.bottom = '';
      getCategoryDetail({
        mainId: (this.categoryNameArr.indexOf(this.category.top) + 1),
        bigName: val,
      })
        .then(res => {
          vm.bottomCategoryArr = res.data;
        })
        .catch(error => {
          console.log(error);
        })
    },
    isDeliveryOpen(val) {
      this.tradeModeOpen.delivery = val;
    },
    isFaceOpen(val) {
      this.tradeModeOpen.face = val;
    },
    isMailBoxOpen(val) {
      this.tradeModeOpen.mailBox = val;
    },
    isStoreBoxOpen(val) {
      this.tradeModeOpen.store = val;
    },
    deletePhoto(id, index) {
      deletePhotoByApi(id)
        .then(res => {
          this.defaultPhoto.splice(index, 1);
        })
        .catch(error => {
          console.log(error);
        })
    },
    categoryBelong(val) {
      getCategoryBelong({
        categoryId: val,
      })
        .then(res => {
          this.category.top = res.data.mainName;
          this.getSubCategory(this.category.top);
          this.category.mid = res.data.bigCategory;
          this.getBottomCategory(this.category.mid);
          this.category.bottom = val;

        })
        .catch(error => {
          console.log(error);
        })
    },
    replaceIntroduction(introduction) {
      let str = introduction
        .replace(/div/g, 'p')
        // .replace(/&nbsp;/g, '')
      return str;

    }


  },
  components: {
    SelectImg,
    AddressSelect,
    IMailBoxSelect,
    StoreSelect,
    Editor,
  }
}
</script>

<style lang="stylus" scoped>

.upload-form

  &__tit, &__subtit
    margin-bottom 6px
  &__subtit
    color $danger

  &__date input
      font-size 1em !important


.photo
  position relative
  &__remove-btn
    position absolute
    top -12px
    right -6px
</style>
