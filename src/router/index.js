import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import ProductList from '@/views/ProductList'
import SignIn from '@/views/SignIn'
import SignUp from '@/views/SignUp'
import UploadPd from '@/views/UploadPd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/productlist',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/uploadpd',
      name: 'UploadPd',
      component: UploadPd
    }

  ]
})
