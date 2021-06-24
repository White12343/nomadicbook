"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seekNew = exports.getIMailBox = exports.getRoad = exports.getArea = exports.getCity = exports.deletePhotoByApi = exports.getDataByISBNApi = exports.uploadProduct = exports.getSeekBookList = exports.getMatchDetail = exports.getMatchList = exports.getAskBookList = exports.selectedBook = exports.getAskBoothBookList = exports.setOnShelf = exports.setOffShelf = exports.getBoothBookList = exports.getBookDetail = exports.getBookList = exports.getNotifyNum = exports.getNotify = exports.getCategoryDetail = exports.getCategory = exports.checkMail = exports.checkNickName = exports.setNewPassword = exports.getUserDetail = exports.userSignin = exports.userSignUp = exports.search = exports.getPublishDayList = exports.getNewBookList = exports.getExperienceList = void 0;

var _http = _interopRequireDefault(require("./http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// user.js
// 首頁
var getExperienceList = function getExperienceList(num) {
  return (0, _http["default"])("get", "/HomePage/experiencelist", num);
};

exports.getExperienceList = getExperienceList;

var getNewBookList = function getNewBookList(num) {
  return (0, _http["default"])("get", "/HomePage/newbooklist", num);
};

exports.getNewBookList = getNewBookList;

var getPublishDayList = function getPublishDayList(num) {
  return (0, _http["default"])("get", "/HomePage/publishdaylist", num);
};

exports.getPublishDayList = getPublishDayList;

var search = function search(keyword) {
  return (0, _http["default"])("get", "/HomePage", keyword);
}; // user


exports.search = search;

var userSignUp = function userSignUp(signUpData) {
  return (0, _http["default"])("post", "/user/signup", signUpData);
};

exports.userSignUp = userSignUp;

var userSignin = function userSignin(logInData) {
  return (0, _http["default"])("post", "/user/signin", logInData);
}; // export const userLogOut = () => req("get", "/user/logout");
// 會員資料


exports.userSignin = userSignin;

var getUserDetail = function getUserDetail(id) {
  return (0, _http["default"])("get", "/User/detaildata/" + id);
}; // 修改密碼


exports.getUserDetail = getUserDetail;

var setNewPassword = function setNewPassword(id, data) {
  return (0, _http["default"])("put", "/User/password/" + id, data);
}; // 檢查


exports.setNewPassword = setNewPassword;

var checkNickName = function checkNickName(nickName) {
  return (0, _http["default"])("get", "/user/name", nickName);
};

exports.checkNickName = checkNickName;

var checkMail = function checkMail(mail) {
  return (0, _http["default"])("get", "/user/mail", mail);
}; // export const userDelete = (nickName) => req("delete", "/user/delete", nickName);
// 取得分類


exports.checkMail = checkMail;

var getCategory = function getCategory(id) {
  return (0, _http["default"])("get", "/Product/category", id);
};

exports.getCategory = getCategory;

var getCategoryDetail = function getCategoryDetail(data) {
  return (0, _http["default"])("get", "/Product/category/detail", data);
}; // 取得通知


exports.getCategoryDetail = getCategoryDetail;

var getNotify = function getNotify(id) {
  return (0, _http["default"])("get", "/HomePage/notify/" + id);
};

exports.getNotify = getNotify;

var getNotifyNum = function getNotifyNum(id) {
  return (0, _http["default"])("get", "HomePage/notifynum/" + id);
}; // 取得產品列表
// export const getBookList = () => req("get", "/json/pd.json"); // 測試用


exports.getNotifyNum = getNotifyNum;

var getBookList = function getBookList(data) {
  return (0, _http["default"])("get", "/product/list", data);
}; // 取得產品 detail
// export const getBookDetail = () => req("get", "/json/detail.json"); // 測試用


exports.getBookList = getBookList;

var getBookDetail = function getBookDetail(id) {
  return (0, _http["default"])("get", "/product/" + id);
}; // 管理
// Booth
// export const getBoothBookList = () => req("get", "/json/pd.json"); // 測試用


exports.getBookDetail = getBookDetail;

var getBoothBookList = function getBoothBookList(id) {
  return (0, _http["default"])("get", "/Stall/" + id);
}; // 下架


exports.getBoothBookList = getBoothBookList;

var setOffShelf = function setOffShelf(id) {
  return (0, _http["default"])("put", "/Stall/bookoff/".concat(id));
}; // 上架


exports.setOffShelf = setOffShelf;

var setOnShelf = function setOnShelf(id) {
  return (0, _http["default"])("put", "/Stall/bookon/".concat(id));
}; // 邀約方書本資料


exports.setOnShelf = setOnShelf;

var getAskBoothBookList = function getAskBoothBookList(id, mode) {
  return (0, _http["default"])("get", "/seek/otherpeople/books/".concat(id, "/").concat(mode));
}; // 確認回應邀約方資料


exports.getAskBoothBookList = getAskBoothBookList;

var selectedBook = function selectedBook(id, data) {
  return (0, _http["default"])("put", "/seek/otherpeople/selectedbook/".concat(id), data);
}; // Ask Manage


exports.selectedBook = selectedBook;

var getAskBookList = function getAskBookList(id) {
  return (0, _http["default"])("get", "/seek/otherpeople/" + id);
}; // Match Manage


exports.getAskBookList = getAskBookList;

var getMatchList = function getMatchList(id) {
  return (0, _http["default"])("get", "/seek/match/" + id);
}; // Match Detail


exports.getMatchList = getMatchList;

var getMatchDetail = function getMatchDetail(id) {
  return (0, _http["default"])("get", "/seek/match/detail/" + id);
}; // Seek Manage


exports.getMatchDetail = getMatchDetail;

var getSeekBookList = function getSeekBookList(id) {
  return (0, _http["default"])("get", "/seek/myself/" + id);
}; // 上架


exports.getSeekBookList = getSeekBookList;

var uploadProduct = function uploadProduct(data) {
  return (0, _http["default"])("post", "/product/new", data);
}; // 更新
// export const putProduct = (id) => req("put", "/Stall/bookupdate/" + id);
// isbn


exports.uploadProduct = uploadProduct;

var getDataByISBNApi = function getDataByISBNApi(isbn) {
  return (0, _http["default"])("get", "/Product", isbn);
}; // 刪除圖片


exports.getDataByISBNApi = getDataByISBNApi;

var deletePhotoByApi = function deletePhotoByApi(id) {
  return (0, _http["default"])("delete", "/Stall/" + id);
}; // 地址
// city


exports.deletePhotoByApi = deletePhotoByApi;

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
}; // iMail


exports.getRoad = getRoad;

var getIMailBox = function getIMailBox(data) {
  return (0, _http["default"])("get", "/trade/mailbox", data);
}; // 產品


exports.getIMailBox = getIMailBox;

var seekNew = function seekNew(data) {
  return (0, _http["default"])("post", "/seek/new", data);
}; // 使用範例

/*
import { search } from "@/request/api";

search()
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    // response 攔截器會先執行，除非你漏接了，才會進到 catch
    console.log(error);
  })
*/


exports.seekNew = seekNew;