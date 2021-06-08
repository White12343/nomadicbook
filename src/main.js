// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import '@/assets/stylus/all.styl'

import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

import store from './store';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
