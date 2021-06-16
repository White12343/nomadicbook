<template>
  <div class="upload-form">
    <form class="upload-form__cntr">
      <SelectImg />
      <FormInput title="ISBN" nameId="Isbn"/>
      <FormInput title="分類" nameId="Catgory"/>
      <FormInput title="書名" nameId="BookName"/>
      <FormTextarea title="簡介" nameId="Introduction"/>
      <FormTextarea title="書況" nameId="Condition"/>

      <h3 class="upload-form__tit">交易方式</h3>
      <h4 class="upload-form__subtit">*請至少選擇一種交易方式</h4>
      <AddressSelect title="面交" nameId="FaceTrade"/>
      <AddressSelect title="店到店" nameId="Store"/>
      <AddressSelect title="黑貓" nameId="BlackCat"/>
      <AddressSelect title="郵寄" nameId="PostOffice"/>
      <AddressSelect title="i 郵箱" nameId="MailBox"/>
      <div class="upload-form__btn-group">
        <router-link to="/member" class="upload-form__btn">取消</router-link>
        <button class="upload-form__btn" type="submit" v-if="!bookId" @click="upLoadBook">上架</button>
        <button class="upload-form__btn" type="submit" v-else @click="updataBookData">更新</button>
      </div>
    </form>
  </div>
</template>

<script>
import SelectImg from './form/SelectImg';
import FormInput from './form/FormInput';
import FormTextarea from './form/FormTextarea';
import AddressSelect from './form/AddressSelect';

export default {
  name: 'UploadFrom',
  props: ['bookId'],
  data() {
    return {
      uploadData: {

      }
    }
  },
  created() {
    if(this.bookId) {
      console.log('上架頁：帶入' + this.bookId + '資料');
    }
  },
  methods: {

    upLoadBook() {
      alert('上架頁：上架產品資料');
      this.$router.push('/member/booth');
    },
    updataBookData() {
      alert('上架頁：更新產品資料' + this.bookId);
      this.$router.push('/member/booth');
    }
  },
  components: {
    SelectImg,
    FormInput,
    FormTextarea,
    AddressSelect,
  }
}
</script>

<style lang="stylus" scoped>
.upload-form
  &__tit, &__subtit
    margin-bottom 6px
  &__subtit
    color $danger
</style>
