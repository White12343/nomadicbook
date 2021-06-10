import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import BookList from '@/views/BookList'
import Detail from '@/views/Detail'
import SignIn from '@/views/SignIn'
import SignUp from '@/views/SignUp'
import UploadPd from '@/views/UploadPd'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      // 若參數為可有可無的話則加上 ? 可顯示無參數的頁面
      path: '/booklist/:id?',
      name: 'BookList',
      component: BookList
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn,
      beforeEnter: (to, from, next) => {
        if(!$cookies.get('isLogin') || $cookies.get('isLogin') === '0'){
          next();
        }else{
          next('/');
        }
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      beforeEnter: (to, from, next) => {
        if(!$cookies.get('isLogin') || $cookies.get('isLogin') === '0'){
          next();
        }else{
          next('/');
        }
      }
    },
    {
      path: '/uploadpd',
      name: 'UploadPd',
      component: UploadPd,
      beforeEnter: (to, from, next) => {
        if($cookies.get('isLogin') && $cookies.get('isLogin') === '1'){
          next();
        }else{
          next('/signin');
        }
      }
    }

  ]
})

// router.beforeEach((to, from, next) => {
//   console.log(to,from);
//   next();
// })


export default router;
