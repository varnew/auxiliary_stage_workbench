import { get, post } from "../request";
// let baseURL = "https://v2.alapi.cn";
// export function fanyi(params = {}) {
//   return post(`${baseURL}/api/fanyi`, params);
// }
let baseURL = "";
export function fanyi1(params = {}) {
  return get(`${baseURL}/fontconvert/convert`, params);
}
export function fanyi2(params = {}) {
  return post(`https://v2.alapi.cn/api/fanyi`, params);
}
export function baiduFanyi(params = {}) {
  return post(`/service/baidu/fanyi`, params);
}
