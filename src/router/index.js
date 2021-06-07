import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/layout/Home'
import ProductList from '@/layout/ProductList'
import SignIn from '@/layout/SignIn'
import SignUp from '@/layout/SignUp'

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
    }

  ]
})
