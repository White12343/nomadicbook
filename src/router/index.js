import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import BookList from '@/views/BookList'
import Detail from '@/views/Detail'
import SignIn from '@/views/SignIn'
import SignUp from '@/views/SignUp'
import UploadPd from '@/views/UploadPd'
import TradeManage from '@/views/TradeManage'
import TradeMatch from '@/views/TradeMatch'
import SeekManage from '@/views/trademanage/SeekManage'
import AskManage from '@/views/trademanage/AskManage'
import MatchManage from '@/views/trademanage/MatchManage'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/booklist',
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
          alert('您已登入');
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
          alert('您已登入');
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
          alert('請先登入');
          next('/signin');
        }
      }
    },
    {
      path: '/trademanage',
      name: 'TradeManage',
      component: TradeManage,
      beforeEnter: (to, from, next) => {
        if($cookies.get('isLogin') && $cookies.get('isLogin') === '1'){
          next();
        }else{
          alert('請先登入');
          next('/signin');
        }
      }
    },
    {
      path: '/tradematch',
      name: 'TradeMatch',
      component: TradeMatch,
      beforeEnter: (to, from, next) => {
        if($cookies.get('isLogin') && $cookies.get('isLogin') === '1'){
          next();
        }else{
          alert('請先登入');
          next('/signin');
        }
      }
    },
    {
      path: '/seekmanage',
      name: 'SeekManage',
      component: SeekManage,
      beforeEnter: (to, from, next) => {
        if($cookies.get('isLogin') && $cookies.get('isLogin') === '1'){
          next();
        }else{
          alert('請先登入');
          next('/signin');
        }
      }
    },
    {
      path: '/askmanage',
      name: 'AskManage',
      component: AskManage,
      beforeEnter: (to, from, next) => {
        if($cookies.get('isLogin') && $cookies.get('isLogin') === '1'){
          next();
        }else{
          alert('請先登入');
          next('/signin');
        }
      }
    },
    {
      path: '/matchmanage',
      name: 'MatchManage',
      component: MatchManage,
      beforeEnter: (to, from, next) => {
        if($cookies.get('isLogin') && $cookies.get('isLogin') === '1'){
          next();
        }else{
          alert('請先登入');
          next('/signin');
        }
      }
    },

  ]
})

// router.beforeEach((to, from, next) => {
//   console.log(to,from);
//   next();
// })


export default router;
