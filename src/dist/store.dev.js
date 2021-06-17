"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]); // 定義一個新的 Vue Store


var store = new _vuex["default"].Store({
  state: {
    isLoading: true,
    isLogin: $cookies.get('isLogin'),
    user: $cookies.get('user')
  },
  mutations: {
    // 將 state 設為參數
    Loaded: function Loaded(state) {
      state.isLoading = !state.isLoading;
    },
    changeLoginState: function changeLoginState(state) {
      state.isLogin = $cookies.get('isLogin');
      state.user = $cookies.get('user');
    }
  }
});
var _default = store;
exports["default"] = _default;