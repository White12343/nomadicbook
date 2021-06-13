import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

// 定義一個新的 Vue Store
const store = new Vuex.Store({
  state: {
    isLoading: true,
    isLogin: $cookies.get('isLogin'),
  },
  mutations: {
    // 將 state 設為參數
    Loaded(state) {
      state.isLoading = !state.isLoading;
    }
  }

})

export default store;

