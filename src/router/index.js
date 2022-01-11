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
    path: "/translate",
    name: "translate",
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
      name: "表单生成器",
    },
    component: () =>
      import(/* webpackChunkName: "form" */ "../views/Form/index.vue"),
  },
  {
    path: "/debug",
    name: "debug",
    meta: {
      icon: "bug",
      name: "sw",
    },
    component: () =>
      import(/* webpackChunkName: "debug" */ "../views/Debug/index.vue"),
  },
  {
    path: "/books",
    name: "books",
    meta: {
      icon: "read",
      name: "图书",
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Books.vue"),
  },
  {
    path: "/render",
    name: "render",
    meta: {
      icon: "number",
      name: "渲染测试",
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Form/renderTest.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
