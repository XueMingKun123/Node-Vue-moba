<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <!--native 表示监听这个表单里原生表单事件 prevent阻止页面的默认提交，不要跳转页面 -->
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
        <el-button type="primary" native-type="submit">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      //   console.log(res.data);
      // 使用localStorage持久化存储token
      localStorage.token = res.data.token;
      // 跳转到主页面
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登录成功",
      });
    },
  },
};
</script>

<style>
.login-card {
  width: 25rem;
  margin: 6rem auto;
}
</style>
