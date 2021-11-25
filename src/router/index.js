import Vue from "vue";
import VueRouter from "vue-router";
import Workspace from "../views/Workspace.vue";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "workspace",
    meta: {
      icon: "appstore",
      name: "工作台",
    },
    component: Workspace,
  },
  {
    path: "/fanyi",
    name: "fanyi",
    meta: {
      icon: "global",
      name: "翻译",
    },
    component: () =>
      import(/* webpackChunkName: "fanyi" */ "../views/Fanyi/index.vue"),
  },
  {
    path: "/form",
    name: "form",
    meta: {
      icon: "api",
      name: "表单",
    },
    component: () =>
      import(/* webpackChunkName: "form" */ "../views/Form/index.vue"),
  },
  {
    path: "/about",
    name: "about",
    meta: {
      icon: "like",
      name: "关于",
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
