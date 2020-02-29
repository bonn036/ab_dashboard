import axios from "axios"
import { MessageBox, Message } from "element-ui"
import store from "@/store"
import { getAud, getAuthToken } from "@/utils/auth"
import CryptoJS from "crypto-js"

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

// request interceptor
service.interceptors.request.use(
  config => {
    // console.log("intercept request:")
    // do something before request is sent
    var timeStamp = new Date().getTime() + "";
    var method = config.method;
    if (!("data" in config)) {
      config["data"] = {"time":timeStamp};
    }
    var body = JSON.stringify(config.data);
    var appKey = "203758497"
    var nonce = guid();
    // var contentType = "CONTENT_TYPE_TEXT";
    var contentType = "application/json";
    var contentMD5 = CryptoJS.enc.Base64.stringify(CryptoJS.MD5(CryptoJS.enc.Utf8.parse(body)));
    var stage = "RELEASE";
    var audience = getAud();
    var authorization = getAuthToken();
    var sigHeaders = "X-Ca-Key,X-Ca-Nonce,X-Ca-Stage,Audience,Authorization";
    var headers = 
        "X-Ca-Key:" + appKey + "\n" +
        "X-Ca-Nonce:" + nonce + "\n" +
        "X-Ca-Stage:" + stage + "\n" +
        "Audience:" + audience + "\n" +
        "Authorization:" + authorization + "\n";
    var url = process.env.VUE_APP_BASE_API + config.url;
    var stringToSign = method.toLowerCase() + "\n" +
        contentMD5.toLowerCase() + "\n" +
        contentType.toLowerCase() + "\n" +
        timeStamp.toLowerCase() + "\n" +
        headers +
        url.toLowerCase();
    // console.log("sigString: " + stringToSign)
    var sig = CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse(CryptoJS.HmacSHA256(
            CryptoJS.enc.Utf8.parse(stringToSign),
            CryptoJS.enc.Utf8.parse(nonce))));
    // config.headers = {
    //   "X-Ca-Key" : appKey,
    //   "X-Ca-Siguature": sig,
    //   "X-Ca-Signature-Headers" : sigHeaders,
    //   "X-Timestamp" : timeStamp,
    //   "X-Ca-Nonce" : nonce,
    //   "Content-Type" : contentType,
    //   "Content-MD5" : contentMD5,
    //   "X-Ca-Stage" : stage,
    //   "Audience" : audience,
    //   "Authorization" : authorization
    // }
    config.headers["X-Ca-Key"] = appKey
    config.headers["X-Ca-Siguature"] = sig
    config.headers["X-Ca-Signature-Headers"] = sigHeaders
    config.headers["X-Timestamp"] = timeStamp
    config.headers["X-Ca-Nonce"] = nonce
    config.headers["Content-Type"] = contentType
    config.headers["Content-MD5"] = contentMD5
    config.headers["X-Ca-Stage"] = stage
    config.headers["Audience"] = audience
    config.headers["Authorization"] = authorization
    // console.log("config: " + JSON.stringify(config))
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */
  response => {
    // console.log("intercept response: " + JSON.stringify(response))
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.status != 200) {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.status === 50008 || res.status === 50012 || res.status === 50014) {
        // to re-login
        MessageBox.confirm("您已经退出登录", "确认退出登录", {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          store.dispatch("user/resetAuth").then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || "Error"))
    } else {
      return response
    }
  },
  error => {
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
