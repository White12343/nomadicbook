<template>
  <section class="detail">
    <div class="detail__info">
      <BookPic :book-photo="bookDesc.BookPhoto" :book-name="bookDesc.BookName"/>
      <BookInfo
        :user-name="bookDesc.UserName"
        :book-name="bookDesc.BookName"
        :book-author="bookDesc.Author"
        :publish-date="bookDesc.PublishDate"
        :publisher="bookDesc.Publisher"
      />
    </div>
    <div class="detail__cntr">
      <BookCntr cntr-title="簡介" :cntr="bookDesc.Introduction" />
      <BookCntr cntr-title="書況" :cntr="bookDesc.Condition" />
    </div>
  </section>
</template>

<script>
import BookPic from '../components/detail/BookPic';
import BookInfo from '../components/detail/BookInfo';
import BookCntr from '../components/detail/BookCntr';

export default {
  namd: 'Detail',
  data() {
    return {
      bookDesc: {
        UserName: 'Lee',
        ReleaseDate: '2020-06-08',
        ISBN: '9781974709953',
        BookName: 'Chainsaw Man, Vol. 3',
        Author: 'Tatsuki Fujimoto',
        Publisher: 'Viz Media, Subs. of Shogakukan Inc',
        CategoryDetail: '',
        PublishDate: '2020-06-08',
        BookLong: '127',
        BookWidth: '191',
        BookHigh: '18',
        Introduction: 'Denji was a small-time devil hunter just trying to survive a harsh world. After being killed on a job, Denji is revived by his pet devil-dog Pochita and becomes something new and dangerous-Chainsaw Man!',
        Condition: "A mysterious devil is demanding Denji's heart! But will the devil hunters from Division 4 agree to this deal to save themselves? Or will Denji have to do what Denji does best-turn into a chainsaw and carve up everything that gets in his way?!",
        BookStatus: '',
        StoreAddress: '',
        StoreName: '',
        MailBoxAddress: '',
        MailBoxName: '',
        HomeAddress: '',
        FaceTradeCity: '',
        FaceTradeArea: '',
        FaceTradeRound: '',
        FaceTradePath: '',
        FaceTradeDetail: '',
        TrueName: '',
        CellphoneNumber: '',
        BookPhoto: [
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/9747/9781974714803.jpg',
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/9747/9781974709953.jpg',
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/9747/9781974714803.jpg',
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/9747/9781974709953.jpg',
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/9747/9781974714803.jpg',
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/9747/9781974709953.jpg',
        ],
      }
    }
  },
  created() {
    console.log(this.$route.params.id);
    // 用 id 去 call api

  },
  computed: {

  },
  components: {
    BookPic,
    BookInfo,
    BookCntr,
  }
}
</script>

<style lang="stylus" scoped>
.detail
  &__info
    display flex


</style>
