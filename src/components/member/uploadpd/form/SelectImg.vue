<template>
  <div class="selectImg">
    <section class="selectImg__choose" @click="clickUploadPic" @drop.prevent="dropPic" @dragover.prevent>
      <figure class="selectImg__icon" v-if="preview.length === 0">
        <img class="img-resp" src="@/assets/icon/select-photo.svg" alt="upload img icon">
      </figure>
      <div class="selectImg__preview preview" v-else>
        <div class="preview__cntr" v-for="(item, index) in preview" :key="index">
          <v-btn
            color="red"
            fab
            x-small
            class="preview__removebtn white--text"
            @click.prevent.stop="removePic(index)"
          >
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
          <figure class="preview__inner">
            <img class="preview__img img-resp" :src="item" :alt="index">
          </figure>
          <!-- <v-img
            max-height="150"
            max-width="250"
            :src="item"
            :alt="index"
          ></v-img> -->
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
  props: {
    limit: {
      type: Number,
      default: 0,
      require: false,
    }
  },
  data() {
    return {
      preview: [],
      image: [],
      max: 5,
    }
  },
  computed: {
    getImgLenLimit() {
      return this.max - this.limit;
    },
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
      if(files.length > this.getImgLenLimit || (this.image.length + files.length) > this.getImgLenLimit){
        alert(`系統：最多只能上傳 ${this.getImgLenLimit} 張，請重試。`)
        return;
      }

      if(this.image.length >= this.getImgLenLimit){
        alert(`系統：最多只能上傳 ${this.getImgLenLimit} 張，請重試。`)
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
    position absolute
    top -12px
    right -12px

</style>
