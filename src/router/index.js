import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import BookList from '@/views/BookList'
import Detail from '@/views/Detail'
import Login from '@/views/Login'
import SignIn from '@/views/login/SignIn'
import SignUp from '@/views/login/SignUp'
import Member from '@/views/Member'
import UploadPd from '@/views/mamber/UploadPd'
import Manage from '@/views/manage'
import SeekManage from '@/views/trademanage/SeekManage'
import AskManage from '@/views/trademanage/AskManage'
import MatchManage from '@/views/trademanage/MatchManage'
import TradeMatch from '@/views/trademanage/TradeMatch'

Vue.use(Router)

const router = new Router({
  mode: 'history',
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
    // 登入管理
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if(!$cookies.get('isLogin') || $cookies.get('isLogin') === '0'){
          next();
        }else{
          alert('您已登入');
          next('/');
        }
      },
      children: [
        {
          path: 'signin',
          name: 'SignIn',
          component: SignIn,
        },
        {
          path: 'signup',
          name: 'SignUp',
          component: SignUp,
        },
      ]
    },
    // 會員管理
    {
      path: '/member',
      name: 'Member',
      component: Member,
      beforeEnter: (to, from, next) => {
        if($cookies.get('isLogin') && $cookies.get('isLogin') === '1'){
          next();
        }else{
          alert('請先登入');
          next('/signin');
        }
      },
      children: [
        {
          path: 'uploadpd',
          name: 'UploadPd',
          component: UploadPd,
        }
      ]
    },
    // 交易管理
    {
      path: '/manage',
      name: 'Manage',
      redirect: '/manage/seek',
      component: Manage,
      beforeEnter: (to, from, next) => {
        if($cookies.get('isLogin') && $cookies.get('isLogin') === '1'){
          next();
        }else{
          alert('請先登入');
          next('/signin');
        }
      },
      children: [
        {
          path: 'seek',
          name: 'Seek',
          component: SeekManage,
        },
        {
          path: 'ask',
          name: 'Ask',
          component: AskManage,
        },
        {
          path: 'match',
          name: 'Match',
          component: MatchManage,

        },
        {
          path: 'matchdetail',
          name: 'detail',
          component: TradeMatch,
        },
      ]
    },

  ]
})

export default router;
