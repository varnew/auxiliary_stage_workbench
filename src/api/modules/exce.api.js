import { post } from "../request";
let baseURL = "service";
export function exec(params = {}) {
  return post(`${baseURL}/exec`, params);
}
export function serviceRequest(params = {}) {
  return post(`${baseURL}/request`, params);
}
