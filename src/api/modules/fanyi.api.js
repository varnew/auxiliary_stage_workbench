import { post } from "../request";
let baseURL = "https://v2.alapi.cn";
export function fanyi(params = {}) {
  return post(`${baseURL}/api/fanyi`, params);
}
