const { modelName } = require("../../models/Hero");

module.exports = (app) => {
  const express = require("express");
  const router = express.Router({
    mergeParams: true, //表示合并参数，子路由继承父路由的参数
  });
  // const req.Model = require("../../models/req.Model");

  //创建接口
  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });
  //编辑接口
  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body); //调用findByIdAndUpdate（id,修改后的内容）来实现编辑内容
    res.send(model);
  });
  //删除接口
  router.delete("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id, req.body); //调用findByIdAndUpdate（id,修改后的内容）来实现编辑内容
    res.send({
      success: true,
    });
  });
  // 获取数据接口  关联查询有问题
  router.get("/", async (req, res) => {
    let items;
    if (req.Model.modelName === "Category") {
      items = await req.Model.find().populate("parent");
    } else {
      items = await req.Model.find();
    }
    // const queryOptions = {};

    // if (req.Model.modelName === "Category") {
    //   queryOptions.populate = "parent";
    // }

    // const items = await req.Model.find().setOptions(queryOptions); //使用find limit为数量限制,调用populate关联取出我们设置分类模型为parent的数据
    res.send(items);
  });
  //获取某一个id的详情信息
  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id); //使用findById() 找到相应id的数据
    res.send(model);
  });
  app.use(
    "/admin/api/rest/:resourse",
    async (req, res, next) => {
      // 使用中间件的形式
      // 使用inflection的classify方法来将resourse的名称转化为模型的名称
      const modelName = require("inflection").classify(req.params.resourse);

      // 通过require得到这个模型的类,并将其挂载为req对象上的一个属性
      req.Model = require(`../../models/${modelName}`);
      //请求上面这个接口的时候 会先调用这个函数 然后next()向下继续执行
      req.Model.modelName = modelName;
      next();
    },
    router
  ); //resouse动态参数

  //上传接口
  const multer = require("multer");
  const upload = multer({ dest: __dirname + "/../../uploads" });
  app.post("/admin/api/upload", upload.single("file"), async (req, res) => {
    const file = req.file;
    file.url = `http://localhost:3000/uploads/${file.filename}`;
    res.send(file);
  });
};
