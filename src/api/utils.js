export const getTokenAUTH = () => {
  return "Token";
};
/**
 * 移除对象中空的字段
 * @param obj
 */
export const removeEmptyValue = (obj) => {
  const newObj = {};
  if (typeof obj === "object") {
    Object.keys(obj).forEach((k) => {
      if (obj[k] !== "") {
        if (obj[k] === "toUndefined") {
          newObj[k] = "";
        } else {
          newObj[k] = obj[k];
        }
      }
    });
    return newObj;
  }
  return obj;
};
