<template>
  <div class="upload-form">
    <v-form class="upload-form__cntr"
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <SelectImg class="upload-form__selectImg" @getImgFiles="getImgs"/>
      <v-row justify="space-around">
        <v-col cols="12" md="6">
          <!-- ISBN -->
          <v-text-field label="ISBN" id="Isbn" v-model="uploadData.ISBN"></v-text-field>
          <v-btn
            color="primary"
            class="mr-4"
            @click="getDataByISBN"
          >
            ISBN 自動帶入
          </v-btn>
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

          <v-row align="center">
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                class="mr-1"
                :items="categoryNameArr"
                label="大分類"
                v-model="category.top"
                @change="getSubCategory"
                :rules="defaultRules"
                required
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                class="mr-1"
                :items="subCategoryArr"
                label="中分類"
                v-model="category.mid"
                :rules="defaultRules"
                required
              ></v-select>
            </v-col>
            <!-- <v-col class="d-flex" cols="12" sm="4">
              <v-select
                class="mr-1"
                :items="categoryArr"
                label="大分類"
                v-model="category"
              ></v-select>
            </v-col> -->
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
          <v-textarea
            name="input-7-1"
            id="Introduction"
            label="簡介(選填)"
            v-model="uploadData.Introduction"
          ></v-textarea>
          <!-- 書況 -->
          <v-select
            v-model="conditionValue"
            :items="defaultCondition"
            attach
            chips
            label="書況(選填)"
            multiple
          ></v-select>
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
            <small class="red--text" v-if="this.isOpenTradeMode">請至少選擇一種交易方式</small>
            <!-- <AddressSelect title="店到店" nameId="Store"/> -->
            <AddressSelect title="宅配 ( 郵寄、黑貓 )" nameId="Delivery" :openInput="true" @getVal="getAddress" @isOpenTrade="isDeliveryOpen"/>
            <AddressSelect title="面交" nameId="FaceTrade" :openInput="true" :openRemark="true" @getVal="getTradeAddress" @isOpenTrade="isFaceOpen"/>
            <IMailBoxSelect title="i 郵箱" nameId="MailBox" @getVal="getIMailAddress" @isOpenTrade="isMailBoxOpen"/>
            <div class="upload-form__btn-group text-right">
              <v-btn class="mr-4" @click="$router.push('/member')">取消</v-btn>
              <v-btn color="primary" class="mr-4" v-if="!bookId" @click="upLoadBook">上架</v-btn>
              <v-btn color="primary" class="mr-4" v-else @click="updataBookData">更新</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { getDataByISBNApi, getCategory } from "@/request/api";
import SelectImg from './form/SelectImg';
import FormInput from './form/FormInput';
import FormTextarea from './form/FormTextarea';
import AddressSelect from './form/AddressSelect';
import IMailBoxSelect from './form/IMailBoxSelect';
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

export default {
  name: 'UploadFrom',
  props: ['bookId'],
  data() {
    return {
      valid: true,
      date: '',
      menu: false,
      defaultCondition: ['破損','有做筆記','包書套','九成新','泛黃'],
      conditionValue: [],
      defaultRules: [
        v => !!v || '此為必填欄位',
      ],
      phoneRules: [
        v => !!v || '此為必填欄位',
        v => /^09[0-9]{8}$/.test(v) || '請填入正確手機號碼',
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
        StoreAddress: null,
        StoreName: null,
        MailBoxAddress: null,
        MailBoxName: null,
        HomeAddress: "新北市蘆洲區長榮路",
        FaceTradeCity: "",
        FaceTradeArea: "",
        FaceTradeRoad: "",
        FaceTradePath: "",
        FaceTradeDetail: "",
        TrueName: "李翊銘",
        CellphoneNumber: "0983191227",
        BookPhoto:[]
      },
      category: {
        top: '',
        mid: '',
      },
      categoryNameArr: [
        '中文書',
        '簡體書',
        '外文書',
      ],
      subCategoryArr: [],
      tradeModeOpen: {
        delivery: false,
        face: false,
        stroe: false,
        mailBox: false,
      }
    }
  },
  created() {
    if(this.bookId) {
      console.log('上架頁：帶入' + this.bookId + '資料');
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
      formData.append('CategoryId', this.uploadData.CategoryId)
      formData.append('BookLong', this.uploadData.BookLong)
      formData.append('BookWidth', this.uploadData.BookWidth)
      formData.append('BookHigh', this.uploadData.BookHigh)
      formData.append('Introduction', this.uploadData.Introduction)
      formData.append('Condition', this.conditionValue.join(','))
      // 店到店開放
      if(this.tradeModeOpen.stroe){
        formData.append('StoreAddress', this.uploadData.StoreAddress)
        formData.append('StoreName', this.uploadData.StoreName)
      }
      // i郵箱開放
      if(this.tradeModeOpen.mailBox){
        formData.append('MailBoxAddress', this.uploadData.MailBoxAddress)
        formData.append('MailBoxName', this.uploadData.MailBoxName)
      }
      // 宅配開放
      if(this.tradeModeOpen.delivery){
        formData.append('HomeAddress', this.uploadData.HomeAddress)
      }
      // 面交開放
      if(this.tradeModeOpen.face){
        formData.append('FaceTradeCity', this.uploadData.FaceTradeCity)
        formData.append('FaceTradeArea', this.uploadData.FaceTradeArea)
        formData.append('FaceTradeRoad', this.uploadData.FaceTradeRoad)
        formData.append('FaceTradePath', this.uploadData.FaceTradePath)
        formData.append('FaceTradeDetail', this.uploadData.FaceTradeDetail)
      }
      formData.append('TrueName', this.uploadData.TrueName)
      formData.append('CellphoneNumber', this.uploadData.CellphoneNumber)
      this.uploadData.BookPhoto.forEach(el => {
        formData.append("BookPhoto", el);
      });
      return formData;
    },
    isOpenTradeMode() {
      return !this.tradeModeOpen.stroe &&
        !this.tradeModeOpen.face &&
        !this.tradeModeOpen.mailBox &&
        !this.tradeModeOpen.delivery;
    }


  },
  methods: {
    upLoadBook() {
      if(this.isOpenTradeMode){
        return;
      }
      if(!this.$refs.form.validate()){
        return;
      }
      this.$http.post('/api/product/new', this.getFormData)
      .then((res) => {
        alert('上架成功');
        this.$router.push('/member/booth');
      })
      .catch(error => {
        console.log(error);
        alert('上架失敗');
      })
    },
    updataBookData() {
      alert('上架頁：更新產品資料' + this.bookId);
      this.$router.push('/member/booth');
    },
    getTradeAddress(val) {
      this.uploadData.FaceTradeCity = val.city;
      this.uploadData.FaceTradeArea = val.area;
      this.uploadData.FaceTradeRoad = val.road;
      this.uploadData.FaceTradePath = val.path;
      this.uploadData.FaceTradeDetail = val.detail;
    },
    getAddress(val) {
      this.uploadData.HomeAddress = val.city + val.area + val.road + val.path;
    },
    getIMailAddress(val) {
      this.uploadData.MailBoxAddress = val.detail.mailboxAddress;
      this.uploadData.MailBoxName = val.detail.mailboxName;

    },
    getDataByISBN() {
      let vm = this;
      getDataByISBNApi({
        isbn: this.uploadData.ISBN,
      })
        .then(res => {
          vm.uploadData.Author = res.data.author;
          vm.uploadData.BookHigh = res.data.bookHigh;
          vm.uploadData.BookLong = res.data.bookLong;
          vm.uploadData.BookWidth = res.data.bookWidth;
          vm.uploadData.BookName = res.data.bookName;
          vm.uploadData.CategoryId = res.data.categoryId;
          // 分類名稱
          // vm.uploadData.CategoryName = res.data.categoryName;
          vm.uploadData.Introduction = res.data.introduction;
          let publishDate = res.data.publishDate.split('/');
          vm.date = `${publishDate[0]}-${publishDate[1]}-${publishDate[2]}`;
          vm.uploadData.PublishingHouse = res.data.publishingHouse;
        })
        .catch(error => {
          alert('取得失敗，請確認是否有輸入正確 ISBN');
          console.log(error);
        })
    },
    getImgs(val) {
      this.uploadData.BookPhoto = val
    },
    getSubCategory(val) {
      let vm = this;
      vm.category.mid = '';
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
    isDeliveryOpen(val) {
      this.tradeModeOpen.delivery = val;
    },
    isFaceOpen(val) {
      this.tradeModeOpen.face = val;
    },
    isMailBoxOpen(val) {
      this.tradeModeOpen.mailBox = val;
    }


  },
  components: {
    SelectImg,
    FormInput,
    FormTextarea,
    AddressSelect,
    IMailBoxSelect,
    DatePick,
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


.form
  &__input-wrap
    display flex
    align-items center

  &__input-group
    margin-bottom 1em

  &__label
    display block
  &__input
    display block
    width 100%
    border 1px solid $dark
    padding 6px
    margin-top .6em
    margin-bottom 1em

  &__btn
    display inline-block
    background-color $accent
    padding 6px 2em
    color $light
    cursor pointer
    &--light
      background-color $light
      color $text-primary
</style>
