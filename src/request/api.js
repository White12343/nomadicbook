// user.js
import req from "./http";

export const userSignUp = (signUpData) => req("post", "/user/sign-in", signUpData);
export const userLogIn = (logInData) => req("post", "/user/log-in", logInData);
export const userLogOut = () => req("get", "/user/log-out");
export const userDelete = (userNo) => req("delete", "/user/delete", userNo);

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
