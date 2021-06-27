"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _axios = _interopRequireDefault(require("axios"));

var _vueAxios = _interopRequireDefault(require("vue-axios"));

require("@/assets/stylus/all.styl");

var _App = _interopRequireDefault(require("./App"));

var _vueCookies = _interopRequireDefault(require("vue-cookies"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _vuetify = _interopRequireDefault(require("@/plugins/vuetify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// path to vuetify export
_vue["default"].config.productionTip = false;

_vue["default"].use(_vueAxios["default"], _axios["default"]);

_vue["default"].use(_vueCookies["default"]);
/* eslint-disable no-new */


new _vue["default"]({
  el: '#app',
  router: _router["default"],
  store: _store["default"],
  components: {
    App: _App["default"]
  },
  vuetify: _vuetify["default"],
  template: '<App/>'
});