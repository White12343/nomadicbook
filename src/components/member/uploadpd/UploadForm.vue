<template>
  <div class="upload-form">
    <form class="upload-form__cntr">
      <SelectImg class="upload-form__selectImg" @getImgFiles="getImgs"/>
      <div class="upload-form__form-wrap">
        <!-- ISBN -->
        <div class="form__input-group">
          <label class="form__label" for="Isbn">ISBN: </label>
          <input type="text" class="form__input" id="Isbn" v-model="uploadData.ISBN">
          <button class="form__btn" type="submit" @click.prevent="getDataByISBN">ISBN 代入資料</button>
        </div>
        <!-- 出版日 -->

        <label class="form__label" for="PublishYear">出版日期：</label>
        <div class="form__input-wrap">
          <label class="form__label mr-1" for="PublishYear">年:</label>
          <input type="number" class="form__input" id="PublishYear" v-model="publish.year">
          <label class="form__label ml-1 mr-1" for="PublishMonth">月: </label>
          <input type="number" class="form__input" id="PublishMonth" v-model="publish.month">
          <label class="form__label ml-1 mr-1" for="PublishDay">日: </label>
          <input type="number" class="form__input" id="PublishDay" v-model="publish.day">
        </div>
        <!-- 書名 -->
        <div class="form__input-group">
          <label class="form__label" for="BookName">書名: </label>
          <input type="text" class="form__input" id="BookName" v-model="uploadData.BookName">
        </div>
        <!-- 作者 -->
        <div class="form__input-group">
          <label class="form__label" for="Author">作者: </label>
          <input type="text" class="form__input" id="Author" v-model="uploadData.Author">
        </div>
        <!-- 出版社 -->
        <div class="form__input-group">
          <label class="form__label" for="PublishingHouse">出版社: </label>
          <input type="text" class="form__input" id="PublishingHouse" v-model="uploadData.PublishingHouse">
        </div>
        <!-- 分類 -->
        <div class="form__input-group">
          <label class="form__label" for="Catgory">分類: </label>
          <select type="text" class="form__input" id="Catgory" v-model="uploadData.CategoryId">
            <option value="" disabled>請選擇</option>
            <option value="1">1</option>
          </select>
        </div>
        <!-- 長寬高 -->
        <div class="form__input-wrap">
          <label class="form__label mr-1" for="BookLong">長: </label>
          <input type="number" class="form__input" id="BookLong" v-model="uploadData.BookLong">

          <label class="form__label ml-1 mr-1" for="BookWidth">寬: </label>
          <input type="number" class="form__input" id="BookWidth" v-model="uploadData.BookWidth">

          <label class="form__label ml-1 mr-1" for="BookHigh">高: </label>
          <input type="number" class="form__input" id="BookHigh" v-model="uploadData.BookHigh">
        </div>
        <!-- 簡介 -->
        <div class="form__input-group">
          <label class="form__label" for="Introduction">簡介: </label>
          <textarea class="form__input" id="Introduction" v-model="uploadData.Introduction" rows="5" cols="100"></textarea>
        </div>
        <!-- 書況 -->
        <div class="form__input-group">
          <label class="form__label" for="Condition">書況: </label>
          <textarea class="form__input" id="Condition" v-model="uploadData.Condition" rows="5" cols="100"></textarea>
        </div>
        <!-- 姓名 -->
        <div class="form__input-group">
          <label class="form__label" for="TrueName">姓名: </label>
          <input type="text" class="form__input" id="TrueName" v-model="uploadData.TrueName">
        </div>
        <!-- 手機 -->
        <div class="form__input-group">
          <label class="form__label" for="CellphoneNumber">手機: </label>
          <input type="text" class="form__input" id="CellphoneNumber" v-model="uploadData.CellphoneNumber">
        </div>
        <!-- 地址 -->
        <h3 class="upload-form__tit">交易方式</h3>
        <h4 class="upload-form__subtit">*請至少選擇一種交易方式</h4>
        <AddressSelect title="宅配 ( 郵寄、黑貓 )" nameId="Delivery" :openInput="true" @getVal="getAddress"/>
        <AddressSelect title="面交" nameId="FaceTrade" :openInput="true" :openRemark="true" @getVal="getTradeAddress"/>
        <!-- <AddressSelect title="店到店" nameId="Store"/> -->
        <IMailBoxSelect title="i 郵箱" nameId="MailBox" @getVal="getIMailAddress"/>
        <div class="upload-form__btn-group text-right">
          <router-link to="/member" class="form__btn form__btn--light">取消</router-link>
          <button class="form__btn" type="submit" v-if="!bookId" @click.prevent="upLoadBook">上架</button>
          <button class="form__btn" type="submit" v-else @click="updataBookData">更新</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { uploadProduct, getDataByISBNApi } from "@/request/api";
import SelectImg from './form/SelectImg';
import FormInput from './form/FormInput';
import FormTextarea from './form/FormTextarea';
import AddressSelect from './form/AddressSelect';
import IMailBoxSelect from './form/IMailBoxSelect';

export default {
  name: 'UploadFrom',
  props: ['bookId'],
  data() {
    return {
      publish: {
        year: '',
        month: '',
        day: '',
      },
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
        Condition: "測試",
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
      }
    }
  },
  created() {
    if(this.bookId) {
      console.log('上架頁：帶入' + this.bookId + '資料');
    }

  },
  computed: {
    getPublishDate() {
      return `${this.publish.year}-${this.publish.month}-${this.publish.day}`;
    },
    getUserId() {
      return this.$store.state.user.id;
    },
    getFormData() {
      let formData = new FormData()
      formData.append('UserId', this.getUserId)
      formData.append('PublishDate', this.getPublishDate)
      formData.append('Isbn', this.uploadData.ISBN)
      formData.append('BookName', this.uploadData.BookName)
      formData.append('Author', this.uploadData.Author)
      formData.append('PublishingHouse', this.uploadData.PublishingHouse)
      formData.append('CategoryId', this.uploadData.CategoryId)
      formData.append('BookLong', this.uploadData.BookLong)
      formData.append('BookWidth', this.uploadData.BookWidth)
      formData.append('BookHigh', this.uploadData.BookHigh)
      formData.append('Introduction', this.uploadData.Introduction)
      formData.append('Condition', this.uploadData.Condition)
      formData.append('StoreAddress', this.uploadData.StoreAddress)
      formData.append('StoreName', this.uploadData.StoreName)
      formData.append('MailBoxAddress', this.uploadData.MailBoxAddress)
      formData.append('MailBoxName', this.uploadData.MailBoxName)
      formData.append('HomeAddress', this.uploadData.HomeAddress)
      formData.append('FaceTradeCity', this.uploadData.FaceTradeCity)
      formData.append('FaceTradeArea', this.uploadData.FaceTradeArea)
      formData.append('FaceTradeRoad', this.uploadData.FaceTradeRoad)
      formData.append('FaceTradePath', this.uploadData.FaceTradePath)
      formData.append('FaceTradeDetail', this.uploadData.FaceTradeDetail)
      formData.append('TrueName', this.uploadData.TrueName)
      formData.append('CellphoneNumber', this.uploadData.CellphoneNumber)
      this.uploadData.BookPhoto.forEach(el => {
        formData.append("BookPhoto", el);
      });


      return formData;
    }


  },
  methods: {
    upLoadBook() {
      this.$http.post('/api/product/new', this.getFormData)
      .then((res) => {
        console.log(res);
        alert('上架成功');
        this.$router.push('/member/booth');
      })
      .catch(error => {
        console.log(error);
        alert('上架失敗');
      })

      // uploadProduct(JSON.stringify(this.uploadData))
      //   .then(res => {
      //     console.log(res.data);
      //     alert('上架成功');
      //     this.$router.push('/member/booth');
      //   })
      //   .catch(error => {
      //     alert('上架失敗');
      //     console.log(error);
      //   })
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
          vm.publish.year = publishDate[0];
          vm.publish.month = publishDate[1];
          vm.publish.day = publishDate[2];
          vm.uploadData.PublishingHouse = res.data.publishingHouse;
        })
        .catch(error => {
          alert('取得失敗，請確認是否有輸入正確 ISBN');
          console.log(error);
        })
    },
    getImgs(val) {
      this.uploadData.BookPhoto = val
    }

  },
  components: {
    SelectImg,
    FormInput,
    FormTextarea,
    AddressSelect,
    IMailBoxSelect,
  }
}
</script>

<style lang="stylus" scoped>
.upload-form

  &__tit, &__subtit
    margin-bottom 6px
  &__subtit
    color $danger
  &__cntr
    display flex
    justify-content space-between
  &__selectImg
    width 40%
    margin-right 3%
  &__form-wrap
    width 57%

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
