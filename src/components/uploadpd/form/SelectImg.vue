<template>
  <div class="selectImg">
    <section class="selectImg__choose">
      <figure class="selectImg__icon" v-if="preview.length === 0">
        <img class="img-resp" src="@/assets/icon/select-photo.svg" alt="upload img icon">
      </figure>
      <div class="selectImg__preview preview" v-else>
        <figure class="preview__inner" v-for="(item, index) in preview" :key="index">
          <img class="preview__img img-resp" :src="item" :alt="index">
        </figure>
      </div>
      <input class="selectImg__btn"
        type="file"
        value="選擇照片"
        accept="image/*"
        multiple="multiple"
        @change="previewImage"
      >
    </section>

  </div>
</template>

<script>
export default {
  name: 'SelectImg',
  data() {
    return {
      preview: [],
      image: []
    }
  },
  methods: {
    previewImage: function(event) {
      const input = event.target;
      let count = input.files.length;
      let index = 0;
      if (input.files) {
        while(count --) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.preview.push(e.target.result);
          }
          this.image.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index ++;
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.selectImg

  &__choose
    border 2px solid $bg-dark
    padding 1em

  &__icon
    width 32px

.preview
  display flex
  flex-wrap wrap
  &__inner
    width 20%
  &__img
    max-width 100%

</style>
