const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: { type: String },
  //广告位里有图片 每个图片有个链接
  items: [{ image: { type: String }, url: { type: String } }],
});
module.exports = mongoose.model("Ad", schema);
