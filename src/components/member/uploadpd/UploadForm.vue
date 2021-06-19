<template>
  <div class="upload-form">
    <form class="upload-form__cntr">
      <SelectImg />
      <!-- ISBN -->
      <div class="form__input-group">
        <label for="Isbn">ISBN: </label>
        <input type="text" class="form__input" id="Isbn" v-model="uploadData.ISBN">
        <button class="upload-form__btn" type="submit" @click.prevent="getDataByISBN">ISBN 代入資料</button>
      </div>
      <!-- 出版日 -->
      <div class="form__input-group">
        <label for="PublishYear">出版年:</label>

        <input type="number" class="form__input" id="PublishYear" v-model="publish.year">
        <label for="PublishMonth">月: </label>
        <input type="number" class="form__input" id="PublishMonth" v-model="publish.month">
        <label for="PublishDay">日: </label>
        <input type="number" class="form__input" id="PublishDay" v-model="publish.day">
      </div>
      <!-- 書名 -->
      <div class="form__input-group">
        <label for="BookName">書名: </label>
        <input type="text" class="form__input" id="BookName" v-model="uploadData.BookName">
      </div>
      <!-- 作者 -->
      <div class="form__input-group">
        <label for="Author">作者: </label>
        <input type="text" class="form__input" id="Author" v-model="uploadData.Author">
      </div>
      <!-- 出版社 -->
      <div class="form__input-group">
        <label for="PublishingHouse">出版社: </label>
        <input type="text" class="form__input" id="PublishingHouse" v-model="uploadData.PublishingHouse">
      </div>
      <!-- 分類 -->
      <div class="form__input-group">
        <label for="Catgory">分類: </label>
        <select type="text" class="form__input" id="Catgory" v-model="uploadData.CategoryId">
          <option value="" disabled>請選擇</option>
          <option value="1">1</option>
        </select>
      </div>
      <!-- 長寬高 -->
      <div class="form__input-group">
        <label for="BookLong">長: </label>
        <input type="number" class="form__input" id="BookLong" v-model="uploadData.BookLong">
        <label for="BookWidth">寬: </label>
        <input type="number" class="form__input" id="BookWidth" v-model="uploadData.BookWidth">
        <label for="BookHigh">高: </label>
        <input type="number" class="form__input" id="BookHigh" v-model="uploadData.BookHigh">
      </div>
      <!-- 簡介 -->
      <div class="form__input-group">
        <label for="Introduction">簡介: </label>
        <textarea class="form__input" id="Introduction" v-model="uploadData.Introduction" rows="5" cols="100"></textarea>
      </div>
      <!-- 書況 -->
      <div class="form__input-group">
        <label for="Condition">書況: </label>
        <textarea class="form__input" id="Condition" v-model="uploadData.Condition" rows="5" cols="100"></textarea>
      </div>
      <!-- 姓名 -->
      <div class="form__input-group">
        <label for="TrueName">姓名: </label>
        <input type="text" class="form__input" id="TrueName" v-model="uploadData.TrueName">
      </div>
      <!-- 手機 -->
      <div class="form__input-group">
        <label for="CellphoneNumber">手機: </label>
        <input type="text" class="form__input" id="CellphoneNumber" v-model="uploadData.CellphoneNumber">
      </div>
      <!-- 地址 -->
      <h3 class="upload-form__tit">交易方式</h3>
      <h4 class="upload-form__subtit">*請至少選擇一種交易方式</h4>
      <AddressSelect title="宅配 ( 郵寄、黑貓 )" nameId="Delivery" :openInput="true" @getVal="getAddress"/>
      <AddressSelect title="面交" nameId="FaceTrade" :openInput="true" :openRemark="true" @getVal="getTradeAddress"/>
      <!-- <AddressSelect title="店到店" nameId="Store"/> -->
      <IMailBoxSelect title="i 郵箱" nameId="MailBox" @getVal="getIMailAddress"/>
      <div class="upload-form__btn-group">
        <router-link to="/member" class="upload-form__btn">取消</router-link>
        <button class="upload-form__btn" type="submit" v-if="!bookId" @click.prevent="upLoadBook">上架</button>
        <button class="upload-form__btn" type="submit" v-else @click="updataBookData">更新</button>
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
        Condition: "",
        StoreAddress: null,
        StoreName: null,
        MailBoxAddress: null,
        MailBoxName: null,
        HomeAddress: "",
        FaceTradeCity: "",
        FaceTradeArea: "",
        FaceTradeRoad: "",
        FaceTradePath: "",
        FaceTradeDetail: "",
        TrueName: "",
        CellphoneNumber: "",
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
    }
  },
  methods: {
    upLoadBook() {
      this.uploadData.PublishDate = this.getPublishDate;
      this.uploadData.UserId = this.getUserId;
      console.log(this.uploadData);
      uploadProduct(JSON.stringify(this.uploadData))
        .then(res => {
          console.log(res.data);
          alert('上架成功');
          this.$router.push('/member/booth');
        })
        .catch(error => {
          alert('上架失敗');
          console.log(error);
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
          vm.publish.year = publishDate[0];
          vm.publish.month = publishDate[1];
          vm.publish.day = publishDate[2];
          vm.uploadData.PublishingHouse = res.data.publishingHouse;
        })
        .catch(error => {
          alert('取得失敗，請確認是否有輸入正確 ISBN');
          console.log(error);
        })
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

.form
  &__input-group
    margin-bottom 1em
</style>
