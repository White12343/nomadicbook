// user.js
import req from "./http";

// 首頁
export const getExperienceList = (num) => req("get", "/HomePage/experiencelist", num);
export const getNewBookList = (num) => req("get", "/HomePage/newbooklist", num);
export const getPublishDayList = (num) => req("get", "/HomePage/publishdaylist", num);
export const search = (keyword) => req("get", "/HomePage", keyword);


// user
export const userSignUp = (signUpData) => req("post", "/user/signup", signUpData);
export const userSignin = (logInData) => req("post", "/user/signin", logInData);
export const forgetPassword = (mail) => req("put", "/User/forgetpassword", mail);

// export const userLogOut = () => req("get", "/user/logout");

// 會員資料
export const getUserDetail = (id) => req("get", "/User/detaildata/" + id);
export const getUserBasic = (id) => req("get", "/User/basicdata/" + id);
// 修改密碼
export const setNewPassword = (id, data) => req("put", "/User/password/" + id, data);



// 檢查
export const checkNickName = (nickName) => req("get", "/user/name", nickName);
export const checkMail = (mail) => req("get", "/user/mail", mail);
// export const userDelete = (nickName) => req("delete", "/user/delete", nickName);

// 取得分類
export const getCategory = (id) => req("get", "/Product/category", id);
export const getCategoryDetail = (data) => req("get", "/Product/category/detail", data);

// 取得通知
export const getNotify = (id) => req("get", "/HomePage/notify/" + id);
export const getNotifyNum = (id) => req("get", "HomePage/notifynum/" + id);



// 取得產品列表
export const getBookList = (data) => req("get", "/product/list", data);
// 取得產品 detail
export const getBookDetail = (id) => req("get", "/product/" + id);
// 該攤主是否已有提過邀請
export const checkIsAlreadyAsk = (data) => req("get", "/Seek/book", data);
// 是否交換過
export const chosen = (data) => req("get", "/Product/book/chosen", data);



// 管理
// Booth
export const getBoothBookList = (id) => req("get", "/Stall/" + id);
// 下架
export const setOffShelf = (id) => req("put", `/Stall/bookoff/${id}`);
// 上架
export const setOnShelf = (id) => req("put", `/Stall/bookon/${id}`);




// 邀約方書本資料
export const getAskBoothBookList = (id, mode) => req("get", `/seek/otherpeople/books/${id}/${mode}`);
// 確認回應邀約方資料
export const selectedBook = (id, data) => req("put", `/seek/otherpeople/selectedbook/${id}`, data);
// Ask Manage
export const getAskBookList = (id) => req("get", "/seek/otherpeople/" + id);
// Match Manage
export const getMatchList = (id) => req("get", "/seek/match/" + id);
// Match Detail
export const getMatchDetail = (id) => req("get", "/seek/match/detail/" + id);
// 書已寄出
export const putConsignment = (id, user) => req("put", `/Seek/match/consignment/${id}`, user);
// 書已收到
export const putReceipt = (id, user) => req("put", `/Seek/match/receipt/${id}`, user);
// 拒絕
export const putRefusal = (id) => req("put", `/seek/otherpeople/refusal/${id}`);
// 歷史訂單
export const getRecord = (id) => req("get", "/Seek/history/" + id);
// 評價
export const rating = (id, data) => req("put", `/Seek/match/evaluation/${id}`, data);


// Seek Manage
export const getSeekBookList = (id) => req("get", "/seek/myself/" + id);


// 上架
export const uploadProduct = (data) => req("post", "/product/new", data);
// 更新
// export const putProduct = (id) => req("put", "/Stall/bookupdate/" + id);
// isbn
export const getDataByISBNApi = (isbn) => req("get", "/Product", isbn);
// 刪除圖片
export const deletePhotoByApi = (id) => req("delete", "/Stall/" + id);
// 用小分類取得大分類
export const getCategoryBelong = (id) => req("get", "/Product/category/belong", id);


// 地址
// city
export const getCity = () => req("get", "/Trade/address/city");
export const getArea = (data) => req("get", "/Trade/address/area", data);
export const getRoad = (data) => req("get", "/Trade/address/road", data);
// iMail
export const getIMailBox = (data) => req("get", "/trade/mailbox", data);


// 產品
export const seekNew = (data) => req("post", "/seek/new", data);



// 使用範例
/*
import { getCategoryBelong } from "@/request/api";

getCategoryBelong()
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    // response 攔截器會先執行，除非你漏接了，才會進到 catch
    console.log(error);
  })
*/
