"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postMsg = exports.getMsg = exports.seekNew = exports.getStoreAddress = exports.getStoreArea = exports.getStoreCity = exports.getIMailBox = exports.getRoad = exports.getArea = exports.getCity = exports.getCategoryBelong = exports.deletePhotoByApi = exports.getDataByISBNApi = exports.putProduct = exports.uploadProduct = exports.getSeekBookList = exports.rating = exports.getRecord = exports.putRefusal = exports.putReceipt = exports.putConsignment = exports.getMatchDetail = exports.getMatchList = exports.getAskBookList = exports.selectedBook = exports.getAskBoothBookList = exports.setOnShelf = exports.setOffShelf = exports.getBoothBookList = exports.chosen = exports.checkIsAlreadyAsk = exports.getBookDetail = exports.getBookList = exports.getNotifyNum = exports.getNotify = exports.getCategoryDetail = exports.getCategory = exports.checkMail = exports.checkNickName = exports.setNewPassword = exports.putUserDetail = exports.getUserBasic = exports.getUserDetail = exports.verify = exports.verifymail = exports.forgetPassword = exports.userSignin = exports.userSignUp = exports.search = exports.getPublishDayList = exports.getNewBookList = exports.getExperienceList = void 0;

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
};

exports.userSignin = userSignin;

var forgetPassword = function forgetPassword(mail) {
  return (0, _http["default"])("put", "/User/forgetpassword", mail);
};

exports.forgetPassword = forgetPassword;

var verifymail = function verifymail(mail) {
  return (0, _http["default"])("get", "/User/verifymail/" + mail);
}; // 會員驗證


exports.verifymail = verifymail;

var verify = function verify(id) {
  return (0, _http["default"])("get", "/User/verify/" + id);
}; // export const userLogOut = () => req("get", "/user/logout");
// 會員資料


exports.verify = verify;

var getUserDetail = function getUserDetail(id) {
  return (0, _http["default"])("get", "/User/detaildata/" + id);
};

exports.getUserDetail = getUserDetail;

var getUserBasic = function getUserBasic(id) {
  return (0, _http["default"])("get", "/User/basicdata/" + id);
}; // 修改會員資料


exports.getUserBasic = getUserBasic;

var putUserDetail = function putUserDetail(id, data) {
  return (0, _http["default"])("put", "/User/" + id, data);
}; // 修改密碼


exports.putUserDetail = putUserDetail;

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


exports.getNotifyNum = getNotifyNum;

var getBookList = function getBookList(data) {
  return (0, _http["default"])("get", "/product/list", data);
}; // 取得產品 detail


exports.getBookList = getBookList;

var getBookDetail = function getBookDetail(id) {
  return (0, _http["default"])("get", "/product/" + id);
}; // 該攤主是否已有提過邀請


exports.getBookDetail = getBookDetail;

var checkIsAlreadyAsk = function checkIsAlreadyAsk(data) {
  return (0, _http["default"])("get", "/Seek/book", data);
}; // 是否交換過


exports.checkIsAlreadyAsk = checkIsAlreadyAsk;

var chosen = function chosen(data) {
  return (0, _http["default"])("get", "/Product/book/chosen", data);
}; // 管理
// Booth


exports.chosen = chosen;

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
}; // 書已寄出


exports.getMatchDetail = getMatchDetail;

var putConsignment = function putConsignment(id, user) {
  return (0, _http["default"])("put", "/Seek/match/consignment/".concat(id), user);
}; // 書已收到


exports.putConsignment = putConsignment;

var putReceipt = function putReceipt(id, user) {
  return (0, _http["default"])("put", "/Seek/match/receipt/".concat(id), user);
}; // 拒絕


exports.putReceipt = putReceipt;

var putRefusal = function putRefusal(id) {
  return (0, _http["default"])("put", "/seek/otherpeople/refusal/".concat(id));
}; // 歷史訂單


exports.putRefusal = putRefusal;

var getRecord = function getRecord(id) {
  return (0, _http["default"])("get", "/Seek/history/" + id);
}; // 評價


exports.getRecord = getRecord;

var rating = function rating(id, data) {
  return (0, _http["default"])("put", "/Seek/match/evaluation/".concat(id), data);
}; // Seek Manage


exports.rating = rating;

var getSeekBookList = function getSeekBookList(id) {
  return (0, _http["default"])("get", "/seek/myself/" + id);
}; // 上架商品


exports.getSeekBookList = getSeekBookList;

var uploadProduct = function uploadProduct(data) {
  return (0, _http["default"])("post", "/product/new", data);
}; // 更新


exports.uploadProduct = uploadProduct;

var putProduct = function putProduct(id, data) {
  return (0, _http["default"])("put", "/Stall/bookupdate/" + id, data);
}; // isbn


exports.putProduct = putProduct;

var getDataByISBNApi = function getDataByISBNApi(isbn) {
  return (0, _http["default"])("get", "/Product", isbn);
}; // 刪除圖片


exports.getDataByISBNApi = getDataByISBNApi;

var deletePhotoByApi = function deletePhotoByApi(id) {
  return (0, _http["default"])("delete", "/Stall/" + id);
}; // 用小分類取得大分類


exports.deletePhotoByApi = deletePhotoByApi;

var getCategoryBelong = function getCategoryBelong(id) {
  return (0, _http["default"])("get", "/Product/category/belong", id);
}; // 地址
// city


exports.getCategoryBelong = getCategoryBelong;

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
}; // 7-11


exports.getIMailBox = getIMailBox;

var getStoreCity = function getStoreCity() {
  return (0, _http["default"])("get", "/Trade/store/city");
};

exports.getStoreCity = getStoreCity;

var getStoreArea = function getStoreArea(data) {
  return (0, _http["default"])("get", "/Trade/store/area", data);
};

exports.getStoreArea = getStoreArea;

var getStoreAddress = function getStoreAddress(data) {
  return (0, _http["default"])("get", "/Trade/store/address", data);
}; // 產品


exports.getStoreAddress = getStoreAddress;

var seekNew = function seekNew(data) {
  return (0, _http["default"])("post", "/seek/new", data);
}; // 留言板
// 取得留言


exports.seekNew = seekNew;

var getMsg = function getMsg(id) {
  return (0, _http["default"])("get", "/Message/" + id);
}; // 留言


exports.getMsg = getMsg;

var postMsg = function postMsg(data) {
  return (0, _http["default"])("post", "/Message", data);
}; // 使用範例

/*
import { verify } from "@/request/api";

verify()
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    // response 攔截器會先執行，除非你漏接了，才會進到 catch
    console.log(error);
  })
*/


exports.postMsg = postMsg;