import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import "./style.css";

import http from "./http";
Vue.prototype.$http = http;

Vue.use(ElementUI);
Vue.config.productionTip = false;

// 解决element-ui中up-load文件失败，因为它使用的原生的底层的ajax请求，没法使用我们封装的AXIOS,
// 需要使用：headers添加Autherization字段，由于单个组件添加麻烦，所以在main.js中全局添加
// 使用mixn全局定义一个mixin，定义一个method,混入其他的组件中,使用方法而不使用data是为了实时取当前的token
// 返回一个对象，包含Authorization
Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + "/upload";
    },
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || " "}`,
      };
    },
  },
});

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
