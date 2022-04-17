import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import Main from "../views/Main.vue";
import CategoryEdit from "../views/CategoryEdit.vue";
import CategoryList from "../views/CategoryList.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    children: [
      {
        //分类列表创建
        path: "/categories/create",
        name: CategoryEdit,
        component: CategoryEdit,
      },
      {
        //分类列表详情
        path: "/categories/list",
        name: CategoryList,
        component: CategoryList,
      },
      {
        //编辑页面
        path: "/categories/edit/:id",

        component: CategoryEdit,
        props: true, //props是为了注入id值，在CategoryEdit页面可以使用找个id值
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
