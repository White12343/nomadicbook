"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSeekBookList = exports.getMatchDetail = exports.getMatchList = exports.getAskBookList = exports.getBoothBookList = exports.getBookDetail = exports.getBookList = exports.userDelete = exports.userLogOut = exports.userLogIn = exports.userSignUp = void 0;

var _http = _interopRequireDefault(require("./http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// user.js
var userSignUp = function userSignUp(signUpData) {
  return (0, _http["default"])("post", "/user/sign-in", signUpData);
};

exports.userSignUp = userSignUp;

var userLogIn = function userLogIn(logInData) {
  return (0, _http["default"])("post", "/user/log-in", logInData);
};

exports.userLogIn = userLogIn;

var userLogOut = function userLogOut() {
  return (0, _http["default"])("get", "/user/log-out");
};

exports.userLogOut = userLogOut;

var userDelete = function userDelete(userNo) {
  return (0, _http["default"])("delete", "/user/delete", userNo);
}; // 取得產品列表


exports.userDelete = userDelete;

var getBookList = function getBookList() {
  return (0, _http["default"])("get", "/json/pd.json");
}; // 取得產品 detail


exports.getBookList = getBookList;

var getBookDetail = function getBookDetail() {
  return (0, _http["default"])("get", "/json/detail.json");
}; // 管理
// Booth


exports.getBookDetail = getBookDetail;

var getBoothBookList = function getBoothBookList() {
  return (0, _http["default"])("get", "/json/pd.json");
}; // Ask Manage


exports.getBoothBookList = getBoothBookList;

var getAskBookList = function getAskBookList() {
  return (0, _http["default"])("get", "/json/ask.json");
}; // Match Manage


exports.getAskBookList = getAskBookList;

var getMatchList = function getMatchList() {
  return (0, _http["default"])("get", "/json/match.json");
}; // Match Detail


exports.getMatchList = getMatchList;

var getMatchDetail = function getMatchDetail() {
  return (0, _http["default"])("get", "/json/matchdetail.json");
}; // Seek Manage


exports.getMatchDetail = getMatchDetail;

var getSeekBookList = function getSeekBookList() {
  return (0, _http["default"])("get", "/json/pd.json");
}; // 使用範例

/*
import { getBookList } from "@/request/api";

getBookList()
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    // response 攔截器會先執行，除非你漏接了，才會進到 catch
    console.log(error);
  })
*/


exports.getSeekBookList = getSeekBookList;