import { FORM_COMPONENT } from "./template";
export const downloadComponents = (formItems, filename) => {
  let content = FORM_COMPONENT(formItems);

  if (window) {
    console.log(content);
    return;
  }

  // 创建a标签
  let linkNode = document.createElement("a");
  linkNode.download = filename;
  linkNode.style.display = "none";
  // 利用Blob对象将字符内容转变成二进制数据
  let blob = new Blob([content]);
  linkNode.href = URL.createObjectURL(blob);
  // 点击
  document.body.appendChild(linkNode);
  linkNode.click();
  // 移除
  document.body.removeChild(linkNode);
};
