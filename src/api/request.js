import axios from "axios";
import { message as Message } from "ant-design-vue";
import { removeEmptyValue } from "./utils";

// 取消请求
function cancelRequest(config) {
  config.cancelToken = new axios.CancelToken((cancel) => {
    // cancel 函数的参数会作为 promise 的 error 被捕获
    cancel(`${config.url} 请求已取消`);
  });
}

const keyMap = new Map();

// 请求前拦截
axios.interceptors.request.use(
  (config) => {
    // config.headers.debug = '1' // 全局添加headers
    // 取消请求
    if (keyMap.has(config.api)) {
      cancelRequest(config);
    } else {
      keyMap.set(config.api, config);
    }
    return config;
  },
  (err) => {
    Message.error({ content: "请求超时!" });
    return Promise.resolve(err);
  }
);

// 请求结果返回拦截
axios.interceptors.response.use(
  (data) => {
    keyMap.clear();
    if (data.data.code !== 200) {
      const message =
        data.data.message || data.data.msg || `code:${data.data.code} 未知错误`;
      Message.error({ content: message });
      // 权限不足需要登陆
      if (data.data.code === 401) {
        window.location.href = `http://${window.location.host}/login?reference=${window.location.href}`;
      }
    }
    return data;
  },
  (err) => {
    keyMap.clear;
    let message = err.message;
    if (err && err.response) {
      switch (err.response.status) {
        case 302:
          message = "接口重定向了！";
          break;
        case 400:
          message = "参数不正确！";
          break;
        case 401:
          message = "您未登录，或者登录已经超时，请先登录！";
          break;
        case 403:
          message = "您没有权限操作！";
          break;
        case 404:
          message = `请求地址出错: ${err.response.config.url}`;
          break; // 在正确域名下
        case 408:
          message = "请求超时！";
          break;
        case 409:
          message = "系统已存在相同数据！";
          break;
        case 500:
          message = "服务器内部错误！";
          break;
        case 501:
          message = "服务未实现！";
          break;
        case 502:
          message = "网关错误！";
          break;
        case 503:
          message = "服务不可用！";
          break;
        case 504:
          message = "服务暂时无法访问，请稍后再试！";
          break;
        case 505:
          message = "HTTP版本不受支持！";
          break;
        default:
          message = "异常问题，请联系管理员！";
          break;
      }
    }
    if (err.message.includes("timeout")) message = "网络请求超时！";
    if (err.message.includes("Network"))
      message = window.navigator.onLine ? "服务端异常！" : "您断网了！";
    Message.error({ content: message });
    return Promise.resolve(err);
  }
);
let base = ""; // 基础路径
// switch (process.env.NODE_ENV) { // 根据当前环境设置不同的请求链接地址
//   case 'development':
//     base = ''
//     break
//   case 'production':
//     base = ''
//     break
//   default:
//     //
// }
export const get = (url, params) => {
  params = removeEmptyValue(params);
  return axios({
    method: "get",
    url: `${base}${url}`,
    params,
    headers: {},
  });
};
export const post = (url, params) => {
  params = removeEmptyValue(params);
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: params,
    headers: { "Content-Type": "application/json" },
  });
};
export const postImg = (url, params) => {
  params = removeEmptyValue(params);
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
      api_key: "access_token",
      "X-Requested-With": "XMLHttpRequest",
      debug: "1",
      Accept: "*/*",
    },
  });
};
export const upload = (url, params) => {
  params = removeEmptyValue(params);
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const put = (url, params) => {
  params = removeEmptyValue(params);
  return axios({
    method: "put",
    url: `${base}${url}`,
    data: params,
    transformRequest: [
      function (data) {
        let ret = "";
        for (var it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      },
    ],
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};
export const del = (url) => {
  return axios({
    method: "delete",
    url: `${base}${url}`,
  });
};
