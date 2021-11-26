import _assign from "lodash/assign";
import _map from "lodash/map";
const files = require.context("./modules", true, /\.api\.js$/);
const generators = files.keys().map((key) => files(key));
// 开发环境下需要判断是否存在同名的api
if (process.env.NODE_ENV === "development") {
  let map = {};
  let fileNames = files.keys();
  let isBreak = false;
  for (let i = 0; i < fileNames.length; i++) {
    const fileName = fileNames[i];
    let fns = Object.keys(files(fileName));
    for (let j = 0; j < fns.length; j++) {
      const key = fns[j];
      if (map[key]) {
        isBreak = true;
        throw Error(
          `存在相同的api函数名称，请修改！ 文件名称是【${fileName}】，函数名称是【${key}】`
        );
      }
      map[key] = true;
      break;
    }
    if (isBreak) {
      break;
    }
  }
}
export default _assign({}, ..._map(generators, (generator) => generator));
