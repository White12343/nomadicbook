"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRoad = exports.getArea = exports.getCity = exports.uploadProduct = exports.getSeekBookList = exports.getMatchDetail = exports.getMatchList = exports.getAskBookList = exports.getBoothBookList = exports.getBookDetail = exports.getBookList = exports.checkMail = exports.checkNickName = exports.userSignin = exports.userSignUp = void 0;

var _http = _interopRequireDefault(require("./http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// user.js
// user
var userSignUp = function userSignUp(signUpData) {
  return (0, _http["default"])("post", "/user/signup", signUpData);
};

exports.userSignUp = userSignUp;

var userSignin = function userSignin(logInData) {
  return (0, _http["default"])("post", "/user/signin", logInData);
}; // export const userLogOut = () => req("get", "/user/logout");
// 檢查


exports.userSignin = userSignin;

var checkNickName = function checkNickName(nickName) {
  return (0, _http["default"])("get", "/user/name", nickName);
};

exports.checkNickName = checkNickName;

var checkMail = function checkMail(mail) {
  return (0, _http["default"])("get", "/user/mail", mail);
}; // export const userDelete = (nickName) => req("delete", "/user/delete", nickName);
// 取得產品列表
// export const getBookList = () => req("get", "/json/pd.json"); // 測試用


exports.checkMail = checkMail;

var getBookList = function getBookList() {
  return (0, _http["default"])("get", "/product/list");
}; // 取得產品 detail
// export const getBookDetail = () => req("get", "/json/detail.json"); // 測試用


exports.getBookList = getBookList;

var getBookDetail = function getBookDetail(id) {
  return (0, _http["default"])("get", "/product/" + id);
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
}; // 上架


exports.getSeekBookList = getSeekBookList;

var uploadProduct = function uploadProduct(data) {
  return (0, _http["default"])("post", "/product/new", data);
}; // 地址
// city


exports.uploadProduct = uploadProduct;

var getCity = function getCity() {
  return (0, _http["default"])("get", "/Trade/address/city");
};

exports.getCity = getCity;

var getArea = function getArea(data) {
  return (0, _http["default"])("get", "/Trade/address/area", data);
};

exports.getArea = getArea;

var getRoad = function getRoad(data) {
  return (0, _http["default"])("get", "/Trade/address/road", data);
}; // 使用範例

/*
import { uploadProduct } from "@/request/api";

uploadProduct()
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    // response 攔截器會先執行，除非你漏接了，才會進到 catch
    console.log(error);
  })
*/


exports.getRoad = getRoad;