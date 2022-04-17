module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const Category = require("../../models/Category");

  //列表创建接口
  router.post("/categories", async (req, res) => {
    const model = await Category.create(req.body);
    res.send(model);
  });
  //列表编辑接口
  router.put("/categories/:id", async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body); //调用findByIdAndUpdate（id,修改后的内容）来实现编辑内容
    res.send(model);
  });
  //列表删除接口
  router.delete("/categories/:id", async (req, res) => {
    const model = await Category.findByIdAndDelete(req.params.id, req.body); //调用findByIdAndUpdate（id,修改后的内容）来实现编辑内容
    res.send({
      success: true,
    });
  });
  // 获取列表数据接口
  router.get("/categories", async (req, res) => {
    const items = await Category.find().populate("parent").limit(10); //使用find limit为数量限制,调用populate关联取出我们设置分类模型为parent的数据
    res.send(items);
  });
  //获取某一个id的详情信息
  router.get("/categories/:id", async (req, res) => {
    const model = await Category.findById(req.params.id); //使用findById() 找到相应id的数据
    res.send(model);
  });
  app.use("/admin/api", router);
};
