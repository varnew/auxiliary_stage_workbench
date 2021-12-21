let _Vue = null;
class VueRouter {
  static install(Vue) {
    //1 判断当前插件是否被安装
    if (VueRouter.install.installed) {
      return;
    }
    VueRouter.install.installed = true;
    //2 把Vue的构造函数记录在全局
    _Vue = Vue;
    //3 把创建Vue的实例传入的router对象注入到Vue实例
    _Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router;
        }
      },
    });
  }
  constructor(options) {
    this.options = options;
    this.routeMap = {};
    // observable
    this.data = _Vue.observable({
      current: "/",
    });
    this.init();
  }
  init() {
    this.createRouteMap();
    this.initComponent(_Vue);
    this.initEvent();
  }
  // 初始化路径与组件的映射关系
  createRouteMap() {
    //遍历所有的路由规则 吧路由规则解析成键值对的形式存储到routeMap中
    this.options.routes.forEach((route) => {
      this.routeMap[route.path] = route.component;
    });
  }
  // 初始化组件
  initComponent(Vue) {
    // 注册RouterLink组件
    Vue.component("router-link", {
      props: {
        to: String,
      },
      render(h) {
        return h(
          "a",
          {
            attrs: {
              href: this.to,
            },
            on: {
              click: this.clickhander,
            },
          },
          [this.$slots.default]
        );
      },
      methods: {
        clickhander(e) {
          history.pushState({}, "", this.to); // 改变浏览器地址
          this.$router.data.current = this.to; // 触发组件刷新
          e.preventDefault(); // 阻止a标签默认事件
        },
      },
    });
    const self = this;
    // 注册RouterView事件
    Vue.component("router-view", {
      render(h) {
        const cm = self.routeMap[self.data.current];
        return h(cm);
      },
    });
  }
  initEvent() {
    // 注册回退监听事件
    window.addEventListener("popstate", () => {
      this.data.current = window.location.pathname;
    });
  }
}
export default VueRouter;
