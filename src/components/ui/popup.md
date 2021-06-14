
## 使用方式

```
<template>
  <div>
    <!-- 5. 做一個按鈕來打開 isOpen -->
    <a href="#" @click.stop="isOpen = true">OPEN</a>
    <!-- 4. 使用元件，把剛剛定義的 isOpen 用 visible 傳入，並會接收一個 hide 事件，會將 isOpen 設定為 false -->
    <Popup :visible="isOpen" @hide="isOpen = false">
      <!-- 自定義內容  -->
    </Popup>
  </div>
</template>

<script>
// 1. 引入 popup
import Popup from '../components/ui/Popup.vue';
export default {
  data() {
    return {
      // 3. 定義一個 boolean
      isOpen: false,
    }
  },
  components: {
    // 2. 註冊 component
    Popup,
  }

}
</script>

<style>

</style>


```
