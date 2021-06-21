<template>
  <div class="selectImg">
    <section class="selectImg__choose" @click="clickUploadPic" @drop.prevent="dropPic" @dragover.prevent>
      <figure class="selectImg__icon" v-if="preview.length === 0">
        <img class="img-resp" src="@/assets/icon/select-photo.svg" alt="upload img icon">
      </figure>
      <div class="selectImg__preview preview" v-else>
        <div class="preview__cntr" v-for="(item, index) in preview" :key="index">
          <a href="#" @click.prevent.stop="removePic(index)" class="preview__removebtn">X</a>
          <figure class="preview__inner">
            <img class="preview__img img-resp" :src="item" :alt="index">
          </figure>
        </div>
      </div>
      <input class="selectImg__btn"
        id="selectImg"
        type="file"
        value="選擇照片"
        accept="image/*"
        multiple="multiple"
        @change="selectPic"
      >
      <p class="preview__desc text-center">點擊或拖曳來上傳圖片 (最多五張)</p>
    </section>

  </div>
</template>

<script>
export default {
  name: 'SelectImg',
  data() {
    return {
      preview: [],
      image: [],
    }
  },
  methods: {
    // 拖曳上傳圖檔
    dropPic(e) {
      let dt = e.dataTransfer;
      let files = dt.files;
      this.handleFiles(files);
    },
    // 點擊觸發 form 選取
    clickUploadPic() {
      document.getElementById('selectImg').click();
    },
    // form 選取
    selectPic(e){
      this.handleFiles(e.target.files)
    },
    // 處理檔案
    handleFiles(files) {
      if(files.length > 5 || (this.image.length + files.length) > 5){
        alert('系統：一次最多只能上傳五張，請重試。')
        return;
      }

      if(this.image.length >= 5){
        alert('系統：圖片最多只能上傳五張，請重試。')
        return;
      }

      let f = files;
      // 如果他有值
      if (f) {
        for(let i = 0; i < f.length; i++){
          // 建立一個讀檔器
          const reader = new FileReader();
          reader.onload = (e) => {
            this.preview.push(e.target.result);
          }
          this.image.push(f[i]);
          reader.readAsDataURL(f[i]);
        }
      }
      this.$emit('getImgFiles', this.image);
    },
    // 刪除圖片
    removePic(index) {
      this.image.splice(index, 1);
      this.preview.splice(index, 1);
      this.$emit('getImgFiles', this.image);
    },


  }
}
</script>

<style lang="stylus" scoped>
.selectImg
  margin-top 1em
  margin-bottom 2em

  &__choose
    border 1px solid $bg-dark
    cursor pointer
    padding 1em

  &__icon
    width 32px
    margin-left auto
    margin-right auto
    margin-bottom 1em
  &__btn
    position absolute
    top -100%
    opacity 1

.preview
  display flex
  &__cntr
    position relative
    width 19%
    padding 1em
    background-color $gray
    display flex
    align-items center
    margin-right 1.25%
    &:last-child
      margin-right 0
  &__removebtn
    display block
    font-size $font-sizes-xs
    width 20px
    height @width
    line-height @width
    background-color $danger
    text-align center
    color $light
    border-radius 50%
    position absolute
    top -6px
    right -6px

</style>
