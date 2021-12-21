import { post, get } from "../request";
let baseURL = "service";
export function exec(params = {}) {
  return post(`${baseURL}/exec`, params);
}
export function serviceRequest(params = {}) {
  return post(`${baseURL}/request`, params);
}
export function loadFile(params) {
  return get(`${baseURL}/loadFile`, params);
}
