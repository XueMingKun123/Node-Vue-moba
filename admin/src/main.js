import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";

import http from "./http";
Vue.prototype.$http = http;

Vue.use(ElementUI);
Vue.config.productionTip = false;
new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
