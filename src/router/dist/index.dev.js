"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("@/views/Home"));

var _BookList = _interopRequireDefault(require("@/views/BookList"));

var _Detail = _interopRequireDefault(require("@/views/Detail"));

var _Login = _interopRequireDefault(require("@/views/Login"));

var _SignIn = _interopRequireDefault(require("@/views/login/SignIn"));

var _SignUp = _interopRequireDefault(require("@/views/login/SignUp"));

var _Member = _interopRequireDefault(require("@/views/Member"));

var _Profile = _interopRequireDefault(require("@/views/Profile"));

var _Manage = _interopRequireDefault(require("@/views/Manage"));

var _UploadPd = _interopRequireDefault(require("@/views/mamber/UploadPd"));

var _Booth = _interopRequireDefault(require("@/views/mamber/Booth"));

var _OffShelf = _interopRequireDefault(require("@/views/mamber/OffShelf"));

var _SeekManage = _interopRequireDefault(require("@/views/trademanage/SeekManage"));

var _AskManage = _interopRequireDefault(require("@/views/trademanage/AskManage"));

var _MatchManage = _interopRequireDefault(require("@/views/trademanage/MatchManage"));

var _TradeMatch = _interopRequireDefault(require("@/views/trademanage/TradeMatch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var router = new _vueRouter["default"]({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Home',
    component: _Home["default"]
  }, {
    path: '/booklist/:mainId?/:bigCategory?',
    name: 'BookList',
    component: _BookList["default"]
  }, {
    path: '/detail/:id',
    name: 'Detail',
    component: _Detail["default"]
  }, // 登入管理
  {
    path: '/login',
    name: 'Login',
    component: _Login["default"],
    beforeEnter: function beforeEnter(to, from, next) {
      if (!$cookies.get('isLogin') || $cookies.get('isLogin') === '0') {
        next();
      } else {
        alert('您已登入');
        next('/');
      }
    },
    children: [{
      path: 'signin',
      name: 'SignIn',
      component: _SignIn["default"]
    }, {
      path: 'signup',
      name: 'SignUp',
      component: _SignUp["default"]
    }]
  }, {
    path: '/uploadpd/:id?',
    name: 'UploadPd',
    component: _UploadPd["default"],
    beforeEnter: function beforeEnter(to, from, next) {
      if ($cookies.get('isLogin') && $cookies.get('isLogin') === '1') {
        next();
      } else {
        alert('請先登入');
        next('/signin');
      }
    }
  }, // 管理
  {
    path: '/manage',
    name: 'Manage',
    redirect: 'manage/seek',
    component: _Manage["default"],
    beforeEnter: function beforeEnter(to, from, next) {
      if ($cookies.get('isLogin') && $cookies.get('isLogin') === '1') {
        next();
      } else {
        alert('請先登入');
        next('/signin');
      }
    },
    children: [{
      path: 'seek',
      name: 'Seek',
      component: _SeekManage["default"]
    }, {
      path: 'ask',
      name: 'Ask',
      component: _AskManage["default"]
    }, {
      path: 'match',
      name: 'Match',
      component: _MatchManage["default"]
    }, {
      path: 'matchdetail/:id',
      name: 'MatchDetail',
      component: _TradeMatch["default"]
    }]
  }, // 會員資料、攤位頁
  {
    path: '/member',
    name: 'Member',
    redirect: 'member/booth',
    component: _Member["default"],
    beforeEnter: function beforeEnter(to, from, next) {
      if ($cookies.get('isLogin') && $cookies.get('isLogin') === '1') {
        next();
      } else {
        alert('請先登入');
        next('/signin');
      }
    },
    children: [{
      path: 'booth',
      name: 'Booth',
      component: _Booth["default"]
    }, {
      path: 'offshelf',
      name: 'OffShelf',
      component: _OffShelf["default"]
    }]
  }, // 設定、修改個人資料
  {
    path: '/profile',
    name: 'Profile',
    component: _Profile["default"],
    beforeEnter: function beforeEnter(to, from, next) {
      if ($cookies.get('isLogin') && $cookies.get('isLogin') === '1') {
        next();
      } else {
        alert('請先登入');
        next('/signin');
      }
    },
    children: [// {
      //   path: 'booth',
      //   name: 'Booth',
      //   component: Booth,
      // },
    ]
  }]
});
var _default = router;
exports["default"] = _default;