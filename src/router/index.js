import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import BookList from '@/views/BookList'
import ExperienceList from '@/views/ExperienceList'
import Detail from '@/views/Detail'
import Login from '@/views/Login'
import SignIn from '@/views/login/SignIn'
import SignUp from '@/views/login/SignUp'
import ForgetPassword from '@/views/login/ForgetPassword'
import Member from '@/views/Member'
import Notifications from '@/views/Notifications'
import Setting from '@/views/Setting'
import Profile from '@/views/profile/Profile'
import Password from '@/views/profile/Password'
import Manage from '@/views/Manage'
import UploadPd from '@/views/mamber/UploadPd'
import Booth from '@/views/mamber/Booth'
import OffShelf from '@/views/mamber/OffShelf'
import SeekManage from '@/views/trademanage/SeekManage'
import AskManage from '@/views/trademanage/AskManage'
import MatchManage from '@/views/trademanage/MatchManage'
import Record from '@/views/trademanage/Record'

Vue.use(Router)

// 解決重複點擊路由報錯的 BUG
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const router = new Router({
  // mode: 'history',
  scrollBehavior(to, from,savedPosition) {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/booklist/:mainId?/:bigCategory?/:keyword?/:filternum?/:filter?',
      name: 'BookList',
      component: BookList
    },
    {
      path: '/experienceList',
      name: 'ExperienceList',
      component: ExperienceList
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
        {
          path: 'forget',
          name: 'ForgetPassword',
          component: ForgetPassword,
        },
      ]
    },
    {
      path: '/uploadpd/:id?',
      name: 'UploadPd',
      component: UploadPd,
      beforeEnter: (to, from, next) => {
        if($cookies.get('isLogin') && $cookies.get('isLogin') === '1'){
          next();
        }else{
          alert('請先登入');
          next('/signin');
        }
      },
    },
    // 管理
    {
      path: '/manage',
      name: 'Manage',
      redirect: 'manage/seek',
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
          path: 'record',
          name: 'Record',
          component: Record,
        },
      ]
    },
    // 會員資料、攤位頁
    {
      path: '/member/:id?',
      name: 'Member',
      redirect: 'member/booth',
      component: Member,
      // beforeEnter: (to, from, next) => {
      //   if($cookies.get('isLogin') && $cookies.get('isLogin') === '1'){
      //     next();
      //   }else{
      //     alert('請先登入');
      //     next('/signin');
      //   }
      // },
      children: [
        {
          path: 'booth/',
          name: 'Booth',
          component: Booth,
        },
        {
          path: 'offshelf/',
          name: 'OffShelf',
          component: OffShelf,
        }
      ]
    },
    // 設定、修改個人資料
    {
      path: '/setting',
      name: 'Setting',
      redirect: '/setting/profile',
      component: Setting,
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
          path: 'profile',
          name: 'Profile',
          component: Profile,
        },
        {
          path: 'password',
          name: 'Password',
          component: Password,
        },
      ]
    },
    // 通知
    {
      path: '/notifications/:id',
      name: 'Notifications',
      component: Notifications,
    },

  ]
})


export default router;
