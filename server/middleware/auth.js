module.exports = (options) => {
  const jwt = require("jsonwebtoken");
  const assert = require("http-assert");
  const AdminUser = require("../models/AdminUser");
  //使用闭包的思想 实现类似于插件功能的函数
  return async (req, res, next) => {
    // 校验用户信息
    // 获取token
    const token = String(req.headers.authorization || "")
      .split(" ")
      .pop();
    assert(token, 401, "请先登录");
    //使用jwt.verify解析token,得到我们sign时添加的数据 比如用户id
    const { id } = jwt.verify(token, req.app.get("secret"));
    assert(id, 401, "请先登录");
    // 然后通过id去数据库查询是否含有此用户， user只能在此中间件使用，若想后续使用，需要将其挂载上req.user或者res.user
    req.user = await AdminUser.findById(id);
    //根据查询的结果判断
    assert(req.user, 401, "请先登录");

    await next();
  };
};
