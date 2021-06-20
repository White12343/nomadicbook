import axios from "axios";
const API_PATH = 'http://35.236.167.85/';
const LOACL_PATH = '/static/';


// baseURL 是 API 的主要 Domain，只後發請求時只要填相對路徑就可以了
const instance = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000
});



// request 的攔截器 (Request Interceptors)，放入兩個函式做為參數。
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // 在 request 送出前攔截到此次的 config，可以做最後的處理。
    return config;
  },
  function (error) {
    // Do something with request error
    // 在 request 發生錯誤時做一些額外的處理。
    return Promise.reject(error);
  }
);

// Response 的攔截器 (Response Interceptors)，
instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.response){
      switch (error.response.status) {
        case 404:
          console.log("你要找的頁面不存在")
          // go to 404 page
          break
        case 500:
          console.log("程式發生問題")
          // go to 500 page
          break
        default:
          console.log(error.message)
      }
    }
    if (!window.navigator.onLine) {
      alert("網路出了點問題，請重新連線後重整網頁");
      return;
    }
    return Promise.reject(error);
  }
);


export default function(method, url, data = null, config) {
  method = method.toLowerCase();
  switch (method) {
    case "post":
      return instance.post(url, data, config);
    case "get":
      return instance.get(url, { params: data });
    case "delete":
      return instance.delete(url, { params: data });
    case "put":
      return instance.put(url, data);
    case "patch":
      return instance.patch(url, data);
    default:
      console.log(`未知的 method: ${method}`);
      return false;
  }
}
