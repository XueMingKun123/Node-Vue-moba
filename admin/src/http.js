import axios from "axios";
import Vue from "vue";
import router from "./router";
const http = axios.create({
  baseURL: "http://localhost:3000/admin/api",
});
// 使用请求拦截器添加请求头用于用户身份校验
http.interceptors.request.use(
  function (config) {
    if (localStorage.token) {
      // 在头部添加Autherization字段，值为localStorage中的token "Bearer " + 行业规范
      config.headers.Authorization = "Bearer " + (localStorage.token || " ");
    }

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

//使用响应拦截器捕获全局错误
http.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.data.message) {
      // 发生错误 使用Vue
      // 使用element-ui中的一个$message的方法来提示错误
      Vue.prototype.$message({
        type: "error",
        message: err.response.data.message,
      });

      // 如果错误时401 可以跳转到登录页
      if (err.response.status === 401) {
        router.push("/login");
      }
    }
    return Promise.reject(err);
  }
);
export default http;
