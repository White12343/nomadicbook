// user.js
import req from "./http";


// user
export const userSignUp = (signUpData) => req("post", "/user/signup", signUpData);
export const userSignin = (logInData) => req("post", "/user/signin", logInData);
// export const userLogOut = () => req("get", "/user/logout");


// 檢查
export const checkNickName = (nickName) => req("get", "/user/name", nickName);
export const checkMail = (mail) => req("get", "/user/mail", mail);
// export const userDelete = (nickName) => req("delete", "/user/delete", nickName);


// 取得產品列表
// export const getBookList = () => req("get", "/json/pd.json"); // 測試用
export const getBookList = () => req("get", "/product/list");
// 取得產品 detail
// export const getBookDetail = () => req("get", "/json/detail.json"); // 測試用
export const getBookDetail = (id) => req("get", "/product/" + id);


// 管理
// Booth
export const getBoothBookList = () => req("get", "/json/pd.json"); // 測試用
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
// Seek Manage
export const getSeekBookList = (id) => req("get", "/seek/myself/" + id);


// 上架
export const uploadProduct = (data) => req("post", "/product/new", data);
// isbn
export const getDataByISBNApi = (isbn) => req("get", "/Product", isbn);


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
import { getDataByISBN } from "@/request/api";

getDataByISBNApi()
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    // response 攔截器會先執行，除非你漏接了，才會進到 catch
    console.log(error);
  })
*/
