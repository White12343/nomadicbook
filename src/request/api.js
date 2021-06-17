// user.js
import req from "./http";
// user
export const userSignUp = (signUpData) => req("post", "/user/signup", signUpData);
export const userSignin = (logInData) => req("post", "/user/signin", logInData);
export const userLogOut = () => req("get", "/user/logout");
// 檢查
export const checkNickName = (nickName) => req("get", "/user/name", nickName);
export const checkMail = (mail) => req("get", "/user/mail", mail);


// export const userDelete = (nickName) => req("delete", "/user/delete", nickName);

// 取得產品列表
export const getBookList = () => req("get", "/json/pd.json");
// 取得產品 detail
export const getBookDetail = () => req("get", "/json/detail.json");

// 管理
// Booth
export const getBoothBookList = () => req("get", "/json/pd.json");
// Ask Manage
export const getAskBookList = () => req("get", "/json/ask.json");
// Match Manage
export const getMatchList = () => req("get", "/json/match.json");
// Match Detail
export const getMatchDetail = () => req("get", "/json/matchdetail.json");
// Seek Manage
export const getSeekBookList = () => req("get", "/json/pd.json");




// 使用範例
/*
import { checkNickName } from "@/request/api";

checkNickName()
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    // response 攔截器會先執行，除非你漏接了，才會進到 catch
    console.log(error);
  })
*/
