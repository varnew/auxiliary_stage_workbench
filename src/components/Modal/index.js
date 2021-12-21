import { Modal as M } from "ant-design-vue";
let _Vue = null;
class Modal {
  static install(Vue) {
    //1 判断当前插件是否被安装
    if (Modal.install.installed) {
      return;
    }
    Modal.install.installed = true;
    //2 把Vue的构造函数记录在全局
    _Vue = Vue;
    _Vue.mixin({
      beforeCreate() {
        _Vue.prototype.$modal = () => {
          const dom = document.createElement("div");
          dom.innerHTML = <M title="title" visible={true} />;
          document.getElementsByTagName("body")[0].appendChild(dom);
        };
      },
    });
  }
  constructor() {}
}
export default Modal;
