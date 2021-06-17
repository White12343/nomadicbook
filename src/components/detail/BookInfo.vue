<template>
  <article class="book-info">
    <header class="book-info__head">
      <h2 class="book-info__tit">{{ bookName }}</h2>
    </header>
    <div class="book-info__user">
      <a href="#" class="book-info__user-name">{{ userName }}</a>
      <a href="#" class="book-info__stall-btn">查看攤位</a>
    </div>
    <ul class="book-info__list">
      <li class="book-info__list-item">作者：{{ bookAuthor }}</li>
      <li class="book-info__list-item">出版社：{{ publisher }}</li>
      <li class="book-info__list-item">出版日：{{ publishDate }}</li>
    </ul>
    <div class="book-info__trade">
      <h3 class="book-info__trade-tit fs-6">交易方式：</h3>

    </div>
    <div class="book-info__btn-group">
      <Btn
        desc="我要交換"
        btnStyle="dark"
        class="book-info__trade-btn"
        @click.native.stop="openPopup"
      />
      <Popup :visible="isOpenPopup" @hide="isOpenPopup = false">
        <!-- 自定義內容  -->
      </Popup>
      <a href="#" class="book-info__btn book-info__btn-light">聊聊</a>
    </div>
  </article>
</template>

<script>
import Popup from '@/components/ui/Popup';
import Btn from '@/components/ui/Btn';

export default {
  name: 'BookInfo',
  props: [
    'userName',
    'bookName',
    'bookAuthor',
    'publishDate',
    'publisher',
  ],
  data() {
    return {
      isOpenPopup: false,
    }
  },
  methods: {
    checkLogin() {
      if(!$cookies.get('isLogin') || $cookies.get('isLogin') === '0'){
        alert('請先登入');
        this.$router.push('/login/signin');
      }
    },
    openPopup() {
      this.checkLogin();
      this.isOpenPopup = true;
    }
  },
  components: {
    Popup,
    Btn,
  }
}
</script>

<style lang="stylus">
.book-info
  margin-left 1em
  flex-grow 1
  padding 1em
  &__user
    display flex
    align-items center
    margin-top 1em
    margin-bottom 1em

  &__user-photo, &__user-name, &__stall-btn
    margin-right 1em

  &__user-name, &__stall-btn
    display block
    color $headline-dark

  &__user-photo
    width 2em

  &__stall-btn
    border 2px solid $bg-dark
    border-radius 3px
    padding 3px 6px

  &__btn-group
    display flex
    justify-content space-between
    margin-top 2em
  &__btn
    display block
    width 48%
    border 2px solid $bg-dark
    text-align center
    padding 3px 0
    border-radius 5px

    &-dark
      background-color $bg-dark
      color $headline-light
    &-light
      background-color $bg-light
      color $headline-dark
  &__trade-btn
    width 48%

</style>
