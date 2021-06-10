// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@/assets/stylus/all.styl'
import App from './App'
import router from './router'
import store from './store';
import VueCookies from 'vue-cookies'


Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueCookies)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
