import Vue from "vue";
import App from "./App.vue";
import "babel-polyfill";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import api from "@/api";
Vue.config.productionTip = false;
Vue.use(Antd);
Vue.prototype.$api = api;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
