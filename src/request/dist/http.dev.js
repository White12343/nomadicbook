"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _axios = _interopRequireDefault(require("axios"));

var _vue = _interopRequireDefault(require("vue"));

var _vueCookies = _interopRequireDefault(require("vue-cookies"));

var _router = _interopRequireDefault(require("@/router"));

var _store = _interopRequireDefault(require("@/store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueCookies["default"]);

var API_PATH = '/api';
var PROD_PATH = process.env.API_ROOT;
var headerConfig = {};

if ($cookies.get('user')) {
  headerConfig = {
    'Content-Type': 'application/json',
    'Authorization': "Bearer ".concat($cookies.get('user').token)
  };
} else {
  headerConfig = {};
} // baseURL 是 API 的主要 Domain，只後發請求時只要填相對路徑就可以了


var instance = _axios["default"].create({
  baseURL: PROD_PATH,
  // headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${$cookies.get('user').token}` },
  headers: headerConfig,
  timeout: 20000
}); // request 的攔截器 (Request Interceptors)，放入兩個函式做為參數。


instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 在 request 送出前攔截到此次的 config，可以做最後的處理。
  if ($cookies.get('user')) {
    config.headers.Authorization = "Bearer ".concat($cookies.get('user').token);
  }

  return config;
}, function (error) {
  // Do something with request error
  // 在 request 發生錯誤時做一些額外的處理。
  return Promise.reject(error);
}); // Response 的攔截器 (Response Interceptors)，

instance.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        console.log('token issure');
        alert('已在其他地方登入，請重新登入');
        $cookies.set('isLogin', '0');
        $cookies.remove('user');

        _store["default"].commit("changeLoginState");

        _router["default"].push('/login/signin');

        break;

      case 404:
        // console.log("你要找的頁面不存在")
        // go to 404 page
        break;

      case 500:
        // console.log("程式發生問題")
        // go to 500 page
        break;

      default:
        console.log(error.message);
    }
  }

  if (!window.navigator.onLine) {
    alert("網路出了點問題，請重新連線後重整網頁");
    return;
  }

  return Promise.reject(error);
});

function _default(method, url) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var config = arguments.length > 3 ? arguments[3] : undefined;
  method = method.toLowerCase();

  switch (method) {
    case "post":
      return instance.post(url, data, config);

    case "get":
      return instance.get(url, {
        params: data
      });

    case "delete":
      return instance["delete"](url, {
        params: data
      });

    case "put":
      return instance.put(url, data);

    case "patch":
      return instance.patch(url, data);

    default:
      console.log("\u672A\u77E5\u7684 method: ".concat(method));
      return false;
  }
}