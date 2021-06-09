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
      <h4>請至少選擇一種交易方式</h4>
      <AddressSelect title="面交" nameId="FaceTrade"/>
      <AddressSelect title="店到店" nameId="Store"/>
      <AddressSelect title="黑貓" nameId="BlackCat"/>
      <AddressSelect title="郵寄" nameId="PostOffice"/>
      <AddressSelect title="i 郵箱" nameId="MailBox"/>
      <div class="upload-form__btn-group">
        <a href="#" class="upload-form__btn">取消</a>
        <button class="upload-form__btn" type="submit">上架</button>
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
  data() {
    return {
      uploadData: {

      }
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

</style>
