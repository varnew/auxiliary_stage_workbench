import { get } from "../request";
let baseURL = "tcc-interlib-service";
export function sw(params = {}) {
  return get(`${baseURL}/v2/api-docs`, params);
}
