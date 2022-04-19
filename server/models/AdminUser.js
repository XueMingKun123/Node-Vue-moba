const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    //默认不查询
    select: false,
    // 使用bcrypt中 hashSync同步方法生成密码的散列值 加密指数 10~12
    set(value) {
      return require("bcrypt").hashSync(value, 12);
    },
  },
});
module.exports = mongoose.model("AdminUser", schema);
