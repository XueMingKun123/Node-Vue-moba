import Vue from "vue";
import VueRouter from "vue-router";

import Main from "../views/Main.vue";

import CategoryEdit from "../views/CategoryEdit.vue";
import CategoryList from "../views/CategoryList.vue";

import ItemEdit from "../views/ItemEdit.vue";
import ItemList from "../views/ItemList.vue";

import HeroEdit from "../views/HeroEdit.vue";
import HeroList from "../views/HeroList.vue";

import ArticleEdit from "../views/ArticleEdit.vue";
import ArticleList from "../views/ArticleList.vue";

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
        component: CategoryEdit,
      },
      {
        //分类列表详情
        path: "/categories/list",
        component: CategoryList,
      },
      {
        //编辑页面
        path: "/categories/edit/:id",
        component: CategoryEdit,
        props: true, //props是为了注入id值，在CategoryEdit页面可以使用找个id值
      },
      {
        //物品列表创建
        path: "/items/create",
        component: ItemEdit,
      },
      {
        //物品列表详情
        path: "/items/list",
        component: ItemList,
      },
      {
        //编辑页面
        path: "/items/edit/:id",
        component: ItemEdit,
        props: true, //props是为了注入id值，在ItemEdit页面可以使用找个id值
      },
      {
        //英雄列表创建
        path: "/heroes/create",
        component: HeroEdit,
      },
      {
        //英雄列表详情
        path: "/heroes/list",
        component: HeroList,
      },
      {
        //编辑页面
        path: "/heroes/edit/:id",
        component: HeroEdit,
        props: true, //props是为了注入id值，在HeroEdit页面可以使用找个id值
      },
      {
        //文章列表创建
        path: "/articles/create",
        component: ArticleEdit,
      },
      {
        //文章列表详情
        path: "/articles/list",
        component: ArticleList,
      },
      {
        //编辑页面
        path: "/articles/edit/:id",
        component: ArticleEdit,
        props: true, //props是为了注入id值，在HeroEdit页面可以使用找个id值
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
