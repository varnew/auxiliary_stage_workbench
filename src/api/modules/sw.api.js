import { get } from "../request";
// let baseURL = "tcc-interlib-service";
let baseURL = "api";
export function sw(params = {}) {
  return get(`${baseURL}/jeeshop/v2/api-docs`, params);
}
