const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: { type: String },
  //父级分类 ref表示关联的那个模型 默认路径即某个域相对于文档而言的路径，如{a: 1}这个文档中，若指定路径为’a’，即可访问到1这个数据。 主要是为了实现分类关联
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
});
module.exports = mongoose.model("Category", schema);
