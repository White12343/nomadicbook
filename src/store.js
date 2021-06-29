import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

// 定義一個新的 Vue Store
const store = new Vuex.Store({
  state: {
    isLoading: true,
    isLogin: $cookies.get('isLogin'),
    user: $cookies.get('user'),
  },
  mutations: {
    // 將 state 設為參數
    Loaded(state) {
      state.isLoading = !state.isLoading;
    },
    changeLoginState(state) {
      state.isLogin = $cookies.get('isLogin');
      state.user = $cookies.get('user');
      console.log("!");
      console.log(state.user);
    },

  }

})

export default store;

