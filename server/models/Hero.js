const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String }, //英雄头像地址
  title: { type: String }, //称号
  // 英雄分类可能多个,使用数组存储
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
  //英雄评分
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number },
  },
  // 英雄技能
  skills: [
    {
      icon: { type: String },
      name: { type: String },
      description: { type: String },
      tips: { type: String },
    },
  ],
  // 英雄装备
  //顺风
  items1: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Item",
    },
  ],
  // 逆风
  items2: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Item",
    },
  ],
  // 使用技巧
  usageTips: { type: String },
  // 对抗技巧
  battleTips: { type: String },
  // 团战思路
  teamTips: { type: String },
  // 英雄关系
  parenters: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
      description: { type: String },
    },
  ],
});
module.exports = mongoose.model("Hero", schema);
